import React from "react"
import cx from "classnames"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import { HelmetDatoCms } from "gatsby-source-datocms"

import "../styles/index.sass"

const TemplateWrapper = ({ children }) => {
  const data = useStaticQuery(QUERY)

  const [menuOpen, setMenuOpen] = React.useState(false)
  const toggleMenu = React.useCallback(() => setMenuOpen(!menuOpen), [
    menuOpen,
    setMenuOpen,
  ])

  return (
    <div className={cx("container", menuOpen && "is-open")}>
      <HelmetDatoCms
        favicon={data.datoCmsSite.faviconMetaTags}
        seo={data.datoCmsHome.seoMetaTags}
      />
      <div className="container__sidebar">
        <div className="sidebar">
          {data.datoCmsHome.profileImage && (
            <Img fixed={data.datoCmsHome.profileImage.fixed} />
          )}

          <h6 className="sidebar__title">
            <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
          </h6>

          <div
            className="sidebar__intro"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
            }}
          />
          <ul className="sidebar__menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/resume">Resume</Link>
            </li>
          </ul>
          <p className="sidebar__social">
            {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target="blank"
                className={`social social--${profile.profileType.toLowerCase()}`}
              >
                {" "}
              </a>
            ))}
          </p>
          <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
        </div>
      </div>
      <div className="container__body">
        <div className="container__mobile-header">
          <div className="mobile-header">
            <div className="mobile-header__menu">
              <button onClick={toggleMenu} />
            </div>
            <div className="mobile-header__logo">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className="container__overlay" onClick={toggleMenu} />
    </div>
  )
}

const QUERY = graphql`
  query LayoutQuery {
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      profileImage {
        fixed(
          width: 200
          imgixParams: {
            fm: "png"
            auto: "compress"
            mask: "ellipse"
            w: "200"
            h: "200"
            fit: "clamp"
          }
        ) {
          ...GatsbyDatoCmsFixed
        }
      }
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      copyright
    }
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
  }
`

export default TemplateWrapper
