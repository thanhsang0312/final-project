import axiosInstance from "../utils/axiosInstance"

export const wishServices = {
    addWishList(payload) {
        return axiosInstance.post(`/customer/white-list`, payload);
    },
    removeWishList(payload) {
        return axiosInstance.delete(`customer/white-list`, payload);
    }
}