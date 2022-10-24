import React from 'react';
import ReactDOM from 'react-dom';
import GenericSubmitButton from '../GenericSubmitButton';
import NewEventButton from '../NewEventButton';
import SignInButton from '../SignInButton';
import SignInConfirmButton from '../SignInConfirmButton';
import SignUpButton from '../SignUpButton';
import { renderer, render } from  '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { Route } from 'react-router-dom';
import { screen, cleanup } from '@testing-library/react';

it("Generic Submit button renders correctly", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<GenericSubmitButton/>, div);
});


it("Sign-In confirm button renders correctly", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<SignInConfirmButton/>, div);
});



