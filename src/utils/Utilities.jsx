import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: productionUrl,
});

/**
 * Format a price in cents to a string representing a price in US dollars
 * @param {number} price - The price in cents
 * @returns {string} The price formatted as a string
 * @example
 * formatPrice(1234) // "$12.34"
 */
export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};


/**
 * Returns an array of a length that will fill the remaining space in the grid
 * after the given number of elements have been placed.
 *
 * @param {number} width The width of the screen.
 * @param {number} count The number of elements that have been placed.
 * @returns {number[]} An array of a length that will fill the remaining space
 * in the grid.
 */
export function getFillerDivsCount(width, count) {
  if (width < 640) {
    return [];
  } else if (width < 1024) {
    return NewArray(count % 2 === 0 ? 0 : 2 - (count % 2));
  } else if (width < 1280) {
    return NewArray(count % 3 != 0 ? 3 - (count % 3) : 0);
  } else {
    return NewArray(count % 4 != 0 ? 4 - (count % 4) : 0);
  }
}

/**
 * Creates a new array of a given size and fills it with the index of each
 * element. This is used to create an array of a length that will fill the
 * remaining space in the grid after the given number of elements have been
 * placed.
 *
 * @param {number} size The size of the array to create.
 * @returns {number[]} The new array.
 */
export function NewArray(size) {
  var x = [];
  for (var i = 0; i < size; ++i) x[i] = i;
  return x;
}

// Dummy product details data
export const productDetails = [
  {
    heading: "Dimensions",
    details: [
      { title: "Length", value: "290 cm" },
      { title: "Width", value: "195 cm" },
      { title: "Height", value: "68 cm" },
      { title: "Weight", value: "48 kg" },
    ],
  },
  {
    heading: "Materials",
    details: [
      { title: "Seats", value: "Virgin Wool" },
      { title: "Legs and Table", value: "Oak Plywood" },
    ],
  },
  {
    heading: "General",
    details: [
      { title: "Warranty", value: "2 years" },
      { title: "Origin", value: "India" },
    ],
  },
];

export const heroImageUrl =
  "https://images.unsplash.com/photo-1684867430634-b1b22843d1f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Dummy articles data
export const articlesList = [
  {
    articleTitle:
      "Eco Friendly, Handmade, Sustainable furniture by House of Locals for a better future.",
    articleLink: "#",
    buttonText: "Explore More",
    backgroundImage:
      "https://images.unsplash.com/photo-1684867430634-b1b22843d1f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    articleTitle:
      "Furniture that is suited for all types of purposes. Explore our extensive product store.",
    articleLink: "#",
    buttonText: "Visit Store",
    backgroundImage:
      "https://images.unsplash.com/photo-1684867430634-b1b22843d1f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    articleTitle:
      "We make customized furniture on demand. Contact us for more information.",
    articleLink: "#",
    buttonText: "Contact Us",
    backgroundImage:
      "https://images.unsplash.com/photo-1684867430634-b1b22843d1f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];