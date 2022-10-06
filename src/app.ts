import express from 'express';
import bodyParser from 'body-parser';
import { home, api } from './routes';

const app = express();

const APP_PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/', home);
app.use('/api', api);

// Global variable to host our urls
declare global {
  var URL_DICT: Record<string, string>;
}
global.URL_DICT = {};

app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}!`));
