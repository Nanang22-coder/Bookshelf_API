import Hapi from '@hapi/hapi'
import r from "./routers.js"
import {nanoid} from "nanoid"

 console.log(r)
const runServer = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });
     server.route(r)
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

runServer()