import { message } from "antd";
import { useState } from "react";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../../const/message";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageServices";
import { productService } from "../../services/productServices";
import { subscribeService } from "../../services/subscribeServices";

const useHomePage = () => {
  const { data: productsData } = useQuery(productService.getProducts); //get products API
  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  ); // get pages API
  const { data: categoriesData } = useQuery(productService.getCategories);
  const { execute: dealExecute } = useMutation(subscribeService.subscribeDeal);

  const products = productsData?.data?.products || [];
  const brands = homeData?.data?.data?.brands || [];
  const categories = categoriesData?.data?.products || [];
  const services = homeData?.data?.data?.information || {};

  const productsFeatured =
    products?.filter((product) => product.featured) || []; // filter products featured

  const onSaleProduct = products?.filter((product) => product.onSale) || []; // filter products on sale

  const topRatedProduct = products?.filter((product) => product.topRated) || []; // filter products top rated

  const introProducts = productsFeatured.slice(0, 3); // get 3 products featured to show

  const dealProducts = products?.filter((product) => product.discount > 0); // get products was discounted

  const [selectedCategory, setSelectedCategory] = useState("all");

  const featuredProducts =
    selectedCategory === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCategory
        );

  const handleSubscribeDeal = (email, callback) => {
    if (email) {
      dealExecute(email, {
        onSuccess: (data) => {
          message.success(HOME_MESSAGE.dealSuccess);
          callback?.();
        },
        onFail: (error) => {
          message.error(GENERAL_MESSAGE.error);
        },
      });
    }
  };

  const introProps = {
    introProducts,
  }; // Props for section intro

  const hotProductProps = {
    productsFeatured,
    onSaleProduct,
    topRatedProduct,
  }; // Prop for section featured

  const dealProps = {
    dealProducts,
  }; // Props for section dealnoutlet

  const brandProps = {
    brands,
  }; // Props for section brand

  const productsListProps = {
    categories: [{ name: "All", slug: "all" }, ...categories],
    featuredProducts,
    selectedCategory,
    handleSelectCate: (slug) => setSelectedCategory(slug),
  }; // Props for section products list

  const servicesProps = {
    services,
  };

  const getDealProps = {
    handleSubscribeDeal,
  };
  return {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    productsListProps,
    servicesProps,
    getDealProps,
  };
};

export default useHomePage;
