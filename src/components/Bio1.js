import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import profilePic from '../../content/assets/profile-pic.jpg'
import { rhythm } from '../utils/typography'

function Bio () {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2)
            }}
          >
            <img
              src={profilePic}
              alt={`Comus Leong`}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2),
                borderRadius: '50%'
              }}
            />
            <p>
              <a href='https://withcloud.co'>WithCloud</a> Team 的開發日常 blog.
              <br />
              我們在澳門生活和開發有用的東西.
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default Bio
