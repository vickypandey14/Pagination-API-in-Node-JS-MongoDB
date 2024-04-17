const express = require('express')
const app = express()

const users = [];

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    users.push(...data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});

app.get('/users', (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    // for the next page
    
    if (endIndex < users.length) {
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

    results.results = users.slice(startIndex, endIndex)
    res.json(results)
})

app.listen(3000)