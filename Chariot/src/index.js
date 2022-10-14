import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import HomePageGeneric from './routes/home-page-generic';
//import Page from './routes/page1'
import SignInPage from './routes/signInPage';
import RegistrationPage from './routes/registration-page';
import ForgotPasswordPage from './routes/forgot-password-page';
import reportWebVitals from './reportWebVitals';
import RiderLinkPage from './routes/rider-link';
import NumRidersPage from './routes/numRidersPage';
import MainPage from './routes/main-page';
import CreateEventPage from './routes/create-event-page';
import {userConstants} from './constants/userConstants';



const thisUser = new userConstants();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageGeneric />,
  },
  {
    path: "signInPage/",
    element: <SignInPage />
  },
  {
    path: "register/",
    element: <RegistrationPage />
  },
  {
    path: "forgot-password/",
    element: <ForgotPasswordPage />
  },
  {
    path: "rider-link/",
    element: <RiderLinkPage />
  },
  {
    path: "numRiders/",
    element: <NumRidersPage />
  },
  {
    path: "main-page/",
    element: <MainPage />
  },
  {
    path: "create-event-page/",
    element: <CreateEventPage />
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {thisUser};