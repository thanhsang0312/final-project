import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { handleGetCart, updateCacheCart } from "../../store/reducer/cartReducer";
import { orderServices } from "../../services/orderServices";
import { useNavigate } from "react-router-dom";
import PATHS from "../../const/path";


const useCheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartInfo, cartLoading } = useSelector((state) => state.cart);
    const {
        subTotal, 
        shipping
    } = cartInfo || {};


    // Coupon
    const handleAddCoupon  = async (coupon) => {
        try {
            const couponRes = await orderServices.getVoucher(coupon);
            const couponInfo = couponRes?.data?.data;
            console.log("Da vao day")
            console.log('couponRes', couponRes)
            if(couponInfo) {
                dispatch(updateCacheCart({
                    ...cartInfo,
                    discount: couponInfo.value || 0,
                    discountCode: couponInfo.code || "",
                    total: subTotal - (couponInfo.value || 0) + (shipping?.price || 0),
                }));
                message.success("Add coupon successfully!")
            }
        } catch (error) {
            console.log('error', error);
            message.error("Add coupon unsuccessfully!")
        }
    }

    const handleRemoveCoupon = () => {
        try {
            if(cartInfo.discountCode) {
                dispatch(updateCacheCart({
                    ...cartInfo,
                    discount: 0,
                    discountCode: "",
                    total: subTotal + (shipping?.price || 0),
                }));
                message.success("Remove coupon successfuly!");
            }
        } catch (error) {
            console.log('error', error);
            message.error("Remove coupon unsuccessfully!");
        }
    }

    const couponProps = {
        addedCoupon: cartInfo.discountCode,
        handleAddCoupon,
        handleRemoveCoupon
    };

    const handleCheckout = async (data) => {
        if(data) {
            const { formInfo, cartInfo } = data || {};
            const {
                phone,
                email,
                firstName,
                province,
                district,
                ward,
                street,
                note,
                paymentMethod,
            } = formInfo || {};

            const {
                shipping,
                variant,
                subTotal,
                total,
                product,
                quantity,
                totalProduct,
                discount,
                discountCode,
            } = cartInfo || {};

            const checkoutPayload = {
                address: {
                    phone,
                    email,
                    fullName: firstName,
                    street: `${street}, ${ward?.label || ""}, ${district?.label || ""}, ${province?.label || ""}`,
                },
                note,
                paymentMethod,
                shipping,
                variant,
                subTotal,
                total,
                product: product?.map((item) => item.id) || [],
                quantity,
                totalProduct,
                discount,
                discountCode
            };

            try {
                const res = await orderServices.checkOut(checkoutPayload);
                if(res?.data?.data) {
                    dispatch(handleGetCart());
                    message.success("Checkout Successfully!");
                    navigate(PATHS.CHECKOUT_SUCCESS);
                } else {
                    message.error("Checkout failed!")
                }
            } catch (error) {
                message.error("Checkout Failed!")
            }
        }
    }

    const checkoutFormProps = {
        handleCheckout
    }
  return {
    couponProps,
    checkoutFormProps
  }
}

export default useCheckoutPage