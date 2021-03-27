const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ctgcy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("emaJohnShop").collection("products");

  app.post('/addProduct', (req, res) => {
    const products = req.body;
    productCollection.insertMany(products)
    .then(result => {
        console.log(result.insertedCount);
        res.send(result.insertedCount)
    })
  })

  app.get('/products', (req, res) => {
      productCollection.find({})
      .toArray((err, documents) => {
          res.send(documents);
      })
  })

  app.get('/product/:key', (req, res) => {
    productCollection.find({key: req.params.key})
    .toArray((err, documents) => {
        res.send(documents[0]);
    })
})

app.post('/productByKeys', (req, res) => {
    
})


});



app.listen(port, () => {
  console.log(port)
})