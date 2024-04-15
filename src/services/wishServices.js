import axiosInstance from "../utils/axiosInstance"

export const wishServices = {
    addWishList(id = "") {
        return axiosInstance.get(`/customer/white-list`);
    },
}