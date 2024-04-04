import React from "react";
import SectionIntro from "./SectionIntro";
import SectionFeatured from "./SectionFeatured";
import SectionDealnOutlet from "./SectionDealnOutlet";
import SectionBrand from "./SectionBrand";
import SectionProductList from "./SectionProductList";
import SectionService from "./SectionService";
import SectionSubscribe from "./SectionSubscribe";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    productsListProps,
    servicesProps,
    getDealProps,
  } = useHomePage();
  return (
    <main className="main">
      <SectionIntro {...introProps} />
      <SectionFeatured {...hotProductProps} />
      <div className="mb-7 mb-lg-11" />
      <SectionDealnOutlet {...dealProps} />
      <SectionBrand {...brandProps} />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <SectionProductList {...productsListProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <SectionService {...servicesProps} />
      <SectionSubscribe {...getDealProps} />
    </main>
  );
};

export default HomePage;
