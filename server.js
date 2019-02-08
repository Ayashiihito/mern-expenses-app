const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
    const wat = "This is a response from my server O.o";
    res.json(wat);
})


app.listen(process.env.PORT||PORT, () => console.log(`Started server at ${PORT}`));