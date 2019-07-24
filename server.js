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
app.get('/api/owners', (res, req, next) => {
    res.json(owners)
})

// GET /api/owners/:id
app.get('/api/owners/:id', (res, req, next) => {
    let owner = owners.find(owner => owner.id === parseInt(req.params.id))
    if (owner) {
        res.json(owner)
    } else {
        res.status(404).json({ error: "Owner not found" })
    }
})

// POST /api/owners
app.post('/api/owners', (res, req, next) => {
    let nextId = Math.max(owners.map(owner => owner.id)) + 1
    if (req.body.name) {
        let owner = {
            id: nextId,
            name: req.body.name,
            pets: req.body.pets == nul ? "None" : req.body.pets
        }
        owners.push(owner)
        res.json(owner)
    } else {
        res.statusCode(400).json({ error: 'Sorry you need to add a name &' })
    }
})

// PUT /api/owners/:id
app.put('/api/owners/:id', (res, req, next){
    let owner = owners.find(owner => owner.id === parseInt(req.params.id))
    if (owner) {
        owner = req.body.params;
        res.json({
            owner: owner,
            status: 'Updated'
        })
    } else {
        res.statusCode(400).json({ error: "Owner not found" })
    }
})

// DELETE /api/owners/:id

// GET /api/owners/:id/pets

// GET /api/owners/:id/pets/:petId

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function () {
    console.log('Pets API is now listening on port 3000...');
})