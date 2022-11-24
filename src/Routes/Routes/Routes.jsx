import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import CategoriesPage from "../../Pages/CategoriesPage/CategoriesPage";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Shared/Login/Login";
import Register from "../../Pages/Shared/Login/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <CategoriesPage></CategoriesPage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage></DashboardPage>,
      },
    ],
  },
]);

export default routes;
