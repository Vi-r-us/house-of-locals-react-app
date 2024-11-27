/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/Navbar";
import enquiryImage from "../assets/enquiry-mag.png";
import { axiosInstance, formatPrice, productDetails } from "../utils/Utilities";
import { useLoaderData } from "react-router-dom";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import PlusMinusInputButton from "../utils/PlusMinusInputButton";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import Footer from "../components/Footer";

/**
 * A React Query hook for fetching a single product by its id.
 *
 * @param {number} id The product id.
 *
 * @returns {Object} The query object with queryKey and queryFn.
 * @property {string[]} queryKey A unique key for the query.
 * @property {function(): Promise<Product>} queryFn The query function.
 */
const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => axiosInstance(`/products/${id}`),
  };
};

/**
 * Ensures the product data is loaded from the server or cache.
 *
 * @param {QueryClient} queryClient The React Query client.
 *
 * @returns {Promise<{ product: import("../utils/types").Product }>} The product data.
 */
export const Loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    const product = response.data.data;
    return { product };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();

  const { title, price, image, description, category, company, colors } =
    product.attributes;

  const dollarAmount = formatPrice(price);

  const [count, setCount] = useState(1);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [productColor, setProductColor] = useState(colors[0]);

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount: count,
    productColor,
    company,
    category,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <main className="gap-4">
      <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />
      <section
        className={`w-full border-[1px] border-tom-500 rounded-2xl
          flex bg-tom-500 gap-[1px] flex-col overflow-hidden max-w-[1100px]`}
        style={{
          marginTop: `${navbarHeight}px`,
        }}
      >
        <div className="flex gap-[1px] flex-col md:flex-row ">
          <div className="bg-serenade-50 md:w-[60%] p-6">
            <img
              src={image}
              alt={title}
              className="rounded-2xl aspect-square object-cover"
            />
          </div>

          <div
            className="bg-serenade-50 flex flex-col items-center justify-center 
            max-h-full md:w-[40%]"
          >
            <div className=" p-6 flex flex-col gap-2 ">
              <p className="text-tom-950 font-light text-sm">{category}</p>
              <h1 className="capitalize text-4xl font-light">{title}</h1>
              <p className="text-tom-950 font-light text-sm">{description}</p>

              <div className="flex items-center mt-4 gap-2">
                <p className="font-mirage text-tom-950 font-bold text-xl mr-auto">
                  {dollarAmount}
                </p>
                {colors &&
                  colors.map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`w-5 h-5 rounded-full border-2 ${
                        color === productColor
                          ? "border-tom-950"
                          : "border-tom-300"
                      }`}
                      onClick={() => setProductColor(color)}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
              </div>

              <div className="flex gap-2 mt-4">
                <PlusMinusInputButton count={count} setCount={setCount} />
                <button
                  className="bg-tom-700 p-2 rounded-xl flex-1 
                  font-light text-sm text-serenade-50 uppercase"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex flex-col mt-2">
                <div className="text-[#7a7b7e] font-light text-xs flex items-center gap-2">
                  <CiCreditCard1 className="inline w-5 h-5" />
                  <p>We accept payment from every major card providers</p>
                </div>

                <div className="text-[#7a7b7e] font-light text-xs flex items-center gap-2">
                  <CiDeliveryTruck className="inline w-5 h-5" />
                  <p>Free delivery from orders above $1200</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[1px] w-full flex-col md:flex-row">
          {/* Product Description */}
          <ProductDescription />

          {/* Technical Details */}
          <TechnicalDetails />

          {/* Enquiry */}
          <Enquiry />
        </div>
      </section>
      <Footer />
    </main>
  );
};

const TechnicalDetails = () => {
  return (
    <div className="flex gap-[1px] w-full flex-col">
      <div className="bg-serenade-50 text-center py-4">
        <h1 className="text-3xl font-light text-tom-950">Technical Details</h1>
      </div>
      <div className="bg-serenade-50 p-6 flex flex-col gap-5 h-full">
        {productDetails.map((details, index) => (
          <Detail key={index} detail={details} />
        ))}
      </div>
    </div>
  );
};

const Detail = ({ detail }) => {
  return (
    <div className="flex gap-2 flex-col">
      <p className="text-tom-950 font-medium text-sm">{detail.heading}</p>
      <ul className="flex gap-1 flex-col">
        {detail.details.map((ele, index) => (
          <li
            key={index}
            className="w-full flex place-content-between text-sm font-light"
          >
            <p className="text-[#7a7b7e] text-sm ">{ele.title}</p>
            <p className="w-24 text-tom-950 text-left">{ele.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductDescription = () => {
  return (
    <div className="flex gap-[1px] w-full flex-col">
      <div className="bg-serenade-50 text-center py-4">
        <h1 className="text-3xl font-light text-tom-950">
          Product Description
        </h1>
      </div>
      <div className="bg-serenade-50 p-6 h-full">
        <p className="text-tom-950 font-light text-sm text-center">
          Introducing our exquisite round tea table, meticulously crafted from
          high-quality solid wood, enhancing both durability and elegance.{" "}
          <br /> <br />
          Made with precision in our state-of-the-art manufacturing facility,
          this table seamlessly combines traditional craftsmanship with modern
          design, offering the perfect centerpiece for your tea gatherings.
          Sourced responsibly, the materials used reflect our commitment to
          sustainability, making it a conscious choice for your home decor.
        </p>
      </div>
    </div>
  );
};

const Enquiry = () => {
  return (
    <div className="flex gap-[1px] w-full flex-col">
      <div className="bg-serenade-50 text-center py-4">
        <h1 className="text-3xl font-light text-tom-950">Enquiry</h1>
      </div>
      <div className=" bg-serenade-50 p-4 h-full">
        <figure className="mx-auto w-44">
          <img src={enquiryImage} alt="Magnifying Glass" />
        </figure>
        <p className="text-tom-950 font-light text-sm text-center mb-4">
          Enquire for more details about this item, we will like to hear from
          you. Our team will connect with you after receiving the query.
        </p>
        <button
          className="px-4 py-2 uppercase rounded-xl text-tom-700
            border-[2px] border-tom-500 w-full text-sm "
        >
          Enquire now
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
