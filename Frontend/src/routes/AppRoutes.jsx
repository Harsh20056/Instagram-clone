import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ProtectedLayout from "../components/layout/ProtectedLayout";

// Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Search from "../pages/Search";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <PublicRoute>
        <ForgetPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <Home />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:userId?",
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <Profile />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <EditProfile />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <Search />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
]);
