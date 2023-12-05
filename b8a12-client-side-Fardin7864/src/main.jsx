import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./routers/Mainrouter/MainRouter.jsx";
import { ToastContainer } from "react-toastify";
import AuthanticationProvider from "./providers/authProvider/AuthanticationProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'sweetalert2'



const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthanticationProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <RouterProvider router={MainRouter} />
    </AuthanticationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
