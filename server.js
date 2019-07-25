var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners', (req, res, next) => {
    res.json(owners)
})

// GET /api/owners/:id
app.get('/api/owners/:id', (req, res, next) => {
    const owner = findOwner(owners, req.params.id)
    if (owner) {
        res.json(owner)
    } else {
        res.status(404).json({ error: "Owner not found" })
    }
})

// POST /api/owners
app.post('/api/owners', (req, res, next) => {
    const nextId = owners.reduce((prev, curr) => {
        return prev > curr.id ? prev : curr.id
    }, 0) + 1
    if (req.body.name) {
        let owner = {
            id: nextId,
            name: req.body.name,
            pets: []
        }
        owners.push(owner)
        res.json(owner)
    } else {
        res.status(400).json({ error: 'Sorry you need to add a name.' })
    }
})

// PUT /api/owners/:id
app.put('/api/owners/:id', (req, res, next) => {
    const owner = findOwner(owners, req.params.id)
    if (owner) {
        owner.name = req.body.name
        res.json({
            owner: owner,
            status: 'Updated'
        })
    } else {
        res.status(400).json({ error: "Owner not found" })
    }
})

// DELETE /api/owners/:id
app.delete('/api/owners/:id', (req, res, next) => {
    const owner = findOwner(owners, req.params.id)
    if (owner) {
        owners = owners.filter(owner => owner.id != parseInt(req.params.id))
        res.json({ owners })
    } else {
        res.status(404).json({ error: 'Owner not found' })
    }
})

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', (req, res, next) => {
    const owner = findOwner(owners, req.params.id);
    if (owner) {
        res.json(owner.pets)
    } else {
        res.status(404).json({ error: "Owner not found" })
    }
})

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', (req, res, next) => {
    const owner = findOwner(owners, req.params.id)
    if (owner) {
        let petId = owner.pets.find(pet => pet.id == parseInt(req.params.petId))
        res.json(petId)
    } else {
        res.status(404).json({ error: "Owner not found" })
    }
})

// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.type) {
        res.status(400).json({ error: "Sorry you are missing some parameters" })
    }
    const owner = findOwner(owners, req.params.id)
    if (owner) {
        if (owner.pets) {
            let nextId = owner.pets.reduce((prev, curr) => {
                return prev > curr.id ? prev : curr.id
            }, 0) + 1
            owner.pets.push({
                id: nextId,
                name: req.body.name,
                type: req.body.type
            })
        } else {
            owner.pets = []
            let nextId = owner.pets.reduce((prev, curr) => {
                return prev > curr.id ? prev : curr.id
            }, 0) + 1
            owner.pets.push({
                id: nextId,
                name: req.body.name,
                type: req.body.type
            })

        }
        res.json(owner.pets)
    } else {
        res.status(404).json({ error: "Owner not found" })
    }
})

// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', (req, res, next) => {
    const owner = findOwner(owners, req.params.id)
    if (!req.body.name || !req.body) {
        res.status(400).json({ error: 'Error you are missing arguments' })
    }
    if (owner) {
        let pet = findOwner(owner.pets, req.params.petId)
        if (pet) {
            pet.name = req.body.name
        }
        res.json(owner)
    } else {
        res.status(404).json({ error: "Owner not found" })
    }
})

// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', (req, res, next) => {
    const owner = findOwner(owners, req.params.id);
    if (owner.pets.length) {
        owner.pets = owner.pets.filter(pet => pet.id != parseInt(req.params.petId))
        res.json(owner)
    } else {
        res.status(403).json({ error: "No pet to delete" })
    }
})


app.listen(3000, function () {
    console.log('Pets API is now listening on port 3000...');
})



function findOwner(owners, id) {
    return owners.find(owner => {
        return owner.id === parseInt(id)
    })
}