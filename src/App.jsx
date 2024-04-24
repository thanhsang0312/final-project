import { message } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PATHS from "./const/path";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import HomePage from "./pages/HomePage";
import NotfoundPage from "./pages/NotfoundPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileAddressPage from "./pages/ProfilePage/ProfileAddressPage";
import ProfileChangePassword from "./pages/ProfilePage/ProfileChangePassword";
import ProfileDetailPage from "./pages/ProfilePage/ProfileDetailPage";
import ProfileOrderPage from "./pages/ProfilePage/ProfileOrderPage";
import ProfileWishlistPage from "./pages/ProfilePage/ProfileWishlistPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import ViewCartPage from "./pages/ViewCartPage";
import { handleGetProfile } from "./store/reducer/authReducer";
import { handleGetCart } from "./store/reducer/cartReducer";
import tokenMethod from "./utils/token";
import { createWishList } from "./store/reducer/wishListReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    message.config({
      top: 80,
      duration: 3,
      maxCount: 3,
    });
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
      dispatch(handleGetCart());
      dispatch(createWishList());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogSinglePage />} />

            <Route path={PATHS.CONTACT} element={<ContactPage />} />

            <Route path={PATHS.FAQ} element={<FAQPage />} />
            <Route path={PATHS.PAYMENT} element={<PaymentMethodPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />
            <Route path={PATHS.PRODUCT.INDEX} element={<ProductPage />} />
            <Route
              path={PATHS.PRODUCT.DETAIL}
              element={<ProductDetailPage />}
            />
            <Route path={PATHS.RETURNS} element={<ReturnsPage />} />
            <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.VIEW_CART} element={<ViewCartPage />} />
              <Route
                path={PATHS.CHECKOUT_SUCCESS}
                element={<CheckoutSuccessPage />}
              />
              <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
              <Route path={PATHS.PROFILE.INDEX} element={<ProfilePage />}>
                <Route index element={<ProfileDetailPage />} />
                <Route
                  path={PATHS.PROFILE.PROFILE_ORDER}
                  element={<ProfileOrderPage />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_ADDRESS}
                  element={<ProfileAddressPage />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_WISHLIST}
                  element={<ProfileWishlistPage />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_CHANGE_PASS}
                  element={<ProfileChangePassword />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NotfoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
