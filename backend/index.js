const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')


connectToMongo();

const app = express()

app.use(cors())
const port = 5000

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello Apoorv!')
// })

// app.get('/v1/login', (req, res) => {
//     res.send('Hello Login!')
//   })

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
