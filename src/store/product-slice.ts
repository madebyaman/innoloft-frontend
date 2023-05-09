import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: {
    id: number;
    name: string;
  },
  categories: {
    id: number;
    name: string;
  }[],
  implementationEffortText: string | null,
  investmentEffort: string,
  trl: {
    id: number;
    name: string
  },
  video: string,
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    sex: number;
    profilePicture: string;
    position: string;
  },
  company: {
    name: string;
    logo: string;
    address: {
      country: {
        name: string;
      },
      city: {
        name: string;
      },
      street: string;
      house: string;
      zipCode: string;
      longitude: number;
      latitude: number;
    }
  },
  businessModels: {
    id: number;
    name: string;
  }[]
}

export interface ProductState {
  product: Product | null;
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  status: 'idle',
  error: null
}

interface Error {
  errorMessage: string
}

export const fetchProduct = createAsyncThunk<
  Product,
  void,
  { rejectValue: Error }
>(
  'product/fetchProduct',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/6781/`, {
      method: 'GET',
    })
    const json = await response.json() as Product
    return json
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateDescription: (state, action) => {
      if (!state.product) {
        return;
      }
      state.product.description = action.payload;
    },

    updateTitle: (state, action) => {
      if (!state.product) {
        return;
      }
      state.product.name = action.payload;
    },
    updateTRL: (state, action) => {
      if (!state.product) {
        return;
      }
      state.product.trl = action.payload;
    },
    updateBusinessModel: (state, action) => {
      if (!state.product) {
        return;
      }
      state.product.businessModels = [{ id: 123, name: action.payload }];
    },
    updateCategory: (state, action) => {
      if (!state.product) {
        return;
      }
      state.product.categories = [{ id: 111, name: action.payload }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message?.toString() || 'failed to fetch'
        }
      })
  }
});

export const selectProduct = (state: { product: ProductState }) => state.product.product;

export const {
  updateDescription,
  updateCategory,
  updateBusinessModel,
  updateTRL,
  updateTitle
} = productSlice.actions

export default productSlice.reducer;
