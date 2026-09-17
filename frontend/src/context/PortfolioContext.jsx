import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { initialPortfolioData } from '../data/initialData';

const PortfolioContext = createContext();

const CACHE_KEY = 'portfolio_cached_data_v1';

const getInitialData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.profile && parsed.profile.name) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading portfolio cache:', e);
  }
  return initialPortfolioData;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(getInitialData);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async (showLoading = false) => {
    try {
      if (showLoading) setLoading(true);
      setIsRefreshing(true);
      const res = await axios.get('/api/portfolio');
      if (res.data && res.data.profile) {
        setData(res.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(res.data));
      }
      setError(null);
    } catch (err) {
      console.error('Error refreshing portfolio data:', err);
      setError('Failed to load live portfolio data.');
    } finally {
      if (showLoading) setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData(false);
  }, []);

  const sendContactMessage = async (formData) => {
    const res = await axios.post('/api/contact', formData);
    return res.data;
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, isRefreshing, error, refreshData: () => fetchPortfolioData(true), sendContactMessage }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);

