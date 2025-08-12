
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FuelPricesPage from './pages/FuelPricesPage';
import CheapestPage from './pages/CheapestPage';
import StationDetailPage from './pages/StationDetailPage';

const AppLayout: React.FC = () => (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] text-white overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex flex-1 justify-center py-5">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="prices" element={<FuelPricesPage />} />
          <Route path="cheapest" element={<CheapestPage />} />
          <Route path="station/:stationId" element={<StationDetailPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
