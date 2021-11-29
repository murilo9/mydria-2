import MydriaApp from './App';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const mydriaApp = new MydriaApp();
mydriaApp.listen(PORT);
