import queryString from 'query-string';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SORT_OPTION } from '../../const/general';
import useMutation from '../../hooks/useMutation';
import useQuery from '../../hooks/useQuery';
import { productService } from '../../services/productServices';

const PRODUCT_LIMIT = 9;

const useProductPage = () => {

    const { search } = useLocation();
    const queryObject = queryString.parse(search);
    const [_, setSearchParams] = useSearchParams()

    const { data: productsData, loading: productsLoading, error: productsError, execute: fetchProducts} = useMutation((query) => productService.getProducts(query || `?limit=${PRODUCT_LIMIT}`));

    const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(productService.getCategories);

    const products = productsData?.products || [];
    const productsPagination = productsData?.pagination || [];
    const categories = categoriesData?.data?.products || [];

    useEffect(() => {
      fetchProducts(search)
    }, [search])
    
    const updateQueryString = (queryObject) => {
        const newQueryString = queryString.stringify({
            ...queryObject,
            limit: PRODUCT_LIMIT,
        });
        setSearchParams(new URLSearchParams(newQueryString));
    }

    const _onPaginationChange = (page) => {
        updateQueryString({...queryObject, page: page});
    }

    // Handle toolbox
    const activeSort = useMemo(() => { 
        return (
            Object.values(SORT_OPTION)
            .find((option) => option.queryObject.orderBy === queryObject.orderBy 
                            && option.queryObject.order === queryObject.order
            )?.value || SORT_OPTION.popularity.value
        );
     }, [queryObject]);

    const onSortChange = (sortType) => { 
        const sortQueryObject = SORT_OPTION[sortType].queryObject;
        if(sortQueryObject) {
            updateQueryString({
                ...queryObject,
                ...sortQueryObject,
                page: 1,
            });
        }
     };

    //  Handle filter products
    const handleCateFilterChange = (cateId, isChecked) => {
        let newCategoryQuery = Array.isArray(queryObject.category) ? [...queryObject.category, cateId] : [queryObject.category, cateId];
        if (!isChecked) {
            newCategoryQuery = newCategoryQuery.filter(
                (category) => category !== cateId
            );
        }

        if(!cateId) {
            newCategoryQuery = [];
        }

        updateQueryString({
            ...queryObject,
            category: newCategoryQuery,
            page: 1,
        });
    };

    const priceFilterTimeout = useRef();
    const handlePriceFilterChange = (priceRange) => { 
        if(priceRange?.length === 2) {
            if(priceFilterTimeout.current) {
                clearTimeout(priceFilterTimeout.current)
            }
            priceFilterTimeout.current = setTimeout(() => {
                updateQueryString({
                    ...queryObject,
                    minPrice: priceRange[0].substring(1),
                    maxPrice: priceRange[1].substring(1),
                    page: 1
                })
            }, 500);
        }
     };

    const productToolboxProps = {
        // log: console.log("this is props for toolbox")
        showNumb: products?.length || 0,
        totalNumb: productsPagination.total || 0,
        activeSort,
        onSortChange,
    }

    const productListProps = {
        // log: console.log("this is props for products list")
        products,
        isLoading: productsLoading,
        isError: !!productsError
    }

    const productFilterProps = {
        // log: console.log("this is props for products filter")
        categories: categories || [],
        isLoading: categoriesLoading,
        isError: categoriesError,
        activeCategory: Array.isArray(queryObject.category) ? 
        queryObject.category : [queryObject.category],
        currentPriceRange: [
            queryObject.minPrice || 0,
            queryObject.maxPrice || 1000
        ],
        handleCateFilterChange,
        handlePriceFilterChange,
    }

    const paginationProps = {
        // log: console.log("this is props for pagination")
        page: Number(productsPagination?.page || queryObject.page || 1),
        limit: Number(productsPagination?.limit || 0),
        total: Number(productsPagination?.total || 0),
        _onPaginationChange,
    }

  return {
    productToolboxProps,
    productListProps,
    productFilterProps,
    paginationProps
  }
}

export default useProductPage