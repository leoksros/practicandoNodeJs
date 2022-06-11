let djs = [
    {
        name: 'John',
        surname: 'Digweed',
        genre: 'Techno'
    },
    {
        name: 'Nick',
        surname: 'Warren',
        genre: 'Progressive House'
    }
];


const http = require('http'); //importando modulo http para hacer requests

const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(JSON.stringify(djs));
});

const PORT = 3001;
app.listen(PORT); //el servidor escucha el PORT
console.log(`Server running on port ${PORT}`);





