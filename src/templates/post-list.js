import React from "react"
import { graphql } from "gatsby"

import PostList from "../components/post-list"

const PostListTemplate = ({ data, pageContext: { prefix } }) => <PostList data={data} prefix={prefix} />

export default PostListTemplate

export const query = graphql`
  query PostListTemplate($filter: DatoCmsPostFilterInput, $skip: Int, $limit: Int) {
    allDatoCmsPost(
      filter: $filter
      skip: $skip
      limit: $limit
      sort: { fields: [position], order: ASC }
    ) {
      pageInfo {
        currentPage
        pageCount
      }
      edges {
        node {
          id
          title
          slug
          bodyNode {
            childMarkdownRemark {
              html
              excerpt
            }
          }
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
