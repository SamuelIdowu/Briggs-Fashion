"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Edit,
  Trash2,
  FolderOpen,
  Search,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";

interface Collection {
  _id: string;
  name: string;
  description: string;
  products: any[];
  isActive: boolean;
  createdAt: string;
  productCount?: number;
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/admin/collections');
      const data = await response.json();
      
      if (data.success) {
        setCollections(data.data.collections || []);
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCollection({
      _id: '',
      name: '',
      description: '',
      products: [],
      isActive: true,
      createdAt: new Date().toISOString()
    });
    setModalOpen(true);
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection({ ...collection });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    
    try {
      const response = await fetch(`/api/admin/collections/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchCollections();
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection) return;

    try {
      const isEdit = !!editingCollection._id;
      const url = isEdit ? `/api/admin/collections/${editingCollection._id}` : '/api/admin/collections';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingCollection.name,
          description: editingCollection.description,
          isActive: editingCollection.isActive
        }),
      });

      if (response.ok) {
        setModalOpen(false);
        setEditingCollection(null);
        fetchCollections();
      }
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === null || collection.isActive === filterActive;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
            <p className="text-gray-600 mt-2">
              Manage your product collections and categories
            </p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Collection
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterActive === null ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterActive(null)}
              >
                All
              </Button>
              <Button
                variant={filterActive === true ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterActive(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Active
              </Button>
              <Button
                variant={filterActive === false ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterActive(false)}
              >
                <EyeOff className="mr-2 h-4 w-4" />
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collections List */}
      <div className="space-y-4">
        {filteredCollections.length > 0 ? (
          filteredCollections.map((collection) => (
            <Card key={collection._id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{collection.name}</h3>
                        <Badge variant={collection.isActive ? "default" : "secondary"}>
                          {collection.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {collection.description || "No description"}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{collection.productCount || collection.products?.length || 0} products</span>
                        <span>•</span>
                        <span>Created {formatDate(collection.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(collection)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(collection._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {collections.length === 0 ? "No collections yet" : "No collections found"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {collections.length === 0 
                    ? "Create your first collection to organize your products"
                    : "Try adjusting your search or filter criteria"
                  }
                </p>
                {collections.length === 0 && (
                  <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Collection
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && editingCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingCollection._id ? 'Edit' : 'Add'} Collection
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingCollection.name}
                  onChange={(e) => setEditingCollection({
                    ...editingCollection,
                    name: e.target.value
                  })}
                  placeholder="Collection name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingCollection.description}
                  onChange={(e) => setEditingCollection({
                    ...editingCollection,
                    description: e.target.value
                  })}
                  placeholder="Collection description"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editingCollection.isActive}
                  onChange={(e) => setEditingCollection({
                    ...editingCollection,
                    isActive: e.target.checked
                  })}
                  className="rounded"
                  aria-label="Active status"
                  title="Toggle collection active status"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingCollection(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCollection._id ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
