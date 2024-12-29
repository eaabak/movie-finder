import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
