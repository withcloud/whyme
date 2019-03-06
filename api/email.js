const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Parser = require('rss-parser')
const moment = require('moment-timezone')
const postmark = require('postmark')

moment.tz.setDefault('Asia/Macau')
const app = express()
const parser = new Parser()
const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN)

const sendEmail = async (req, res) => {
  const { emails = [] } = req.body

  const feed = await parser.parseURL('https://whyme.dev/rss.xml')

  const startTime = moment().subtract(1, 'day')
  const current = moment()
  const posts = feed.items.filter(item => {
    return moment(item.isoDate).isSameOrAfter(startTime) && moment(item.isoDate).isSameOrBefore(current)
  })

  const messages = []
  posts.forEach(post => {
    const content = post['content:encoded']
    const link = post.link
    const title = post.title
    const author = post.author || ''
    emails.forEach(email => {
      messages.push({
        From: 'WithCloud Why Me <whyme@withcloud.co>',
        To: email,
        TemplateAlias: 'post',
        TemplateModel: {
          link,
          content,
          title,
          author
        },
        InlineCss: true
      })
    })
  })

  if (messages.length) {
    await client.sendEmailBatchWithTemplates(messages)
  }

  res.end('OK')
}

app.use(cors())
app.use(bodyParser.json())
app.use(sendEmail)

module.exports = app
