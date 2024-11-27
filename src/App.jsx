/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeOutlet from "./pages/HomeOutlet";
import {
  Home,
  Cart,
  About,
  Checkout,
  Error,
  SingleProduct,
  Products,
  Orders,
  Register,
  Login,
} from "./pages";

// Loaders
import { Loader as homeLoader } from "./pages/Home";
import { Loader as productLoader } from "./pages/SingleProduct";
import { Loader as productsLoader } from "./pages/Products";
import { Loader as checkoutLoader } from "./pages/Checkout";
import { Loader as ordersLoader } from "./pages/Orders";
// Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";

import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import WindowResizeListener from "./utils/WindowResizeListener";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeOutlet />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
        loader: homeLoader(queryClient),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction(store),
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction(),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },
      {
        path: "/products",
        element: <Products />,
        loader: productsLoader(queryClient),
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        loader: productLoader(queryClient),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <WindowResizeListener />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
