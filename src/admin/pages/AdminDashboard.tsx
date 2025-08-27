import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';
import ProductForm from '../components/ProductForm';

interface Tyre {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  size: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTyre, setEditingTyre] = useState<Tyre | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTyres();
  }, []);

  const fetchTyres = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tyres');
      const data = await response.json();
      setTyres(data);
    } catch (error) {
      console.error('Error fetching tyres:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tyre?')) return;
    
    try {
      await fetch(`http://localhost:5000/api/tyres/${id}`, { method: 'DELETE' });
      setTyres(tyres.filter(tyre => tyre._id !== id));
    } catch (error) {
      console.error('Error deleting tyre:', error);
    }
  };

  const handleStatusToggle = async (tyre: Tyre) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tyres/${tyre._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tyre, status: tyre.status === 'active' ? 'inactive' : 'active' })
      });
      
      if (response.ok) {
        fetchTyres();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingTyre(null);
    fetchTyres();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Manage Products</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tyres.map((tyre) => (
            <motion.div
              key={tyre._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {tyre.image && (
                <img
                  src={`http://localhost:5000${tyre.image}`}
                  alt={tyre.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{tyre.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tyre.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {tyre.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{tyre.brand} - {tyre.size}</p>
                <p className="text-2xl font-bold text-primary-600 mb-2">₹{tyre.price}</p>
                <p className="text-sm text-gray-500 mb-4">Stock: {tyre.stock}</p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingTyre(tyre);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleStatusToggle(tyre)}
                    className="bg-yellow-600 text-white py-2 px-3 rounded text-sm hover:bg-yellow-700 transition-colors"
                  >
                    {tyre.status === 'active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(tyre._id)}
                    className="bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          tyre={editingTyre}
          onClose={() => {
            setShowForm(false);
            setEditingTyre(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;