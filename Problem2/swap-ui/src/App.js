import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SwapPage from "./pages/SwapPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<SwapPage />} />
    </Routes>
  );
}

export default App;
