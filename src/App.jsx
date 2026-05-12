import React, { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Orders from "./pages/Orders";
// import Customers from "./pages/Customers";
// import NotFound from "./pages/NotFound";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const Products = React.lazy(() => import("./pages/Products"))
const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"))


function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense fallback={<Loading />}>

      <Route>
        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
			    <Route path="/products/:id" element={<ProductsDetail />} /> 

        </Route>

        <Routes element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </Route>
    </Suspense>
  );
}

export default App