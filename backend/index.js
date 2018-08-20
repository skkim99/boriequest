const express = require('express');
const compression = require('compression')

const app = express();

app.use(compression())
app.use(express.static('./build'))

app.get('/test', (req, res) => {
    res.send('test')
})

const port = 4000;
app.listen(port, '0.0.0.0', () => {
    console.log(`listening on http://0.0.0.0:${port}`)
});