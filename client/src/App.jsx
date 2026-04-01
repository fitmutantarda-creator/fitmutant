import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WeightLoss from "./pages/WeightLoss";
import WeightGain from "./pages/WeightGain";
import SportsNutrition from "./pages/SportsNutrition";
import AdminPackages from "./pages/AdminPackages";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weight-loss" element={<WeightLoss />} />
          <Route path="/weight-gain" element={<WeightGain />} />
          <Route path="/sports-nutrition" element={<SportsNutrition />} />
          <Route 
            path="/admin/packages" 
            element={
              <ProtectedRoute>
                <AdminPackages />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
