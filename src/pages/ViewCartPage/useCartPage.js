import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
    }

    const cartSumaryProps = {}
  return {
    cartTableProps,
    cartSumaryProps,
  }
}

export default useCartPage