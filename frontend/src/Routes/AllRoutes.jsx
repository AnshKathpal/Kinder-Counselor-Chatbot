import React from "react";
import { Chatbot } from "../Pages/Chatbot";
import {Route, Routes} from "react-router-dom"

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Chatbot />} />
    </Routes>
  );
};
