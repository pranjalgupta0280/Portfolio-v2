import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState({
    profile: {},
    skills: [],
    education: [],
    achievements: [],
    dsaProfiles: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/portfolio');
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error('Error loading portfolio:', err);
      setError('Failed to load portfolio data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const sendContactMessage = async (formData) => {
    const res = await axios.post('/api/contact', formData);
    return res.data;
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, error, refreshData: fetchPortfolioData, sendContactMessage }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
