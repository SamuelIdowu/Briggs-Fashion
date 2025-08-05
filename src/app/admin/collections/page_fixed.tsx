"use client";

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
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
              onClick={fetchCollections}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              onClick={handleAdd}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Collection
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-lg mb-6 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 text-sm rounded-md ${
                filterActive === null 
                  ? "bg-blue-600 text-white" 
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilterActive(null)}
            >
              All
            </button>
            <button
              className={`px-3 py-2 text-sm rounded-md ${
                filterActive === true 
                  ? "bg-blue-600 text-white" 
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilterActive(true)}
            >
              Active
            </button>
            <button
              className={`px-3 py-2 text-sm rounded-md ${
                filterActive === false 
                  ? "bg-blue-600 text-white" 
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFilterActive(false)}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Collections List */}
      <div className="space-y-4">
        {filteredCollections.map((collection) => (
          <div key={collection._id} className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {collection.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    collection.isActive 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {collection.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{collection.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{collection.products?.length || 0} products</span>
                  <span>Created {formatDate(collection.createdAt)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(collection)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  title="Edit collection"
                  aria-label="Edit collection"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(collection._id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                  title="Delete collection"
                  aria-label="Delete collection"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && editingCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingCollection._id ? 'Edit Collection' : 'Add Collection'}
            </h2>
            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={editingCollection.name}
                    onChange={(e) => setEditingCollection({
                      ...editingCollection,
                      name: e.target.value
                    })}
                    placeholder="Enter collection name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={editingCollection.description}
                    onChange={(e) => setEditingCollection({
                      ...editingCollection,
                      description: e.target.value
                    })}
                    rows={3}
                    placeholder="Enter collection description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingCollection(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
