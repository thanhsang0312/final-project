const BLOG_PATH = "/blog";
const PRODUCT_PATH = "/product";
const PROFILE_PATH = "/profile";

const PATHS = {
    HOME: "/",
    ABOUT: "/about",
    BLOG: {
        INDEX: BLOG_PATH,
        DETAIL: BLOG_PATH + "/:blogSlug",
    },
    VIEW_CART: "/view-cart",
    CHECKOUT_SUCCESS: "/checkout-success",
    CHECKOUT: "/checkout",
    CONTACT: "/contact",
    PROFILE: {
        INDEX: PROFILE_PATH,
        PROFILE_ORDER: PROFILE_PATH + "/order",
        PROFILE_WISHLIST: PROFILE_PATH + "/wishlist",
        PROFILE_ADDRESS: PROFILE_PATH + "/address",
        PROFILE_CHANGE_PASS: PROFILE_PATH + "/change-password"
    },
    FAQ: "/faq",
    PAYMENT: "/payment-method",
    PRIVACY: "/privacy",
    PRODUCT: {
        INDEX: PRODUCT_PATH,
        DETAIL: PRODUCT_PATH + "/:productSlug",
    },
    RETURNS: "/returns",
    SHIPPING: "/shipping",
    
}

export default PATHS;