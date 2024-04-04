import React, { useEffect } from "react";
import IntroSlider from "../../components/IntroSlider";
import IntroItemList from "../../components/IntroItemList";
import owlCarousels from "../../utils/owlCarousels";

const SectionIntro = ({ introProducts }) => {
  useEffect(() => {
    owlCarousels();
  }, []);

  return (
    <div className="intro-section pt-3 pb-3 mb-2">
      <div className="container">
        <div className="row">
          <IntroSlider />
          <IntroItemList introProducts={introProducts} />
        </div>
      </div>
    </div>
  );
};

export default SectionIntro;
