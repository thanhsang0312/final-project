import React from "react";

const RelatedPost = () => {
  return (
    <div className="related-posts">
      <h3 className="title">Related Posts</h3>
      <div
        className="owl-carousel owl-simple"
        data-toggle="owl"
        data-owl-options='{
                                      "nav": false, 
                                      "dots": true,
                                      "margin": 20,
                                      "loop": false,
                                      "responsive": {
                                          "0": {
                                              "items":1
                                          },
                                          "480": {
                                              "items":2
                                          },
                                          "768": {
                                              "items":3
                                          }
                                      }
                                  }'
      >
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="assets/images/blog/grid/3cols/post-1.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Cras ornare tristique elit.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="assets/images/blog/grid/3cols/post-2.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Vivamus ntulla necante.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="assets/images/blog/grid/3cols/post-3.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Utaliquam sollicitudin leo.</a>
            </h2>
          </div>
        </article>
        <article className="entry entry-grid">
          <figure className="entry-media">
            <a href="blog-single.html">
              <img
                src="assets/images/blog/grid/3cols/post-4.jpg"
                alt="image desc"
              />
            </a>
          </figure>
          <div className="entry-body">
            <div className="entry-meta">
              <span>Nov 22, 2018</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                {" "}
                by <a href="#">John Doe</a>
              </span>
            </div>
            <h2 className="entry-title">
              <a href="blog-single.html">Fusce pellentesque suscipit.</a>
            </h2>
          </div>
        </article>
      </div>
    </div>
  );
};

export default RelatedPost;
