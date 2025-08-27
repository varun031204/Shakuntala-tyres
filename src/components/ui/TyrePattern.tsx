import React from 'react';
import { motion } from 'framer-motion';

interface TyrePatternProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TyrePattern: React.FC<TyrePatternProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className} relative`}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer rim */}
      <div className="absolute inset-0 border-2 border-current rounded-full opacity-60">
        {/* Inner rim */}
        <div className="absolute inset-1 border border-current rounded-full opacity-40">
          {/* Center hub */}
          <div className="absolute inset-2 border border-current rounded-full opacity-30">
            <div className="absolute inset-1 bg-current rounded-full opacity-20"></div>
          </div>
        </div>
        
        {/* Spokes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-3 bg-current opacity-30 top-1/2 left-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${i * 60}deg)`
            }}
          />
        ))}
      </div>
      
      {/* Tread marks */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-1 bg-current opacity-40"
          style={{
            top: '10%',
            left: '50%',
            transformOrigin: '0 400%',
            transform: `rotate(${i * 45}deg)`
          }}
        />
      ))}
    </motion.div>
  );
};

export default TyrePattern;