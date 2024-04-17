import axiosInstance from "../utils/axiosInstance";

export const blogServices = {
    getBlog(query = "") {
        return axiosInstance.get(`/blogs${query}`)
    },
    getBlogBySlug(slug ="") {
        return axiosInstance.get(`blogs/${slug}`)
    },
    getBlogCategories(query = "") {
        return axiosInstance.get(`/blog-categories${query}`)
    },
    getBlogCategoryBySlug(slug = "") {
        return axiosInstance.get(`/blog-categories/${slug}`);
    },
    getBlogTags(query = "") {
        return axiosInstance.get(`blog-tags${query}`);
    },
};