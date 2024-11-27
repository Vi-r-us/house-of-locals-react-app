/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const AboutArticles = () => {
  const windowWidth = useSelector((state) => state.windowState.width);
  return (
    <section
      className="about-page-articles-grid w-full text-tom-950 border-[1px] border-tom-500 
      rounded-2xl overflow-hidden grid divide-y-[1px]"
    >
      {/* Row 1 */}
      <h1 className="text-4xl font-medium p-6 text-center">About Us</h1>

      {/* Row 2  */}
      <div
        className={`flex flex-col md:flex-row ${
          windowWidth < 768 && "divide-y-[1px]"
        } [&>*]:p-6 text-tom-500 `}
      >
        {windowWidth < 768 && (
          <h2 className="text-2xl font-medium text-tom-600">We</h2>
        )}
        <Article
          size={"lg"}
          image={
            "https://media.licdn.com/dms/image/v2/D4D12AQFKT-2S9M7lgA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689585452617?e=1738195200&v=beta&t=rEO59H2jDfPUzVDTxvGtNgZwPFqn__Z_1jMwalSSEvw"
          }
          title={"Who Are We?"}
          content="House of Locals began their journey with an Idea, to showcase Indian craft 
          traditions with contemporary designs keeping in mind our core principles; sustainable 
          solutions, artisanal empowerment and product development. It is a sustainable initiative 
          which focuses on empowering artisans through contemporary crafts of India while 
          protecting the core traditional essence."
        />
        {windowWidth >= 768 && (
          <h2 className="text-2xl font-medium text-tom-600 border-r-[1px]">
            We
          </h2>
        )}
      </div>

      {/* Row 3  */}
      <div
        className={`flex flex-col md:flex-row ${
          windowWidth < 768 ? "divide-y-[1px]" : "divide-x-[1px]"
        } [&>*]:p-6 text-tom-500 [&>article]:flex-1`}
      >
        <h2 className="text-2xl font-medium text-tom-600">Our Values</h2>
        <Article
          className="md:flex-2"
          image={
            "https://interiayano.com/_next/image?url=%2Fassets%2Fhero.jpg&w=1920&q=75"
          }
          title={"How We Started"}
          content="We began our journey in 2019 with event and space design using eco-friendly 
          materials. We started with the Ziro Music Festival in India, taking place in Arunachal 
          Pradesh. Our unique blend of tradition and innovation caught the eye of festival 
          attendees, and proved to us that there is a market for it. Since then, we have led the 
          production design of a series of events, festivals, and television sets."
        />
        <Article
          image={
            "https://images.unsplash.com/photo-1640532925102-fef8d2d0d2dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"What We Do"}
          content="We bring niche handcrafted products from remote parts of India to the 
          mainstream canvas. By bridging the gap between traditional artisans and the market, 
          House of Locals is contributing in keeping alive the art and livelihoods of artisans. 
          All our products are made only from raw materials that nature provides in abundance, 
          sourced and produced locally, without the need for machinery. Everything that we 
          create, we do in close partnerships with self-help groups and craft clusters, especially 
          those with women members. Currently, we work with artisans in, Assam, Arunachal Pradesh, 
          Manipur Tripura and Himachal Pradesh, and we hope to work in more regions and more 
          artisans along the way."
        />
      </div>
    </section>
  );
};

const Article = ({ image, title, content, size }) => {
  const windowWidth = useSelector((state) => state.windowState.width);
  return (
    <article
      className={`p-4 flex flex-col gap-4 text-center ${
        (size === "lg" && windowWidth >= 1080) && "md:flex-row items-center"
      }`}
    >
      <img
        className="object-cover rounded-2xl max-h-[300px] flex-1"
        src={image}
        alt={title}
      />
      <div className="flex flex-col gap-4 flex-1">
        <h3 className="text-3xl font-medium text-tom-950">{title}</h3>
        <p className="font-light text-tom-950">{content}</p>
        <span className="underline cursor-pointer text-tom-950">
          Read Article
        </span>
      </div>
    </article>
  );
};

export default AboutArticles;
