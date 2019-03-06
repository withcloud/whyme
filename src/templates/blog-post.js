import React from 'react'
import { Link, graphql } from 'gatsby'
import moment from 'moment-timezone'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const authors = post.frontmatter.authors || []

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <main>
          <article>
            <header>
              <h1 style={{ color: 'var(--textTitle)' }}>
                {post.frontmatter.title}
              </h1>
              <div style={{
                marginBottom: rhythm(1),
                marginTop: rhythm(-4 / 5)
              }}>
                <p
                  style={{
                    ...scale(-1 / 5),
                    display: 'block',
                    margin: 0
                  }}
                >
                  {moment(post.frontmatter.date).tz('Asia/Macau').format('MMMM DD, YYYY')}
                </p>
                {!!authors.length && (
                  <div style={{
                    ...scale(-1 / 5),
                    marginTop: rhythm(2 / 5)
                  }}>
                    {authors.map(author => {
                      return (
                        <p
                          key={author.name}
                          style={{
                            margin: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            paddingRight: '2rem',
                            marginBottom: '0.5rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <img
                            src={author.avatar}
                            alt={author.name}
                            style={{
                              width: '2rem',
                              height: '2rem',
                              marginRight: '0.5rem',
                              borderRadius: '50%',
                              background: '#efefef',
                              marginBottom: 0
                            }}
                          />
                          <span>{author.name}</span>
                        </p>
                      )
                    })}
                  </div>
                )}
              </div>
            </header>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </main>
        <aside>
          <hr
            style={{
              marginBottom: rhythm(1)
            }}
          />
          <Bio />
          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel='prev'>
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel='next'>
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </aside>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        description
        authors {
          name
          avatar
        }
      }
    }
  }
`
