import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PaginationContainer from "../components/PaginationContainer";
import OrdersList from "../components/OrdersList";
import { toast } from "react-toastify";
import { NavLink, redirect, useLoaderData } from "react-router-dom";
import { axiosInstance } from "../utils/Utilities";
import { CiShoppingCart } from "react-icons/ci";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseFloat(params.page) : 1,
    ],
    queryFn: () =>
      axiosInstance.get("/orders", {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  };
};

export const Loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("Please login to continue");
      return redirect("/login");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error loading your order. Please try again.";
      toast.error(errorMessage);
      if (error?.response?.status === 401) return redirect("/login");
      return null;
    }
  };

const Orders = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    toast.warn("Please make an order.");
    return redirect("/products");
  }

  return (
    <main
      className="flex flex-col max-w-[1200px] gap-4"
      style={{ paddingTop: `${navbarHeight + 16}px` }}
    >
      <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />

      <OrderHeader />
      <OrdersList />
      <PaginationContainer />

      <Footer />
    </main>
  );
};

const OrderHeader = () => {
  const { meta } = useLoaderData();

  return (
    <section
      className="w-full mx-auto border-[1px] border-tom-500
          rounded-2xl p-4 flex gap-2 justify-between items-center"
    >
      <span className="flex gap-2">
        <h1 className="text-4xl font-medium">My Orders</h1>
        <p className="font-light mt-[-5px] text-sm">
          [{meta.pagination.total}]
        </p>
      </span>

      <NavLink
        className=" rounded-lg border-[1px] border-tom-500 px-4 py-2 
          text-sm font-light flex gap-2 items-center hover:bg-tom-700
        hover:text-tom-50 duration-150"
        to={"/products"}
      >
        <CiShoppingCart className="w-4 h-4" /> Buy Products
      </NavLink>
    </section>
  );
};

export default Orders;
