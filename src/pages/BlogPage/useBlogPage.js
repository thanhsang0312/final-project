import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import useMutation from '../../hooks/useMutation';
import { blogServices } from '../../services/blogServices';
import useQuery from '../../hooks/useQuery';

const BLOG_LIMIT = 6;

const useBlogPage = () => {

    const { search } = useLocation();
    const queryObject = queryString.parse(search);
    const [_, setSearchParams] = useSearchParams();
    
    const {
        data: blogsData,
        loading: blogsLoading,
        error: blogsError,
        execute: fetchBlogs
    } = useMutation(
        (query) => blogServices.getBlog(query || `?limit=${BLOG_LIMIT}`)
        );

    const {data: blogsPopularData} = useQuery((query) => blogServices.getBlog((query) || "?limit=4"))

    const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(blogServices.getBlogCategories);

    const { data: tagsData } = useQuery(blogServices.getBlogTags)

    const blogs = blogsData?.blogs || [];
    const blogsPagination = blogsData?.pagination || [];
    const categories = categoriesData?.data || [];
    const popularBlogs = blogsPopularData?.data?.blogs || [];
    const tags = tagsData?.data?.blogs || [];

    useEffect(() => {
      fetchBlogs(search)
    }, [search])

    const updateQueryString = (queryObject) => {
        const newQueryString = queryString.stringify({
            ...queryObject,
            limit: BLOG_LIMIT,
        });
        setSearchParams(new URLSearchParams(newQueryString));
    }

    const _onPaginationChange = (page) => {
        updateQueryString({...queryObject, page: page});
    }

    const handleCateFilterChange = (cateId, isSelected) => {
        let newCategoryQuery = cateId;

        if(!cateId) {
            newCategoryQuery = [];
        }

        updateQueryString({
            ...queryObject,
            category: newCategoryQuery,
            page: 1,
        });
    };

    const blogListProps = {
        blogs,
        isLoading: blogsLoading,
        isError: !!blogsError,
    }

    const paginationProps = {
        page: Number(blogsPagination?.page || queryObject.page || 1),
        limit: Number(blogsPagination?.limit || 0),
        total: Number(blogsPagination?.total || 0),
        _onPaginationChange,
    }

    const blogFilterProps = {
        categories: categories || [],
        isLoading: categoriesLoading,
        isError: categoriesError,
        activeCategory: queryObject.category,
        popularBlogs,
        tags,
        handleCateFilterChange,
    }

  return {
    blogListProps,
    paginationProps,
    blogFilterProps
  }
}

export default useBlogPage