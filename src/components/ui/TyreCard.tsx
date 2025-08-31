import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, AlertCircle } from 'lucide-react';
import { Tyre } from '../../types';

interface TyreCardProps {
  tyre: Tyre;
}

const TyreCard: React.FC<TyreCardProps> = ({ tyre }) => {
  const isLowStock = tyre.stock <= 3;
  const isOutOfStock = tyre.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      {tyre.image && (
        <div className="h-32 sm:h-40 md:h-48 bg-gray-100 overflow-hidden">
          <img
            src={tyre.image}
            alt={tyre.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Header with brand color */}
      <div className={`h-2 ${getBrandColor(tyre.brand)}`} />
      
      <div className="p-4 sm:p-6">
        {/* Brand Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getBrandColor(tyre.brand)}`}>
            {tyre.brand}
          </span>
          {isLowStock && !isOutOfStock && (
            <div className="flex items-center text-orange-500">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">Low Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {tyre.name}
        </h3>
        
        {tyre.size && (
          <p className="text-sm sm:text-base text-gray-600 mb-2">Size: {tyre.size}</p>
        )}
        
        {tyre.description && (
          <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {tyre.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            ₹{tyre.price.toLocaleString()}
          </span>
        </div>

        {/* Stock Info */}
        <div className="flex items-center mb-3 sm:mb-4">
          <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
          <span className={`text-xs sm:text-sm ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-orange-500' : 'text-green-500'}`}>
            {isOutOfStock ? 'Out of Stock' : `${tyre.stock} in stock`}
          </span>
        </div>

        {/* Action Button */}
        <motion.a
          href="tel:+918298946081"
          whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
          whileTap={{ scale: isOutOfStock ? 1 : 0.98 }}
          className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center space-x-1 sm:space-x-2 transition-all duration-300 text-sm sm:text-base ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
              : 'btn-primary'
          }`}
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">{isOutOfStock ? 'Out of Stock' : 'Buy Now'}</span>
          <span className="sm:hidden">{isOutOfStock ? 'N/A' : 'Buy'}</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

const getBrandColor = (brand: string): string => {
  const colors: { [key: string]: string } = {
    'Apollo': 'bg-purple-600',
    'Bridgestone': 'bg-red-600',
    'CEAT': 'bg-blue-600',
    'JK Tyre': 'bg-yellow-500',
    'MRF': 'bg-red-700',
  };
  return colors[brand] || 'bg-gray-600';
};

export default TyreCard;