// implement your API here
const express = require("express");

const db = require('./data/db.js')

const server = express();

server.use(express.json()); // <<<<< needed to parse JSON from the body of requests

server.get("/", (req, res) => {
    res.send({api: 'up and running . . . right?'})
})
// post - /api/users - creates a user using the information sent in the req
server.post('/users', (req, res) => {
    const userData = req.body;
    db.insert(userData)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            console.log('error on GET /users', error);
            res.status(500).json({errorMessage: 'error adding the user'})
    })
})
// get - /api/users - returns an array of all the user objects conatined in the db
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(error => {
            console.log('error on GET /users', error);
            res.status(500).json({errorMessage: 'error getting list of users from database'})
    })
})
// get - /api/users/:id - returns the user object with the specified id
// delete - /api/users/:id - removes the user wit the specified id and returns deleted user
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(count => {
            if (count === 0){
                res.status(404).json({ message: 'user not found' })
            } else {
                res.status(200).json({ message: 'user deleted successfully' })
            }
        })
        .catch(error => {
            console.log('error on GET /users', error);
            res.status(500).json({errorMessage: 'error getting list of users from database'})
    })
})
// put - /api/users/:id - updates the user with specified id using data from the req. returns modified user, not original
const port = 4000;
server.listen(port, () => 
    console.log(`\n ** API running on port ${port} ** \n`))