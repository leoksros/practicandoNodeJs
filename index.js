let djs = [
    {
        id: 1,
        name: 'John',
        surname: 'Digweed',
        genre: 'Techno'
    },
    {
        id: 2,
        name: 'Nick',
        surname: 'Warren',
        genre: 'Progressive House'
    }
];

const express = require('express');
const app = express();
const logger = require('./loggerMiddleware');
app.use(cors); //permite que cualquier origen funcione en nuestra api
app.use(express.json()); //parsea jsons
app.use(logger);

app.get('/', (request,response) => {
    response.send('<h1>node.js</h1>');
});

app.get('/api/djs', (request,response) => {
    response.json(djs);
});

app.get('/api/djs/:id', (request,response) => {
    const id = Number(request.params.id);
    const dj = djs.find(dj => dj.id == id);
    if(dj){
        response.json(dj);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/djs/:id', (request,response) => {
    const id = Number(request.params.id);
    djs = djs.filter(dj => dj.id !== id);
    response.json(djs);
});

app.post('/api/djs', (request,response) => {
    const dj = request.body;
    
    if(!dj || !dj.name) {
        return response.status(400).json({
            error: 'dj.name is missing!'
        })
    }
    if(!dj || !dj.surname) {
        return response.status(400).json({
            error: 'dj.surname is missing!'
        })
    }

    const idDjs = djs.map(dj => dj.id);
    const maxId = Math.max(... idDjs);
    const newDj = {
        id: maxId + 1,
        name: dj.name,
        surname: dj.surname,
        genre: dj.genre !== 'undefined' ? dj.genre : 'no-value'
    }

    djs = [... djs, newDj]; // djs.concat(newDj);

    response.json(newDj);
})

app.use((request, response) => {
    console.log(request.path); //logea desde que url viene
    response.status(404).json({
        error: 'URL not founded'
    });
});

const PORT = process.env.PORT || 3001; //heroku  process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); //el servidor escucha el PORT





