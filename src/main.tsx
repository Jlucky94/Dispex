import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "redux/store";
import FlatResidents from "Components/FlatResidents/FlatResidents";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "Components/Layout/Layout";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: "address",
                element: <FlatResidents />,
            },
        ],
    },
]
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
    ,
)
