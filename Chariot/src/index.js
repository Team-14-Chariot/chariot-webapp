import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css';
import HomePageGeneric from './routes/home-page-generic';
import Page from './routes/page1';
import RegistrationPage from './routes/registration-page';
import ForgotPasswordPage from './routes/forgot-password-page';
import reportWebVitals from './reportWebVitals';

const signedIn = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageGeneric />,
  },
  {
    path: "page/",
    element: <Page />
  },
  {
    path: "register/",
    element: <RegistrationPage />
  },
  {
    path: "forgot-password/",
    element: <ForgotPasswordPage />
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

export {signedIn};
