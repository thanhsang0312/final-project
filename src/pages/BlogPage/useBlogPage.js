import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import useMutation from '../../hooks/useMutation';
import { blogServices } from '../../services/blogServices';

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

    const blogs = blogsData?.blogs || [];
    const blogsPagination = blogsData?.pagination || [];

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
    

    const blogListProps = {
        blogs,
        
    }

    const paginationProps = {
        page: Number(blogsPagination?.page || queryObject.page || 1),
        limit: Number(blogsPagination?.limit || 0),
        total: Number(blogsPagination?.total || 0),
        _onPaginationChange,
    }

  return {
    blogListProps,
    paginationProps
  }
}

export default useBlogPage