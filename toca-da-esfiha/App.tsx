import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  const location = useLocation();
  
  // Determine page name based on path
  let pageName = 'Menu';
  if (location.pathname.includes('checkout')) {
    pageName = 'Checkout';
  }

  return (
    <Layout currentPageName={pageName}>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Layout>
  );
}