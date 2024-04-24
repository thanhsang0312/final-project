import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { wishServices } from "../../services/wishServices";

const initialState = {
    wishListInfo : {},
    wishListLoading: false,
}

export const wishListSlice = createSlice({
    initialState,
    name: "wishList",
    reducers: {
        createWishList: (state, action) => {
            state.wishListInfo = action.payload || state.wishListInfo;
        },
        clearWishList: (state) => {
            state.wishListInfo = {};
        }
    },
    extraReducers: (builder) => {
        // ADD TO WISH LIST
        builder.addCase(handleAddToWishList.pending, (state) => {
            state.wishListLoading = true;
        })
        builder.addCase(handleAddToWishList.fulfilled, (state) => {
            state.wishListLoading = false;
        })
        builder.addCase(handleAddToWishList.rejected, (state) => {
            state.wishListLoading = false;
        })

        // REMOVE FROM WISHLIST
        // builder.addCase(handleRemoveFromWishList.pending, (state) => {
        //     state.cartLoading = true;
        // })
        // builder.addCase(handleRemoveFromWishList.fulfilled, (state) => {
        //     state.cartLoading = false;
        // })
        // builder.addCase(handleRemoveFromWishList.rejected, (state) => {
        //     state.cartLoading = false;
        // })
    }
});

const { actions, reducer: wishListReducer } = wishListSlice;

export const { createWishList, clearWishList } = actions;

export default wishListReducer;

export const handleAddToWishList = createAsyncThunk(
    "wishList/add",
    async (actionPayload, thunkApi) => {
        try {
            const { addedId } = actionPayload;
            const { wishListInfo } = thunkApi.getState()?.wishList || {};
            let addPayload = {};
            if(wishListInfo) {
                console.log("Đã có wish list")
                const matchIndex = wishListInfo?.product?.findIndex(
                    (id) => id === addedId
                )

                console.log('wishListInfo', wishListInfo)

                const newProduct = [...(wishListInfo.product ?? [])];

                if(matchIndex > -1) {
                    message.warning("Product existed in your wish list!");
                } else {
                    newProduct.push(addedId);
                }
                console.log('newProduct', newProduct)
                addPayload = {
                    ...wishListInfo,
                    product: newProduct
                };
            } else {
                console.log("chưa có wish list");
                addPayload = {
                    ...wishListInfo,
                    product: [addedId]
                };
            }

            const wishListRes = await wishServices.addWishList(addPayload);
            message.success("Product is added to wish list!")
            return wishListRes?.data?.data;
        } catch (error) {
            console.log('error', error)
            thunkApi.rejectWithValue(error);
            message.error("Add to wish list failed!")
        }
    }
)

// export const handleRemoveFromWishList = createAsyncThunk(
//     "wishList/remove",
//     async (actionPayload, thunkApi) => {
//         const { removeIndex } = actionPayload || {};

//         const { wishListInfo } = thunkApi.getState?.wishList || {};

//         if(removeIndex < 0) return false;

//         try {
//             const newProduct = wishListInfo?.product?.filter((_, index) => index !== removeIndex).map((item) => item.id);

//             const updatePayload = {
//                 ...wishListInfo,
//                 product: newProduct,
//             }

//             const wishListRes = await wishServices.removeWishList(updatePayload);
//             message.success("Remove successfully!")
//             return wishListRes?.data?.data;
//         } catch (error) {
//             thunkApi.rejectWithValue(error);
//             message.error("Remove unsuccessfully!");
//             console.log('error', error);
//         }
//     }
// )