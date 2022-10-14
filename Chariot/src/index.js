import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import HomePageGeneric from './routes/home-page-generic';
import SignInPage from './routes/signInPage';
import RegistrationPage from './routes/registration-page';
import ForgotPasswordPage from './routes/forgot-password-page';
import reportWebVitals from './reportWebVitals';
import MainPage from './routes/main-page';
import CreateEventPage from './routes/create-event-page';
import {userConstants} from './constants/userConstants';
import PocketBase from 'pocketbase';
import StartUpdatePage from './routes/start-update-page';
import RiderEtaPage from './routes/rider-eta-page';

const client = new PocketBase('http://127.0.0.1:8090');
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
    path: "main-page/",
    element: <MainPage />
  },
  {
    path: "create-event-page/",
    element: <CreateEventPage />
  },
  {
    path: "start-update-page/",
    element: <StartUpdatePage/>
  },
  {
    path: 'rider-eta-page/',
    element: <RiderEtaPage />
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

export {thisUser, client};