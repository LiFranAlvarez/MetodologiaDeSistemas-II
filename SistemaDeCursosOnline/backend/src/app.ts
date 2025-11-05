import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Database from './config/db.connect.js';


class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json({limit: '150mb'}));

        // Logger HTTP
        this.app.use(morgan('dev'));
        //cors
        this.app.use( cors());
    }
    routes(){
        // this.app.use("/users",userRoute);
        // this.app.use( "/categories",categoryRoute);
        // this.app.use("/products",productRouote)
        // this.app.use("/restart",restartRoute);

    }
    async start(callback: () => void) {
        await Database.getInstance();
        this.app.listen(this.port, callback);
    }
}
export default Server;