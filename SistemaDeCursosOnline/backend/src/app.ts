import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Database from './config/db.connect.js';
import userRouter from './routes/usuario.route.js';
import cursoRouter from './routes/curso.route.js';
import inscripcionRouter from './routes/inscripciones.route.js';
import authRouter from './routes/auth.route.js';
import createAdmin from './utils/createAdmin.js';
import errorHandler from './middlewares/errorHandler.js';


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
        // Log simple request info for debugging
        this.app.use((req, _res, next) => {
            console.log('REQ:', req.method, req.originalUrl);
            next();
        });
        //cors
        this.app.use( cors());
    }
    routes(){
        this.app.use('/api', userRouter);
        this.app.use('/api', cursoRouter);
        this.app.use('/api', inscripcionRouter);
        this.app.use('/api', authRouter);

        // Central error handler (al final de todas las rutas)
        this.app.use(errorHandler);

        // this.app.use("/users",userRoute);
        // this.app.use( "/categories",categoryRoute);
        // this.app.use("/products",productRouote)
        // this.app.use("/restart",restartRoute);

    }
    async start(callback: () => void) {
        await Database.getInstance();
        ///createAdmin();
        this.app.listen(this.port, callback);
    }
}
export default Server;