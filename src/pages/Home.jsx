import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../utils/Utilities";
import Footer from "../components/Footer";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => axiosInstance(url),
};

export const Loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;
  return { products };
};

const Home = () => {
  return (
    <main className="gap-4">
      <Navbar isHome={true} />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </main>
  );
};

export default Home;
