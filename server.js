const express = require('express')
const app = express()

const users = [
    {
        id: 1,
        name: "vicky",
        age: 20
    },
    {
        id: 2,
        name: "User 2",
        age: 22
    },
    {
        id: 3,
        name: "User 3",
        age: 21
    },
    {
        id: 4,
        name: "User 4",
        age: 17
    },
    {
        id: 5,
        name: "User 5",
        age: 19
    }
]

app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(3000)