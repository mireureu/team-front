
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from "./router";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <RouterProvider router={Router}/>
    </Provider>    
);





