import * as express from "express"

async function main() {
    let app = express();
    app.use('/', express.static(__dirname + '/app'));
    app.get('/*', (req, res) => {
        res.sendFile(__dirname + '/app/index.html');
    });

    return new Promise<express.Application>((resolve, reject) => {
        var server = app.listen(process.env.PORT || 8080, (error: any) => {
            if (error) {
                reject(error);
            } else {
                let host = server.address().address;
                let port = server.address().port;
                console.log('Server listening on [%s]:%s', host, port);
                resolve(this);
            }
        });
    });
}

main().catch((err) => { console.error(err) });

