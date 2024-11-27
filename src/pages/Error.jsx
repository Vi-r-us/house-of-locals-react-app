import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="">
      {/* <Navbar />
      <Footer /> */}
      <section
        className="bg-[url('./assets/error-bg.png')] bg-center bg-cover w-full flex-1 p-4 gap-6
          flex flex-col justify-center items-center text-serenade-50 text-center rounded-2xl md:gap-10"
      >
        <h1 className="text-9xl">404</h1>
        <h2 className="text-5xl max-w-[424px]">
          It seems we got lost in a jungle
        </h2>
        <p className="max-w-[380px]">
          Don&apos;t worry we started to 100k for a right path in the meantime
          please let us take you on another trip
        </p>

        <div className="flex gap-6">
          <Link
            to="/"
            className="px-5 py-2 border-[1px] rounded-3xl font-light"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="px-5 py-2 border-[1px] rounded-3xl font-light"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Error;
