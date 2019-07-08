// implement your API here
const express = require('express');

const Users = require('./data/db.js');  // <<<< This gets our data from the js file

const server = express();
server.use(express.json());   // <<<<< to parse JSON in POST


//  The R in CRUD >>> READ

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

// >>>>> The C in CRUD >>>> Create or POST

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ error: "Please provide name and bio for the user." })
        return
    } 
    Users.insert(userInfo)
    .then(user =>  {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "there was an error while saving user to the database" })
    })
})

// >>> The D in CRUD >>>> DELETE or remove

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Users.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed." })
    })
})


const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`))