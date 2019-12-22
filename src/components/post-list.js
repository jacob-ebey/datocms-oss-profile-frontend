import React from "react"
import { Link } from "gatsby"
import Masonry from "react-masonry-component"
import Img from "gatsby-image"

import Layout from "./layout"

export default ({
  data: {
    allDatoCmsPost: {
      edges: posts,
      pageInfo: { currentPage, pageCount },
    },
  },
  prefix
}) => {
  const showNav = React.useMemo(
    () => currentPage > 1 || currentPage < pageCount,
    [currentPage, pageCount]
  )

  return (
    <Layout>
      <div className="options-bar">
        <div className="dropdown">
          <input type="checkbox" id="checkbox-toggle" />
          <label htmlFor="checkbox-toggle">Filter By</label>
          <ul>
            <li>
              <Link className="button" to="/">All</Link>
            </li>
            <li>
              <Link className="button" to="/posts">Posts</Link>
            </li>
            <li>
              <Link className="button" to="/projects">Projects</Link>
            </li>
          </ul>
        </div>
      </div>

      <Masonry className="showcase">
        {posts.map(({ node: post }) => (
          <div key={post.id} className="showcase__item">
            <figure className="card">
              {post.coverImage && (
                <Link to={`/post/${post.slug}`} className="card__image">
                  <Img fluid={post.coverImage.fluid} />
                </Link>
              )}
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/post/${post.slug}`}>{post.title}</Link>
                </h6>
                {post.bodyNode &&
                  post.bodyNode.childMarkdownRemark &&
                  post.bodyNode.childMarkdownRemark.excerpt && (
                    <div className="card__description">
                      <p>{post.bodyNode.childMarkdownRemark.excerpt}</p>
                    </div>
                  )}
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>

      {showNav && (
        <div className="centered-buttons">
          {currentPage > 1 && (
            <Link className="button" to={`${prefix || ""}/${currentPage - 1}`}>
              Previous Page
            </Link>
          )}

          {currentPage < pageCount && (
            <Link className="button" to={`${prefix || ""}/${currentPage + 1}`}>
              Next Page
            </Link>
          )}
        </div>
      )}
    </Layout>
  )
}
