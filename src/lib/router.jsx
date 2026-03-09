import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Posts from "./../Pages/Posts";
import NotFound from "../Pages/NotFoundPage";
import AuthLayout from "../Layouts/AuthLayout";
import Notifications from "../Pages/Notifications";
import ProtectedRoutes from "./ProtectedRouts/ProtectedRoutes";
import PostDetails from "../Pages/PostDetails";
import Settings from "../Pages/Settings";
import RegisterPage from "../Pages/Auth/RegisterPage";
import LoginPage from "../Pages/Auth/LoginPage";
import Profile from "../Pages/Profile";

export const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Posts /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
      { path: "notifications", element: <Notifications /> },
      { path: "post-details/:id", element: <PostDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
