const express = require('express')
const app = express()

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


app.get('/users', paginatedResults(users), (req, res) => {
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
    return (req, res, next) => {
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

        results.results = model.slice(startIndex, endIndex)
        res.paginatedResults = results
        next()
    }
}

app.listen(3000)