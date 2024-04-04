import React from "react";
import MainContextProvider from "../../context/MainContext";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import BackToTop from "../../components/BackToTop";
import MenuMobile from "../../components/MenuMobile";
import AuthModal from "../../components/AuthModal";
import Footer from "../../components/Footer";
import AuthContextProvider from "../../context/AuthContext";

const MainLayout = ({ children }) => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <div className="page-wrapper">
          <Header />

          <Outlet />

          <Footer />
        </div>
        <BackToTop />
        <MenuMobile />
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
