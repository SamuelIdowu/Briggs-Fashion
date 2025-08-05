"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { 
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  type: string;
}

interface Collection {
  _id: string;
  name: string;
  description: string;
  products: Product[];
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
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
            <p className="text-gray-600 mt-2">
              Manage your product collections and categories
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={fetchCollections}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button 
              onClick={handleAdd}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Collection
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
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
                Active
              </Button>
              <Button
                variant={filterActive === false ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterActive(false)}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collections List */}
      <div className="space-y-4">
        {filteredCollections.map((collection) => (
          <Card key={collection._id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {collection.name}
                    </h3>
                    <Badge variant={collection.isActive ? "default" : "secondary"}>
                      {collection.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-1">{collection.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{collection.products?.length || 0} products</span>
                    <span>Created {formatDate(collection.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(collection)}
                    title="Edit collection"
                    aria-label="Edit collection"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(collection._id)}
                    title="Delete collection"
                    aria-label="Delete collection"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && editingCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingCollection._id ? 'Edit Collection' : 'Add Collection'}
              </h2>
              <form onSubmit={handleSave}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={editingCollection.name}
                      onChange={(e) => setEditingCollection({
                        ...editingCollection,
                        name: e.target.value
                      })}
                      placeholder="Enter collection name"
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
                      rows={3}
                      placeholder="Enter collection description"
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
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button type="submit" className="flex-1">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setModalOpen(false);
                      setEditingCollection(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
