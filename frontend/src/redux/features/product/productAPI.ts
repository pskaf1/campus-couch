import baseAPI from "@/redux/api/baseAPI";

interface Product {
  _id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  isRentable: boolean;
  isBuyable: boolean;
  stock: number;
  notes: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
  materials: string[];
  rentPrice: number;
}

const productAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({ query: () => "/products" }),
  }),
});

export const { useGetProductsQuery } = productAPI;
