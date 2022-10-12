import React from 'react';
import ReactDOM from 'react-dom';
import GenericSubmitButton from '../GenericSubmitButton';
import { renderer, render } from  '@testing-library/react';
import { createRoot } from 'react-dom/client';

it("render without crashing", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<GenericSubmitButton/>, div)
});
