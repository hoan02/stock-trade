import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MyOrders from "./pages/myOrders/MyOrders";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
        <ToastContainer autoClose={2000} draggablePercent={60} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
