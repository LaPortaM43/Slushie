import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";
import LocationsPage from "./components/LocationsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import OrderPage from "./components/OrderPage";
import BranchesList from "./components/BranchesList"; // Import the BranchesList component

function App() {
  return (
    <Router basename="/Slushie"> {/* Add the basename prop here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/branches" element={<BranchesList />} />
      </Routes>
    </Router>
  );
}

export default App;
