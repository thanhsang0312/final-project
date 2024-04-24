import React from "react";
import styled from "styled-components";
import useBlogPage from "./useBlogPage";
import moment from "moment";

const BlogCateWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const TextOverflow = styled.h4`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FilterBlog = ({
  categories,
  popularBlogs,
  tags,
  handleCateFilterChange,
}) => {
  const { blogs: blogCates } = categories || {};
  const _onFilterChange = (id, isSelected) => {
    handleCateFilterChange(id, isSelected);
  };

  return (
    <aside className="col-lg-3">
      <div className="sidebar">
        <div className="widget widget-search">
          <h3 className="widget-title">Search</h3>
          <form action="#">
            <label htmlFor="ws" className="sr-only">
              Search in blog
            </label>
            <input
              type="search"
              className="form-control"
              name="ws"
              id="ws"
              placeholder="Search in blog"
              required
            />
            <button type="submit" className="btn">
              <i className="icon-search" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="widget widget-cats">
          <BlogCateWrapper>
            <h3 className="widget-title">Categories</h3>
            <a
              href="#"
              className="sidebar-filter-clear"
              onClick={() => handleCateFilterChange("")}
            >
              Clean All
            </a>
          </BlogCateWrapper>
          <ul>
            {blogCates?.length > 0 &&
              blogCates.map((blog, index) => {
                const { id, name } = blog || {};
                return (
                  <li key={id || index}>
                    <a href="#" onClick={() => _onFilterChange(id)}>
                      {name}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="widget">
          <h3 className="widget-title">Popular Posts</h3>
          <ul className="posts-list">
            {popularBlogs?.length > 0 &&
              popularBlogs.map((blog, index) => {
                const { updateAt, name, image } = blog || {};
                return (
                  <li key={index}>
                    <figure>
                      <a href="#">
                        <img src={image} alt={name} />
                      </a>
                    </figure>
                    <div>
                      <span>{moment(updateAt).format("MMM Do YY")}</span>
                      <TextOverflow>
                        <a href="#">{name}</a>
                      </TextOverflow>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="widget widget-banner-sidebar">
          <div className="banner-sidebar-title">ad box 280 x 280</div>
          <div className="banner-sidebar banner-overlay">
            <a href="#">
              <img src="assets/images/blog/sidebar/banner.jpg" alt="banner" />
            </a>
          </div>
        </div>
        <div className="widget">
          <h3 className="widget-title">Browse Tags</h3>
          <div className="tagcloud">
            {tags?.length > 0 &&
              tags.map((tag, index) => {
                const { name, id } = tag || {};
                return (
                  <a href="#" key={id}>
                    {name}
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterBlog;
