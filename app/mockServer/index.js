const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

app.get('/feed', (req, res) => {
  const feedPosts = [
    {
      created: new Date(),
      updated: new Date(),
      _id: '0',
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        city: 'Denver',
        country: 'USA',
        birthDate: new Date('06-10-1992'),
        gender: 'MASCULINE',
      },
      body: {
        text: 'This is a post',
      },
      tags: [],
    },
    {
      created: new Date(),
      updated: new Date(),
      _id: '0',
      user: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@email.com',
        city: 'Machester',
        country: 'UK',
        birthDate: new Date('06-10-1984'),
        gender: 'FEMININE',
      },
      body: {
        text: 'This is a post with a picture',
        picture: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80',
      },
      tags: [],
    },
  ]
  res.send(feedPosts)
})

// TODO routes

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`)
})

