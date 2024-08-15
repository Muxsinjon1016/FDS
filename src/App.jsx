import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import WeAbout from "./pages/WeAbout";
import Menu from "./pages/Menu";
import Sign from "./pages/Sign";
import Cart from "./pages/Cart";
import { User } from "./pages/User";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./layout/mainLayout";
import { OrderedProducts } from "./components/user/components/orderedProducts/orderedProducts";
import { Orders } from "./components/user/components/orders/orders";
import { Profile } from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="about/:id" element={<About />} />
        <Route path="menu" element={<Menu />} />
        <Route path="weAbout" element={<WeAbout />} />
        <Route path="sign" element={<Sign />} />
        <Route path="cart" element={<Cart />} />
        <Route path="user" element={<User />}>
          <Route index element={<OrderedProducts />} />
          <Route path="ordered-products" element={<OrderedProducts />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="user-profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
