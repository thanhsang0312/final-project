import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleRemoveFromCart, handleUpdateCart } from '../../store/reducer/cartReducer';
import { SHIPPING_OPTIONS } from '../../const/general';

const useCartPage = () => {
    const dispatch = useDispatch();
    const quantityRef = useRef([]);
    const { cartInfo, cartLoading } = useSelector((state) => state.cart);
    const { 
        product,
        quantity,
        variant,
        totalProduct,
        subTotal,
        discount, 
        shipping,
        total,
     } = cartInfo || {};

    const updateQuantityTimeout = useRef();
    const handleUpdateQuantity = (updatedQuantity, updatedIndex) => {
        const getPayload = () => {
            const newQuantity = quantity.map((item, index) => index === updatedIndex ? updatedIndex : item);
            const newTotalProduct = totalProduct.map((item, index) => index === updatedIndex ? product[updatedIndex].price * updatedQuantity : item);
            const newSubTotal = newTotalProduct.reduce((curr, next) => Number(curr) + Number(next), 0) || 0;
            const newTotal = total - (discount ?? 0) + (shipping?.price ?? 0);

            return {
                ...cartInfo,
                product: product.map((item) => item.id),
                quantity: newQuantity,
                totalProduct: newTotalProduct,
                subTotal: newSubTotal,
                total: newTotal, 
            };
        };

        if(updateQuantityTimeout.current) {
            clearTimeout(updateQuantityTimeout.current);
        }

        updateQuantityTimeout.current = setTimeout(async () => {
            if(
                !cartLoading &&
                updatedQuantity !== "" &&
                quantity[updatedIndex] !== updatedQuantity
            ) {
                try {
                    const res = await dispatch(handleUpdateCart(getPayload())).unwrap();
                } catch (error) {
                    quantityRef.current[updatedIndex]?.reset?.();
                }
            }
        }, 300);
    };

    const handleRemoveProduct = (removedIndex) => {
        if (cartLoading || removedIndex < 0) return;
        dispatch(handleRemoveFromCart({removedIndex}));
    };

    const handleUpdateShipping = (selectedTypeShip) => {
        const selectedShipping = SHIPPING_OPTIONS.find((option) => option.value === selectedTypeShip);

        if(selectedShipping) {
            const updatePayload = {
                ...cartInfo,
                product: product?.map((item) => item.id),
                shipping: {
                    typeShip: selectedShipping.value,
                    price: selectedShipping.price,
                },
                total: total - (shipping?.price || 0) + selectedShipping.price,
            };
            dispatch(handleUpdateCart(updatePayload));
        }
    }

    const cartTableProps = {
        products: product?.map((item, index) => {
            return {
                ...item,
                quantity: quantity?.[index],
                totalProduct: totalProduct?.[index],
                variant: variant?.[index],
            };
        }) || [],
        quantityRef,
        handleUpdateQuantity,
        handleRemoveProduct,
    }

    const cartSumaryProps = {
        total,
        subTotal,
        shipping,
        typeShip: shipping?.typeShip,
        handleUpdateShipping
    }
  return {
    cartTableProps,
    cartSumaryProps,
  }
}

export default useCartPage