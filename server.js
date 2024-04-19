const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/users')

mongoose.connect('mongodb://localhost/pagination-api-nodejs')
const db = mongoose.connection

db.once('open', async() => {
    if (await User.countDocuments(). exec() > 0) return

    Promise.all([
        User.create({ name: 'User 1', }),
        User.create({ name: 'User 2', }),
        User.create({ name: 'User 3', }),
        User.create({ name: 'User 4', }),
        User.create({ name: 'User 5', }),
        User.create({ name: 'User 6', }),
        User.create({ name: 'User 7', }),
        User.create({ name: 'User 8', }),
        User.create({ name: 'User 9', }),
        User.create({ name: 'User 10', }),
        User.create({ name: 'User 11', }),
        User.create({ name: 'User 12', })
    ]).then(() => console.log('Added Users'))
})

// for users API

const users = [];

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    users.push(...data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});


app.get('/users', paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults)
})


// for posts API

const posts = [];

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    posts.push(...data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});

app.get('/posts', paginatedResults(posts), (req, res) => {
    res.json(res.paginatedResults)
})


function paginatedResults(model){
    return async(req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        // for the next page
        
        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        // for the previous page
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        }
        catch (error) {
            res.status(500).json({ message: e.message })
        }        
    }
}

app.listen(3000)