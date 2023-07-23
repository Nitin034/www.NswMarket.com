import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Crypto from './pages/Crypto'
import Trending from './pages/Trending';
import CryptoDetails from './components/CryptoDetails'
 
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto/>,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails/>
          }
        ]
         
      },
      {
        path: "saved",
        element: <Saved/>,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails/>
          }
        ]
         
      },
      {
        path: "trending",
        element: <Trending/>,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails/>
          }
        ]
         
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

 
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//      <RouterProvider router={router} />
//   </React.StrictMode>
// );

 
