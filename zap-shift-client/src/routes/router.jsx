import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/Rider/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'rider',
          element: <PrivateRoute><Rider></Rider></PrivateRoute>,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())
        },
        {
          path: 'send-parcel',
          element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())
        },
        {
          path: 'coverage',
          Component: Coverage,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path: 'my-parcels',
        Component: MyParcels,
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path:'payment/:parcelId',
        Component: Payment
      },
      {
        path:'payment-success',
        Component:PaymentSuccess,
      },
      {
        path:'payment-cancelled',
        Component: PaymentCancelled,
      },
      {
        path: 'approve-riders',
        Component: ApproveRiders
      }
    ]
  }
]);