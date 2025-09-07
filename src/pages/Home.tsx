import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { tyreAPI } from '../utils/api';
import { Tyre } from '../types';

const Home: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        console.log('Fetching tyres for home page...');
        const data = await tyreAPI.getAllTyres();
        console.log('Home page tyres fetched:', data);
        setTyres(data.slice(0, 8)); // Show first 8 tyres
      } catch (error) {
        console.error('Failed to fetch tyres:', error);
        setTyres([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTyres();
  }, []);

  const nextSlide = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % tyres.length);
  };

  const prevSlide = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + tyres.length) % tyres.length);
  };

  const handleTouch = () => {
    setIsPlaying(false);
  };

  const brands = [
    { name: 'Apollo', color: 'bg-purple-600', path: '/prices?brand=apollo' },
    { name: 'Bridgestone', color: 'bg-red-600', path: '/prices?brand=bridgestone' },
    { name: 'CEAT', color: 'bg-blue-600', path: '/prices?brand=ceat' },
    { name: 'JK Tyre', color: 'bg-yellow-500', path: '/prices?brand=jktyre' },
    { name: 'MRF', color: 'bg-red-700', path: '/prices?brand=mrf' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Premium tyres from trusted brands with warranty coverage',
      accent: '🛡️'
    },
    {
      icon: Zap,
      title: 'Quick Installation',
      description: 'Professional tyre fitting & wheel alignment services',
      accent: '🔧'
    },
    {
      icon: Users,
      title: 'Expert Advice',
      description: 'Tyre specialists to help choose the right fit for your vehicle',
      accent: '👨‍🔧'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive pricing with genuine products guarantee',
      accent: '🏆'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              x: [0, -100, 0],
              y: [0, 50, 0]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl"
          />
        </div>
        
        {/* Floating tyre elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 border-4 border-white/10 rounded-full flex items-center justify-center"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                y: [-20, -60, -20],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <div className="w-8 h-8 border-2 border-white/20 rounded-full"></div>
            </motion.div>
          ))}
          
          {/* Tyre tread patterns */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`tread-${i}`}
              className="absolute w-1 h-8 bg-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Large tyre silhouettes */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-32 h-32 border-8 border-white/5 rounded-full"
          >
            <div className="absolute inset-4 border-4 border-white/5 rounded-full">
              <div className="absolute inset-2 border-2 border-white/5 rounded-full"></div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-24 h-24 border-6 border-white/5 rounded-full"
          >
            <div className="absolute inset-3 border-3 border-white/5 rounded-full">
              <div className="absolute inset-1 border border-white/5 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Welcome to{' '}
              <motion.span 
                className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 bg-clip-text text-transparent inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Shakuntala Tyres
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl font-semibold text-primary-200 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your Trusted Tyre Partner in Jhumri Telaiya
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl text-yellow-300 font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              "Quality Tyres, Expert Service, Affordable Pricing."
            </motion.p>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              At Shakuntala Tyres, we provide a wide range of tyres for motorcycles, scooters, and cars, ensuring safety and performance for every journey.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/prices" className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 inline-flex items-center shadow-2xl hover:shadow-primary-500/25">
                  <span className="relative z-10">Explore Tyres</span>
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/about" 
                  className="group relative overflow-hidden px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white hover:text-gray-900 transition-all duration-300 inline-flex items-center"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16"
          >
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '15+', label: 'Years Experience' },
              { number: '100+', label: 'Tyre Models' },
              { number: '4.5★', label: 'Justdial Rating' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300">{stat.label}</div>
                  <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Showcase Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">Products</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {loading ? 'Loading our products...' : `${tyres.length > 0 ? 'Premium Quality Tyres from Trusted Brands' : 'Motorcycle, Scooter & Car Tyres - Tube & Tubeless Options'}`}
            </motion.p>
          </motion.div>

          {/* Sliding Product Cards */}
          <div className="relative overflow-hidden mb-12">
            {/* Left Arrow */}
            {tyres.length > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
            )}

            {/* Right Arrow */}
            {tyres.length > 0 && (
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : tyres.length > 0 ? (
              <motion.div
                animate={isPlaying ? { x: [-100, -2000] } : { x: -currentIndex * 280 }}
                transition={{
                  duration: isPlaying ? 20 : 0.5,
                  repeat: isPlaying ? Infinity : 0,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                className="flex space-x-6"
                onTouchStart={handleTouch}
                onMouseDown={handleTouch}
              >
                {tyres.map((tyre, index) => (
                  <motion.div
                    key={tyre._id}
                    className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <img 
                        src={tyre.image || '/tyre1.png'} 
                        alt={tyre.name}
                        className="h-32 w-32 object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-primary-600 font-medium mb-2">{tyre.brand}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tyre.name}</h3>
                      <div className="text-2xl font-bold text-primary-600">₹{tyre.price.toLocaleString()}</div>
                      {tyre.size && <div className="text-sm text-gray-500 mt-1">{tyre.size}</div>}
                      <div className="text-xs text-gray-400 mt-2">Stock: {tyre.stock}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No tyres available at the moment.</p>
              </div>
            )}
          </div>

          {/* Explore Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/prices" 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-primary-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Explore All Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trusted <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">Brands</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Choose from our extensive collection of top-quality tyre brands
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 5,
                  z: 50
                }}
                className="group perspective-1000"
              >
                <Link to={brand.path}>
                  <div className={`${brand.color} rounded-2xl p-8 text-center text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:transform group-hover:-translate-y-3 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300 inline-block">{brand.name}</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-40 h-40 border border-primary-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-32 h-32 border border-purple-200 rounded-full opacity-20"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">Us?</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Experience the difference with our commitment to quality and service
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5,
                  scale: 1.02
                }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-gray-100 h-full flex flex-col min-h-[300px] sm:min-h-[350px]">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  
                  {/* Icon container with tyre-themed design */}
                  <motion.div 
                    className="relative z-10 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Tyre rim pattern */}
                    <div className="absolute inset-2 border-2 border-white/30 rounded-xl">
                      <div className="absolute inset-1 border border-white/20 rounded-lg"></div>
                    </div>
                    
                    <feature.icon className="h-10 w-10 text-white relative z-10" />
                    
                    {/* Feature accent emoji */}
                    <div className="absolute -top-1 -right-1 text-lg">
                      {feature.accent}
                    </div>
                    
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                  
                  <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-purple-700 to-primary-800 relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Ready to Upgrade Your{' '}
              <motion.span
                className="inline-block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
                animate={{ rotateX: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                Tyres?
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Browse our extensive collection and find the perfect tyres for your vehicle today. 
              Experience premium quality with unmatched service.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/prices" 
                  className="group relative overflow-hidden bg-white text-primary-600 font-bold py-5 px-10 rounded-2xl hover:bg-gray-50 transition-all duration-300 inline-flex items-center shadow-2xl hover:shadow-white/25"
                >
                  <span className="relative z-10 text-lg">Shop Tyres Now</span>
                  <motion.div
                    className="ml-3 relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <TrendingUp className="h-6 w-6" />
                  </motion.div>
                  
                  {/* Tyre tread pattern */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;