import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import PostList from "./components/PostList";
import Add from "./Pages/Add";
import Edite from "./Pages/Edite";
import Detiles from "./Pages/Detiles";
import ErrorPage from "./Pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PostList /> },
      { path: "post", element: <PostList /> },
      { path: "post/add", element: <Add /> },
      { path: "post/:id/edit", element: <Edite /> },
      {
        path: "post/:id/detiles", element: <Detiles />, loader: (data) => {
          if (isNaN(data.params.id)) {
            throw new Response("Bad Request", { status: "400" })  /*error handling*/
          }
        }
      }

    ]


  }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);
