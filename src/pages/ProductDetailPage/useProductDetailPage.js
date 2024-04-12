import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { productService } from "../../services/productServices";
import { useEffect, useRef, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { handleAddCart } from "../../store/reducer/cartReducer";

const useProductDetailPage = () => {
    const { productSlug } = useParams();
    const colorRef = useRef();
    const quantityRef = useRef();
    const dispatch = useDispatch();
    

    const {data: productData, loading: productLoading, error: productError, execute} = useMutation(() => productService.getProductBySlug(productSlug))

    const productDetailData = productData || {};

    const { id, price, discount } = productDetailData || {};
    
    const { data : productDetailReview} = useQuery(() => id && productService.getProductReview(id), [id])

    const [selectedImage, setSelectedImage] = useState("")

    useEffect(() => {
      execute(productSlug);
    }, [productSlug])

    const handleAddToCart =  async () => { 
        const { value: color, reset: colorReset } = colorRef.current || {};
        const { value: quantity, reset: quantityReset } = quantityRef.current || {};

        if(!color) {
            message.error("Please select color!")
            return;
        } else if (isNaN(quantity) && quantity < 1) {
            message.error("Quantity must be greater than 1!");
            return;
        }

        // ADD CART

        const addPayLoad = {
            addedId: id,
            addedColor: color,
            addedQuantity: quantity,
            addedPrice: price - discount,
        }

        try {
            const res = dispatch(handleAddCart(addPayLoad)).unwrap();
            if(res) {
                colorReset?.();
                quantityReset?.();
            }
        } catch (error) {
            console.log('error', error)
        }

    }

    const handleAddToWishList = () => {
        console.log("addToWishList")
    }
    

    const handleActiveImage = (src) => {
        setSelectedImage(src)
    }

    const galleryProps = {
        selectedImage,
        productDetailData,
        handleActiveImage,
    };
    
    const detailProps = {
        productDetailData,
        productDetailReview,
        colorRef,
        quantityRef,
        handleAddToCart,
        handleAddToWishList
    };

    const tabProps = {
        productDetailData,
        productDetailReview
    };
  return {
    galleryProps,
    detailProps,
    tabProps,
  }
}

export default useProductDetailPage