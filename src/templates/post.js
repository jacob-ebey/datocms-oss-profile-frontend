import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { HelmetDatoCms } from "gatsby-source-datocms"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data: { datoCmsPost: post } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={post.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{post.title}</h1>
        <p className="sheet__lead">{post.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} arrows dots>
            {post.gallery.map(({ fluid }) => (
              <img alt={post.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: post.bodyNode.childMarkdownRemark.html,
          }}
        />
        {post.coverImage && (
          <div className="sheet__gallery">
            <Img fluid={post.coverImage.fluid} />
          </div>
        )}
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query PostQuery($slug: String!) {
    datoCmsPost(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      bodyNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
