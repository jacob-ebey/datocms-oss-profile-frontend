import React from "react"
import { graphql, Link } from "gatsby"
import Masonry from "react-masonry-component"

import ClickableImage from "../components/clickable-image"
import Layout from "../components/layout"

import "./images.sass"

const ImagesPage = ({
  data: {
    allDatoCmsAsset: {
      edges: images,
      pageInfo: { currentPage, pageCount },
    },
  },
}) => {
  const showNav = React.useMemo(
    () => currentPage > 1 || currentPage < pageCount,
    [currentPage, pageCount]
  )

  return (
    <Layout>
      <Masonry className="showcase" disableImagesLoaded={true}>
        {images.map(({ node: image }) => (
          <div key={image.id} className="showcase__item">
            <figure className="card">
              <div className="card__image card__image--no-hover">
                <ClickableImage fluid={image.fluid} />
              </div>
            </figure>
          </div>
        ))}
      </Masonry>

      {showNav && (
        <div className="centered-buttons">
          {currentPage > 1 && (
            <Link className="button" to={`/images/${currentPage - 1}`}>
              Previous Page
            </Link>
          )}

          {currentPage < pageCount && (
            <Link className="button" to={`/images/${currentPage + 1}`}>
              Next Page
            </Link>
          )}
        </div>
      )}
    </Layout>
  )
}

export default ImagesPage

export const query = graphql`
  query ImagesQuery($skip: Int) {
    allDatoCmsAsset(filter: { isImage: { eq: true } }, limit: 30, skip: $skip) {
      pageInfo {
        currentPage
        pageCount
        perPage
      }
      edges {
        node {
          id
          fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  }
`
