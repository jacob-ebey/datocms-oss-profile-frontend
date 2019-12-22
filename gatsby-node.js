const path = require(`path`)
const config = require("./src/config")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return Promise.all([
    graphql(`
      {
        allDatoCmsPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsPost.edges.map(({ node: work }) => {
        createPage({
          path: `post/${work.slug}`,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            slug: work.slug,
          },
        })
      })
    }),

    graphql(`
      {
        allDatoCmsPost(limit: ${config.lists.perPage}) {
          pageInfo {
            pageCount
            perPage
          }
        }
      }
    `).then(result => {
      for (let i = 0; i < result.data.allDatoCmsPost.pageInfo.pageCount; i++) {
        if (i === 0) {
          createPage({
            path: "/",
            component: path.resolve(`./src/templates/post-list.js`),
            context: {
              skip: i * result.data.allDatoCmsPost.pageInfo.perPage,
              limit: config.lists.perPage,
            },
          })
        }

        createPage({
          path: `${i + 1}`,
          component: path.resolve(`./src/templates/post-list.js`),
          context: {
            skip: i * result.data.allDatoCmsPost.pageInfo.perPage,
            limit: config.lists.perPage,
          },
        })
      }
    }),

    graphql(`
      {
        allDatoCmsPost(limit: ${config.lists.perPage}, filter: { isPortfolioItem: { eq: true } }) {
          pageInfo {
            pageCount
            perPage
          }
        }
      }
    `).then(result => {
      for (let i = 0; i < result.data.allDatoCmsPost.pageInfo.pageCount; i++) {
        if (i === 0) {
          createPage({
            path: "projects",
            component: path.resolve(`./src/templates/post-list.js`),
            context: {
              skip: i * result.data.allDatoCmsPost.pageInfo.perPage,
              limit: config.lists.perPage,
              filter: { isPortfolioItem: { eq: true } },
              prefix: "/projects",
            },
          })
        }

        createPage({
          path: `projects/${i + 1}`,
          component: path.resolve(`./src/templates/post-list.js`),
          context: {
            skip: i * result.data.allDatoCmsPost.pageInfo.perPage,
            limit: config.lists.perPage,
            filter: { isPortfolioItem: { eq: true } },
            prefix: "/projects",
          },
        })
      }
    }),

    graphql(`
      {
        allDatoCmsPost(limit: ${config.lists.perPage}, filter: { isPortfolioItem: { eq: false } }) {
          pageInfo {
            pageCount
            perPage
          }
        }
      }
    `).then(result => {
      for (let i = 0; i < result.data.allDatoCmsPost.pageInfo.pageCount; i++) {
        if (i === 0) {
          createPage({
            path: "posts",
            component: path.resolve(`./src/templates/post-list.js`),
            context: {
              skip: i * result.data.allDatoCmsPost.pageInfo.perPage,
              limit: config.lists.perPage,
              filter: { isPortfolioItem: { eq: false } },
              prefix: "/posts",
            },
          })
        }

        createPage({
          path: `posts/${i + 1}`,
          component: path.resolve(`./src/templates/post-list.js`),
          context: {
            skip: i * result.data.allDatoCmsPost.pageInfo.perPage,
            limit: config.lists.perPage,
            filter: { isPortfolioItem: { eq: false } },
            prefix: "/posts",
          },
        })
      }
    }),
  ])
}
