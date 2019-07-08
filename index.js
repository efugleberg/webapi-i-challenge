// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved" })
    })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
    .then(users => {
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved" });
    });
});




const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`))