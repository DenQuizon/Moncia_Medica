import { createBrowserRouter } from "react-router-dom";
import ParentLayout from "../ParentLayout";
import Home from "../User/Home/Home";
import Shop from "../User/Shop/Shop";
import Cart from "../User/Cart/Cart";
import Invoice from "../User/Invoice/Invoice";
import Checkout from "../User/Checkout/Checkout";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Dashboard from "../Dashboard";
import ManageCategory from "../Admin/ManageCategory";
import ManageUser from "../Admin/ManageUser";
import ManageBanner from "../Admin/ManageBanner";
import ManagePayment from "../Admin/ManagePayment";
import SalesReport from "../Admin/SalesReport";
import PrivateRoute from "../router/PrivateRoute";
import AdminRoute from "../Admin/AdminRoute";
import SellerRoute from "../Seller/SellerRoute";
import Medicines from "../Seller/Medicines";
import Advertisement from "../Seller/Advertisement";
import CategoryDetails from "../User/CategoryDetails";
import PaymentHistory from "../User/Checkout/PaymentHistory";
import SellerPayment from "../Seller/SellerPayment";
import HomepageSeller from "../Seller/HomepageSeller";
import AdminHomepage from "../Admin/AdminHomepage";
import User from "../User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentLayout></ParentLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "category/details/:category",
        element: <CategoryDetails></CategoryDetails>,
      },
      {
        path: "/profile",
        element: <User></User>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },

      {
        path: "/invoice/:transaction_id",
        element: (
          <PrivateRoute>
            <Invoice></Invoice>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/managecategory", // Relative path
        element: (
          <AdminRoute>
            <ManageCategory></ManageCategory>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adminhome", // Relative path
        element: (
          <AdminRoute>
            <AdminHomepage></AdminHomepage>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageuser", // Relative path
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managepayment", // Relative path
        element: (
          <AdminRoute>
            <ManagePayment></ManagePayment>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/salesreport", // Relative path
        element: (
          <AdminRoute>
            <SalesReport></SalesReport>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managebanner", // Relative path
        element: (
          <AdminRoute>
            <ManageBanner></ManageBanner>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/medicine", // Relative path
        element: (
          <SellerRoute>
            <Medicines></Medicines>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/advertisement", // Relative path
        element: (
          <SellerRoute>
            <Advertisement></Advertisement>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/sellerpayment", // Relative path
        element: (
          <SellerRoute>
            <SellerPayment></SellerPayment>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/homepage", // Relative path
        element: (
          <SellerRoute>
            <HomepageSeller></HomepageSeller>
          </SellerRoute>
        ),
      },
    ],
  },
]);
