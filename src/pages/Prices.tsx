import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc } from 'lucide-react';
import TyreCard from '../components/ui/TyreCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Tyre } from '../types';

const Prices: React.FC = () => {
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [filteredTyres, setFilteredTyres] = useState<Tyre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const brands = ['Apollo', 'Bridgestone', 'CEAT', 'JK Tyre', 'MRF'];

  useEffect(() => {
    fetchTyres();
  }, []);

  const filterAndSortTyres = useCallback(() => {
    let filtered = tyres.filter(tyre => {
      const matchesSearch = tyre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tyre.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (tyre.size && tyre.size.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesBrand = !selectedBrand || tyre.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });

    // Sort tyres
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredTyres(filtered);
  }, [tyres, searchTerm, selectedBrand, sortBy]);

  useEffect(() => {
    filterAndSortTyres();
  }, [filterAndSortTyres]);

  const fetchTyres = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tyres');
      const data = await response.json();
      setTyres(data);
    } catch (error) {
      console.error('Error fetching tyres:', error);
      // Fallback data for demo
      setTyres([
        {
          _id: '1',
          name: 'Apollo Amazer 4G Life',
          brand: 'Apollo',
          price: 4500,
          stock: 15,
          size: '185/65 R15',
          description: 'Premium tyre with excellent grip and durability'
        },
        {
          _id: '2',
          name: 'MRF ZLX',
          brand: 'MRF',
          price: 5200,
          stock: 8,
          size: '195/60 R16',
          description: 'High-performance tyre for superior handling'
        },
        {
          _id: '3',
          name: 'CEAT SecuraDrive',
          brand: 'CEAT',
          price: 3800,
          stock: 0,
          size: '175/70 R14',
          description: 'Reliable and fuel-efficient tyre option'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = (tyre: Tyre) => {
    alert(`Purchase request for ${tyre.name} - ₹${tyre.price}\n(Feature coming soon!)`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (

    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tyre <span className="gradient-text">Prices</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best deals on premium tyres from top brands
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tyres, brands, or sizes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Available</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredTyres.length} of {tyres.length} tyres
          </p>
        </motion.div>

        {/* Tyres Grid */}
        {filteredTyres.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tyres found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredTyres.map((tyre, index) => (
              <motion.div
                key={tyre._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TyreCard tyre={tyre} onBuy={handleBuy} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Prices;