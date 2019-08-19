const app = require('./src/app');

// define port
const PORT = process.env.PORT || '3000';
app.set('port', PORT);

app.listen(() => {
    return console.log(`App is running on port ${PORT} 🚀`);
});
