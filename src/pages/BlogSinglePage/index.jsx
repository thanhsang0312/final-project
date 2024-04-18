import React from "react";
import Detail from "./Detail";
import PagerNav from "./PagerNav";
import RelatedPost from "./RelatedPost";
import Comment from "./Comment";
import Reply from "./Reply";
import BlogDetailFilter from "./BlogDetailFilter";
import useBlogSinglePage from "./useBlogSinglePage";
import PATHS from "../../const/path";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";

const BlogSinglePage = () => {
  const { detailProps } = useBlogSinglePage();
  return (
    <main className="main">
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.BLOG.INDEX}>Blog</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>
          {detailProps.blogDetail?.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      {/* End breadcrumb */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <Detail {...detailProps} />
              <PagerNav />
              <RelatedPost />
              <Comment />
              <Reply />
            </div>
            <BlogDetailFilter />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogSinglePage;
