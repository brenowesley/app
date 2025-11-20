// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";

// AGORA ESSES ARQUIVOS DEVEM EXISTIR:
import Layout from './Layout';
import Home from './pages/Home';
import ShopDetails from './pages/ShopDetails';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import OwnerRegister from './pages/OwnerRegister';
import OwnerDashboard from './pages/OwnerDashboard';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/Home" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/ShopDetails" element={<Layout currentPageName="ShopDetails"><ShopDetails /></Layout>} />
        <Route path="/BookAppointment" element={<Layout currentPageName="BookAppointment"><BookAppointment /></Layout>} />
        <Route path="/MyAppointments" element={<Layout currentPageName="MyAppointments"><MyAppointments /></Layout>} />
        <Route path="/OwnerRegister" element={<Layout currentPageName="OwnerRegister"><OwnerRegister /></Layout>} />
        <Route path="/OwnerDashboard" element={<Layout currentPageName="OwnerDashboard"><OwnerDashboard /></Layout>} />
        <Route path="*" element={<div>404 - Página não encontrada</div>} />
      </Routes>
      <Toaster />
    </>
  );
}