import express from 'express';
import http from 'http';
import { APP_PORT, SESSION_SECRET } from './config';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
import './config/db';
import './middlewares/localStrategy';
import session from 'express-session';
import passport  from 'passport';
import cors from 'cors';
import sitemap from 'express-sitemap';

const app = express();
const s = sitemap();
const server = http.createServer(app);

// s.generate(app)
app.use(cors({origin:["http://localhost:3000"],credentials:true}))
app.use(session({
    name: "user",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.use(errorHandler)
server.listen(APP_PORT, () => {
    console.log(`Your server is listen on port ${APP_PORT}`)
})