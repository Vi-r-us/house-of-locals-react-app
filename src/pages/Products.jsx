import { useState } from "react";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../utils/Utilities";
import Filters from "../components/Filters";
import ProductsContainer from "../components/ProductsContainer";
import PaginationContainer from "../components/PaginationContainer";
import Footer from "../components/Footer";

const allProductsQuery = (params) => {
  const { search, category, company, sort, price, shipping, page } = params;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => axiosInstance("/products", { params }),
  };
};

export const Loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
  };

const Products = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  return (
    <main
      className="flex flex-col gap-4 max-w-[90rem] self-center justify-self-center"
      style={{ paddingTop: `${navbarHeight + 16}px` }}
    >
      <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
      <Footer />
    </main>
  );
};

export default Products;
