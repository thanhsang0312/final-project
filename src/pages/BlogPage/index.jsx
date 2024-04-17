import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import PATHS from "../../const/path";
import BlogList from "./BlogList";
import FilterBlog from "./FilterBlog";
import useBlogPage from "./useBlogPage";

const BlogPage = () => {
  const { blogListProps, blogFilterProps } = useBlogPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: 'url("assets/images/page-header-bg.jpg")',
        }}
      >
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
      </Breadcrumb>
      {/* End breadcrumb */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <BlogList {...blogListProps} />
            <FilterBlog {...blogFilterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
