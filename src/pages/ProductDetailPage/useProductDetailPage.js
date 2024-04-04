import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { productService } from "../../services/productServices";
import { useEffect, useRef, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { message } from "antd";

const useProductDetailPage = () => {
    const { productSlug } = useParams();
    const colorRef = useRef();
    const quantityRef = useRef();

    

    const {data: productData, loading: productLoading, error: productError, execute} = useMutation(() => productService.getProductBySlug(productSlug))

    const productDetailData = productData || {};

    const { id } = productDetailData || {};
    
    const { data : productDetailReview} = useQuery(() => id && productService.getProductReview(id), [id])

    const [selectedImage, setSelectedImage] = useState("")

    useEffect(() => {
      execute(productSlug);
    }, [productSlug])

    const handleAddToCart = () => { 
        const { value: color, reset: colorReset } = colorRef.current || {};
        const { value: quantity, reset: quantityReset } = quantityRef.current || {};

        if(!color) {
            message.error("Please select color!")
            return;
        } else if (isNaN(quantity) && quantity < 1) {
            message.error("Quantity must be greater than 1!");
            return;
        }

        colorReset?.();
        quantityReset?.();
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