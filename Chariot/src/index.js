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
import reportWebVitals from './reportWebVitals';

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
