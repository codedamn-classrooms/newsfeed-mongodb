const express = require('express')
const app = express()
const port = process.env.PUBLIC_PORT
const { newsArticleModel: Model } = require('./connector')

const onePageArticleCount = 10

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(port, () => console.log(`App listening on port ${port}!`))

app.get('/newsFeed', async (req, res) => {
	const limit = parseInt(req.query.limit, 10) || onePageArticleCount
	const offset = parseInt(req.query.offset, 10) || 0

	const docs = await Model.find().skip(offset).limit(limit).lean()

	res.json(docs)
})

module.exports = app
