const fs = require('fs');
const  http = require('http');
const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')

// ---------------------------------------------------------------
// SERVER
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataobj = JSON.parse(data);

const server = http.createServer((req, res) =>{
    const {query, pathname} = url.parse(req.url, true);

    // OVERVIEW PAGE 
    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type' : 'text/html'})

        const cardsHtml = dataobj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%EMOJI_CARDS%}', cardsHtml);
        res.end(output);

    }else if (pathname === '/category'){
        res.writeHead(200, {'Content-type' : 'text/html'})

        const cardsHtml = dataobj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%EMOJI_CARDS%}', cardsHtml);
        res.end(output);

    // PRRODUCT PAGE 
    } else if (pathname === '/emoji') {
        res.writeHead(200, {'Content-type' : 'text/html'});
        const product = dataobj[query.id];
        const output = replaceTemplate(tempProduct,product)
        res.end(output);

    // API 
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
    
    // NOT FOUND
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello world'
        });
        res.end('<h1>page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');
});
