import React from "react";
import PATHS from "../../const/path";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "../../components/Pagination";
import useBlogPage from "./useBlogPage";

const BlogList = ({ blogs }) => {
  const { paginationProps } = useBlogPage();
  return (
    <div className="col-lg-9">
      <div className="entry-container max-col-2" data-layout="fitRows">
        {blogs?.map((blog, index) => {
          const { author, updateAt, image, id, name, slug } = blog || {};
          const detailPath = PATHS.BLOG.INDEX + `/${slug}`;
          return (
            <div className="entry-item col-sm-6" key={id || index}>
              <article className="entry entry-grid">
                <figure className="entry-media">
                  <Link to={detailPath}>
                    <img src={image} alt={name} />
                  </Link>
                </figure>
                <div className="entry-body">
                  <div className="entry-meta">
                    <span>{moment(updateAt).format("MMM Do YY")}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author">
                      {" "}
                      by <a href="#">{author}</a>
                    </span>
                  </div>
                  <h2 className="entry-title">
                    <Link to={detailPath}>{name}</Link>
                  </h2>
                  <div className="entry-content">
                    <p>
                      Sed pretium, ligula sollicitudin laoreet viverra, tortor
                      libero sodales leo, eget blandit nunc tortor eu nibh.
                      Suspendisse potenti. Sed egestas vulputate ...
                    </p>
                    <Link to={detailPath} className="read-more">
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
      <Pagination {...paginationProps} />
    </div>
  );
};

export default BlogList;
