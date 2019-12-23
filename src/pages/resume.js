import React from "react"
import { graphql } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"

import Layout from "../components/layout"

import "./resume.sass"

function formatDate(date) {
  const d = new Date(date)
  const m = d.toLocaleString("default", { month: "short" })
  return `${m} ${d.getUTCFullYear()}`
}

const Resume = ({
  data: {
    overview,
    experience: { edges: experience },
  },
}) => {
  return (
    <Layout>
      <article className="sheet">
        <HelmetDatoCms seo={overview.seoMetaTags} />
        <h1 className="sheet__title">{overview.name}</h1>
        <h2 className="sheet__lead">{overview.title}</h2>
        <p>{overview.tagline}</p>

        <h3 className="sheet__section">Experience</h3>
        {experience.map(({ node: item }) => (
          <React.Fragment key={item.id}>
            <div className="resume__date-header">
              <h2 className="sheet__lead">
                {item.company}{" "}
                {item.departement && <small> - {item.departement}</small>}
              </h2>
              <p className="sheet__lead">
                <small>
                  {formatDate(item.startDate)} -{" "}
                  {item.endDate ? formatDate(item.endDate) : "Current"}
                </small>
              </p>
            </div>

            <div
              className="sheet__body"
              dangerouslySetInnerHTML={{
                __html: item.descriptionNode.childMarkdownRemark.html,
              }}
            />
          </React.Fragment>
        ))}
      </article>
    </Layout>
  )
}

export default Resume

export const query = graphql`
  query Resume {
    overview: datoCmsResumePage {
      name
      title
      tagline
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    experience: allDatoCmsExperience(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          company
          departement
          startDate
          endDate
          descriptionNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    skills: allDatoCmsSkill(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          name
          skillLevel
        }
      }
    }
  }
`
