const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users');

// Function to handle pagination

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;

        const results = {};

        try {
            const totalItems = await model.countDocuments().exec();

            results.results = await model.find().limit(limit).skip(startIndex).exec();

            const totalPages = Math.ceil(totalItems / limit);

            results.pagination = {
                currentPage: page,
                totalPages: totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            };

            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

// Connect to the database

mongoose.connect('mongodb://localhost/pagination-api-nodejs')
    .then(() => {
        console.log('Connected to MongoDB');

        const dummyUsers = [
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Charlie' },
            { name: 'David' },
            { name: 'Eva' },
            { name: 'Frank' },
            { name: 'Grace' },
            { name: 'Henry' },
            { name: 'Ivy' },
            { name: 'Jack' },
            { name: 'Katie' },
            { name: 'Leo' },
            { name: 'Mia' },
            { name: 'Nathan' },
            { name: 'Olivia' },
            { name: 'Peter' },
            { name: 'Quinn' },
            { name: 'Rachel' },
            { name: 'Sam' },
            { name: 'Tina' }
        ];

        User.insertMany(dummyUsers)
            .then(() => {
                console.log('Dummy data inserted successfully');
            })
            .catch((error) => {
                console.error('Error inserting dummy data:', error);
            });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


// for users API

app.get('/users', paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});