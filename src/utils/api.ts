import axios from 'axios';
import { Tyre } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tyreAPI = {
  // Get all tyres
  getAllTyres: async (): Promise<Tyre[]> => {
    try {
      const response = await api.get('/tyres');
      return response.data;
    } catch (error) {
      console.error('Error fetching tyres:', error);
      throw error;
    }
  },

  // Get tyre by ID
  getTyreById: async (id: string): Promise<Tyre> => {
    try {
      const response = await api.get(`/tyres/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tyre:', error);
      throw error;
    }
  },

  // Add new tyre (admin only)
  addTyre: async (tyre: Omit<Tyre, '_id'>): Promise<Tyre> => {
    try {
      const response = await api.post('/tyres', tyre);
      return response.data;
    } catch (error) {
      console.error('Error adding tyre:', error);
      throw error;
    }
  },

  // Update tyre stock
  updateStock: async (id: string, stock: number): Promise<Tyre> => {
    try {
      const response = await api.put(`/tyres/${id}/stock`, { stock });
      return response.data;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  },

  // Update tyre price
  updatePrice: async (id: string, price: number): Promise<Tyre> => {
    try {
      const response = await api.put(`/tyres/${id}/price`, { price });
      return response.data;
    } catch (error) {
      console.error('Error updating price:', error);
      throw error;
    }
  },

  // Record a sale
  recordSale: async (id: string, quantity: number): Promise<Tyre> => {
    try {
      const response = await api.post(`/tyres/${id}/sell`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error recording sale:', error);
      throw error;
    }
  },
};

export default api;