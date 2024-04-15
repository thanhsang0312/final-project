export const MODAL_TYPE = {
    register: "register",
    signin: "signin",
}

export const SORT_OPTION = {
    popularity: {
        value: "popularity",
        label: "Most popularity",
        queryObject: {
            orderBy: undefined,
            order: undefined,
        }
    },
    pricelow: {
        value: "pricelow",
        label: "Price Low to High",
        queryObject: {
            orderBy: "price",
            order: "1",
        }
    },
    pricehigh: {
        value: "pricehigh",
        label: "Price High to Low",
        queryObject: {
            orderBy: "price",
            order: "-1",
        }
    },
    newest: {
        value: "newest",
        label: "Newest",
        queryObject: {
            orderBy: "createAt",
            order: "-1"
        }
    },
    rating: {
        value: "rating",
        label: "Most rated",
        queryObject: {
            orderBy: "rating",
            order: "-1"
        }
    },
}

export const SHIPPING_OPTIONS = [
    {
        value: "free",
        label: "Free Shipping",
        price: 0,
    }, 
    {
        value: "standard",
        label: "Standard",
        price: 10,
    },
    {
        value: "express",
        label: "Express",
        price: 20,
    }
];

export const PAYMENT_METHOD = {
    cash: "cash",
    card: "card",
};