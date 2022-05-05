//Command Line libraries
import ora from 'ora';
const spinner = ora({spinner: 'dots'});

//Libraries
import express from 'express';
import mongoose from "mongoose";
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

//Register Helper Modules
import {loadSurahTable} from './client/js/hbs-register-helper/templates-register-helpers.js';
import {add, subtract, eq, areSameJuz} from './client/js/hbs-register-helper/logical-register-helpers.js';

//File manager
import {loadModels} from "./server/file-manager/file-manager.js";

//Router
import apiRouter from './server/api-router.js';
import viewRouter from './server/view-router.js';

const port = process.env.PORT || 8080;
const app = express();

const hbs = handlebars.create({
    extname:'hbs',
    defaultLayout:'index',
    layoutsDir:'client/layout/',
    helpers: {
        loadSurahTable,
        add, subtract, eq,
        areSameJuz
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'client');
app.enable('view cache');

app.use(cookieParser())
app.use(express.static('client'));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRouter);
app.use('/', viewRouter);

const uri = 'mongodb://127.0.0.1:27017/Basair';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, options, async () => {
    await spinner.start(`Migrating Db`)
    await loadModels()
    await spinner.succeed(`Database connection established`);
    app.listen(port, () => {
        spinner.succeed(`Server started @http://localhost:${port}`);
    });
});