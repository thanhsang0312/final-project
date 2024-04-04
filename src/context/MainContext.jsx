import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollTop } from "../utils/scrollTop";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    handleCloseMenuMobile();
    const myTimeOut = setTimeout(() => {
      scrollTop();
    }, 100);
    return () => {
      clearTimeout(myTimeOut);
    };
  }, [pathname]);

  const handleShowMenuMobile = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").addClass("mmenu-active");
  };

  const handleCloseMenuMobile = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").removeClass("mmenu-active");
  };

  return (
    <MainContext.Provider
      value={{ isShowMenuMobile, handleShowMenuMobile, handleCloseMenuMobile }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const useMainContext = () => useContext(MainContext);
