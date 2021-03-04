const path = require('path');

//gets your app's root path
const root = path.dirname(require.main.filename);
console.log(`${__dirname.split('config')[0]}files/`);
