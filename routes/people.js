const express = require('express');
const router = express.Router();
const { addPeople, addPerson, removePerson, updatePerson, getPeople, getPerson } = require('../queries')

router.get('/', (req, res) => {
    try {
        getPeople(res);

    } catch (err) {
        console.log(err.message)
    }
});

router.get('/:id', (req, res) => {
    try {
        getPerson(req.params.id, res);

    } catch (err) {
        console.log(err.message)
    }
});

router.post('/', (req, res) => {
    try {
        addPeople(req.body.number, res)
        r
    } catch (err) {
        console.log(err.message)
    }

});

router.post('/new', (req, res) => {
    try {
        const person = {
            first: req.body.first,
            last: req.body.last,
            email: req.body.email
        };

        addPerson(person, res);
    } catch (err) {
        console.log(err.message)
    };

});

router.delete('/:id', (req, res) => {
    try {
        removePerson(req.params.id, res);

    } catch (err) {
        console.log(err.message)
    }
});

router.put('/:id', (req, res) => {
    const person = {
        id: req.params.id,
        first: req.body.first,
        last: req.body.last,
        email: req.body.email
    }

    updatePerson(person, res)


});

module.exports = router;