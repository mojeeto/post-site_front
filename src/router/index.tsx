import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PostCardList from "../components/posts/post-card-list";
import LoginPage from "../components/auth/login-page";
import SignUpPage from "../components/auth/signup-page";
import IsAuth from "../components/auth/is-auth";
import IsNotAuth from "../components/auth/is-not-auth";
import Logout from "../components/auth/logout";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <IsAuth />,
        children: [
          {
            path: "/",
            element: <PostCardList />,
          },
          {
            path: "logout",
            element: <Logout />,
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
