import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cartServices } from "../../services/cartServices";
import { message } from "antd";

const initialState = {
    cartInfo: {},
    cartLoading: false,
}
export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        updateCacheCart: (state, action) => {
            state.cartInfo = action.payload || state.cartInfo;
        },
        clearCart: (state) => {
            state.cartInfo = {};
        }
    },
    extraReducers: (builder) => {
        // GET CART

        builder.addCase(handleGetCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleGetCart.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cartInfo = action.payload;
        });
        builder.addCase(handleGetCart.rejected, (state) => {
            state.cartLoading = false;
            state.cartInfo = {};
        })

        // ADD CART 
        builder.addCase(handleAddCart.pending, (state) => {
            state.cartLoading = true;
        })
        builder.addCase(handleAddCart.fulfilled, (state) => {
            state.cartLoading = false;
        })
        builder.addCase(handleAddCart.rejected, (state) => {
            state.cartLoading = false;
        })

        // REMOVE FROM CART
        builder.addCase(handleRemoveFromCart.pending, (state) => {
            state.cartLoading = true;
        })
        builder.addCase(handleRemoveFromCart.fulfilled, (state) => {
            state.cartLoading = false;
        })
        builder.addCase(handleRemoveFromCart.rejected, (state) => {
            state.cartLoading = false;
        })

        // UPDATE CART
        builder.addCase(handleUpdateCart.pending, (state) => {
            state.cartLoading = true;
        })
        builder.addCase(handleUpdateCart.fulfilled, (state) => {
            state.cartLoading = false;
        })
        builder.addCase(handleUpdateCart.rejected, (state) => {
            state.cartLoading = false;
        })
    }
})

const { actions, reducer: cartReducer } = cartSlice;

export const { updateCacheCart, clearCart } = actions;

export default cartReducer;

export const handleGetCart = createAsyncThunk(
    "cart/get",
    async (_, thunkApi) => {
        try {
            const cartRes = await cartServices.getCart();
            return cartRes?.data?.data;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
)

export const handleAddCart = createAsyncThunk(
    "cart/add",
    async(actionPayload, thunkApi) => {
        try {
            const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;
            const { cartInfo } = thunkApi.getState()?.cart || {};

            let addPayload = {};
            if(cartInfo.id) {
                const matchIndex = cartInfo?.product?.findIndex(
                    (product) => product.id === addedId
                )

                const newProduct = cartInfo.product?.map((product) => {
                    return product.id
                })
                const newQuantity = [...(cartInfo.quantity ?? [])];
                const newVariant = [...(cartInfo.variant ?? [])];
                const newTotalProduct = [...(cartInfo.totalProduct ?? [])];
                if(matchIndex > -1 && newVariant[matchIndex] == addedColor) {
                    newQuantity[matchIndex] = Number(newQuantity[matchIndex]) + Number(addedQuantity);
                    newTotalProduct[matchIndex] = Number(newTotalProduct[matchIndex]) + addedPrice * addedQuantity;
                } else {
                    newProduct.push(addedId);
                    newQuantity.push(addedQuantity);
                    newVariant.push(addedColor);
                    newTotalProduct.push(addedPrice * addedQuantity);
                }

                const newSubTotal = newTotalProduct.reduce(
                    (curr, next) => Number(curr) + Number(next), 0
                ) || 0;

                const newTotal = newSubTotal - cartInfo.discount;

                addPayload = {
                    ...cartInfo,
                    product: newProduct,
                    quantity: newQuantity,
                    variant: newVariant,
                    subTotal: newSubTotal,
                    total: newTotal,
                    totalProduct: newTotalProduct
                }
            } else {
                addPayload = {
                    product: [addedId],
                    quantity: [addedQuantity],
                    variant: [addedColor],
                    totalProduct: [addedPrice * addedQuantity],
                    subTotal: addedPrice * addedQuantity,
                    total: addedPrice * addedQuantity,
                    discount: 0,
                    paymentMethod: ""
                }
            }

            const cartRes = await cartServices.updateCart(addPayload);
            thunkApi.dispatch(handleGetCart());
            message.success("Add product is added to cart!");
            return cartRes?.data?.data;

        } catch (error) {
            thunkApi.rejectWithValue(error);
            message.success("Add to cart failed!")
        }
    }
)

export const handleRemoveFromCart = createAsyncThunk(
    "cart/removeProduct",
    async (actionPayload, thunkApi) => {
        const { removedIndex } = actionPayload || {};
        
        const { cartInfo } = thunkApi.getState()?.cart || {};

        if(removedIndex < 0) return false;

        try {
            const newProduct = cartInfo?.product?.filter((_, index) => index !== removedIndex).map((item) => item.id);
            console.log('newProduct', newProduct)
            
            const newQuantity = cartInfo.quantity?.filter((_, index) => index !== removedIndex);

            const newVariant = cartInfo.variant?.filter((_, index) => index !== removedIndex);

            const newTotalProduct = cartInfo.totalProduct?.filter((_, index) => index !== removedIndex);

            const newSubtotal = newTotalProduct?.reduce((curr, next) => Number(curr) + Number(next) , 0) || 0;

            const newTotal = newSubtotal - (cartInfo.discount ?? 0) + (cartInfo.shipping?.price ?? 0);

            const updatePayload = {
                ...cartInfo,
                product: newProduct,
                quantity: newQuantity,
                variant: newVariant,
                totalProduct: newTotalProduct,
                subTotal: newSubtotal,
                total: newTotal,
                shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
                discount: newProduct?.length > 0 ? cartInfo.discount : 0,
            }

            const cartRes = await cartServices.updateCart(updatePayload);
            thunkApi.dispatch(handleGetCart());
            message.success("Remove from cart successfully!");
            return cartRes?.data?.data;
        } catch (error) {
            thunkApi.rejectWithValue(error);
            message.error("Remove unsuccessfully!");
            console.log('error', error);
        }
    }
);

export const handleUpdateCart = createAsyncThunk(
    "cart/update",
    async (actionPayload, thunkApi) => {
        const { dispatch, rejectWithValue } = thunkApi;
        try {
            const cartRes = await cartServices.updateCart(actionPayload);
            dispatch(handleGetCart());
            message.success("Update cart successfully!")
            return cartRes?.data?.data;
        } catch (error) {
            rejectWithValue(error);
            message.error("Update cart unsuccessfully!");
            console.log('error', error);
            return error;
        }
    }
)