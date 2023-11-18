import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main-layout";
import PostCardList from "../components/posts/post-card-list";
import LoginPage from "../components/auth/login-page";
import SignUpPage from "../components/auth/signup-page";
import IsAuth from "../components/auth/is-auth";
import IsNotAuth from "../components/auth/is-not-auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <IsAuth />,
        children: [
          {
            path: "/",
            element: <PostCardList />,
          },
        ],
      },
      {
        element: <IsNotAuth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
