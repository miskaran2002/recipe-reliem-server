const express = require('express');
const cors = require('cors');
const app = express();
const port =process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Explore recipe and made your own recipe !')
});


app.listen(port, () => {
    console.log(`Recipe  Server is running on port ${port}`);
})