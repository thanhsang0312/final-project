import axiosInstance from "../utils/axiosInstance";

export const blogServices = {
    getBlog(query = "") {
        return axiosInstance.get(`/blogs${query}`)
    },
};