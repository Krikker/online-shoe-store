import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ServicesState, SmallInfo, Categories, ProductsInfo, OrderData, CartInfo } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

const loadCartInfo = () => {
  const info = localStorage.getItem('cart');
  return info ? JSON.parse(info) : [];
}

const initialState: ServicesState = {
  cart: loadCartInfo(),
  query: '',
  loading: false,
  error: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartInfo>) => {
      const existingItem = state.cart.find(
        item => action.payload.id === item.id && action.payload.size === item.size
      )
      if (existingItem) {
        existingItem.amount += action.payload.amount;
        existingItem.total += existingItem.price * action.payload.amount;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeFromCart: (state, action: PayloadAction<{ id: number; size: string }>) => {
      state.cart = state.cart.filter(
        item => item.id !== action.payload.id && item.size !== action.payload.size
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.clear();
    },

    changeSearchField: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    clearSearchField: (state) => {
      state.query = '';
    }
  }
})

export const {
  addToCart, removeFromCart, clearCart, changeSearchField, clearSearchField
} = servicesSlice.actions;
export default servicesSlice.reducer;

export const productsApi = createApi({
  reducerPath: 'apiServices',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:7070/api'
  }),
  endpoints: (builder) => ({
    getTopSales: builder.query<SmallInfo[], void>({
      query: () => '/top-sales',
    }),
    getCategories: builder.query<Categories[], void>({
      query: () => '/categories',
    }),
    getProducts: builder.query<SmallInfo[], { categoryId?: number; offset?: number; q?: string }>({
      query: ({ categoryId = 0, offset = 0, q = '' }) => ({
        url: '/items',
        params: {
          ...(categoryId && { categoryId }),
          ...(offset && { offset }),
          ...(q && { q })
        }
      }),
    }),
    getOneProduct: builder.query<ProductsInfo, number>({
      query: (id) => `/items/${id}`,
    }),
    createOrder: builder.mutation<void, OrderData>({
      query: (orderData) => ({
        url: '/order',
        method: 'POST',
        body: orderData,
      })
    }),
  })
});

export const {
  useGetTopSalesQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetOneProductQuery,
  useCreateOrderMutation,
} = productsApi;