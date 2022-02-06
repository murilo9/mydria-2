const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

const somePosts = [
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
    _id: '1',
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
  {
    created: new Date(),
    updated: new Date(),
    _id: '2',
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
      text: 'This is a share post',
    },
    tags: ['SharingThat', 'CozThatIsNice'],
    sharedFrom: {
      created: new Date(),
      updated: new Date(),
      _id: '1',
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
      tags: []
    }
  },
]

const someComments = [
  {
    _id: 'aaaaaaa1',
    created: new Date(),
    updated: new Date(),
    post: '',
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      city: 'Curitiba',
      country: 'Brazil',
      birthDate: new Date(),
      gender: 'MASCULINE',
      bio: '',
      pictureUrl: null
    },
    body: 'Lorem ipsum dolor sit amet consecteur ipsum ralem malif'
  },
  {
    _id: 'aaaaaaa2',
    created: new Date(),
    updated: new Date(),
    post: '',
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      city: 'Curitiba',
      country: 'Brazil',
      birthDate: new Date(),
      gender: 'MASCULINE',
      bio: '',
      pictureUrl: null
    },
    body: 'Lorem ipsum dolor sit amet consecteur ipsum ralem malif'
  },
  {
    _id: 'aaaaaaa3',
    created: new Date(),
    updated: new Date(),
    post: '',
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      city: 'Curitiba',
      country: 'Brazil',
      birthDate: new Date(),
      gender: 'MASCULINE',
      bio: '',
      pictureUrl: null
    },
    body: 'Lorem ipsum dolor sit amet consecteur ipsum ralem malif'
  },
]

const johnDoe = {
  firstName: 'John',
  lastName: 'Doe',
  city: 'New York',
  country: 'USA',
  birthDate: new Date('06-05-1962'),
  gender: 'MASCULINE',
  pictureUrl: 'https://m0.her.ie/wp-content/uploads/2018/01/07093633/GettyImages-887815620.jpg',
  bio: 'Vestibulum porttitor in enim quis accumsan. Etiam bibendum augue pretium magna tincidunt.'
}

app.get('/feed', (req, res) => {
  res.send(somePosts)
})

app.get('/profile/:userId/posts', (req, res) => {
  res.send(somePosts)
})

app.get('/profile/:userId', (req, res) => {
  res.send(johnDoe)
})

app.get('/post/:postId/comments', (req, res) => {
  const totalComments = []
  for (let i = 0; i < 20; i++) {
    totalComments.push(someComments[0])
    totalComments[i]._id = i
  }
  res.send(totalComments)
})

// TODO routes

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`)
})

