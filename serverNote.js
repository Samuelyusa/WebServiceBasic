const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method , url} = request;

    if(url === '/') {

        // TODO 2: logika respons bila url bernilai '/'

        if(method === 'GET'){
            response.end('<h1>Ini adalah homepage</h1>');
        } else{
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }

    } else if(url === '/about') {

        // TODO 3: logika respons bila url bernilai '/about'

        if(method === 'GET') {
            response.end('<h1>Halo! Ini adalah halaman about</h1>')
        } else if(method === 'POST') {
            // Ini berfungsi untuk menampung buffer pada stream. 
            let body = [];

            // ketika event data terjadi pada request, kita isi array body dengan chunk (potongan data) yang dibawa callback function pada event tersebut.
            request.on('data', (chunk) => {
                body.push(chunk);
            });

            // ketika proses stream berakhir, maka event end akan terbangkitkan.
            request.on('end', () => {
                // Di sinilah kita mengubah variabel body yang sebelumnya menampung buffer menjadi data sebenarnya dalam bentuk string melalui perintah Buffer.concat(body).toString().
                body = Buffer.concat(body).toString();

                //Gunakanlah JSON.parse() untuk mengubah JSON string menjadi JavaScript objek.
                const { name } = JSON.parse(body);

                // proses respons di dalam callback event end. Hal ini diperlukan karena data body siap dikonsumsi hanya ketika event end telah dibangkitkan.
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        
        } else {
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    } else {
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        response.end('<h1>Halaman tidak ditemukan!</h1>');
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});