import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PostCardList from "../components/posts/post-card-list";
import LoginPage from "../pages/auth/login-page";
import SignUpPage from "../pages/auth/signup-page";
import IsAuth from "../middleware/is-auth";
import IsNotAuth from "../middleware/is-not-auth";
import Logout from "../pages/auth/logout";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <IsAuth />,
        errorElement: <div>Error 500</div>,
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
        errorElement: <div>Error 500</div>,
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
