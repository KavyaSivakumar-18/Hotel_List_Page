import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import HotelList from "./pages/HotelList";
import HotelDetails from "./pages/HotelDetails";

function App() {
  return (
    <div className="app">
      <Helmet>
        <title>Hotel Management System</title>
        <meta name="description" content="Explore hotels and hotel details" />
      </Helmet>

      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </div>
  );
}

export default App;
