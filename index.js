const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbgsyar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const recipesCollection = client.db('recipeDB').collection('recipes');
        const usersCollection = client.db('recipeDB').collection('users');

        //  Get recipes filtered by ownerEmail (if provided)
        app.get('/recipes', async (req, res) => {
            const email = req.query.email;
            let query = {};

            if (email) {
                query = { ownerEmail: email };
            }

            try {
                const result = await recipesCollection.find(query).toArray();
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Failed to fetch recipes' });
            }
        });

        //  Get a single recipe by ID
        app.get('/recipes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await recipesCollection.findOne(query);
            res.send(result);
        });

        //  Add a new recipe
        app.post('/recipes', async (req, res) => {
            const recipe = req.body;

            if (!recipe.ownerEmail) {
                return res.status(400).send({ message: "ownerEmail is required" });
            }

            const result = await recipesCollection.insertOne(recipe);
            res.send(result);
        });

        //  Update a recipe
        app.put("/recipes/:id", async (req, res) => {
            const id = req.params.id;
            const updatedRecipe = req.body;

            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    image: updatedRecipe.image,
                    title: updatedRecipe.title,
                    ingredients: updatedRecipe.ingredients,
                    instructions: updatedRecipe.instructions,
                    cuisine: updatedRecipe.cuisine,
                    prepTime: updatedRecipe.prepTime,
                    categories: updatedRecipe.categories,
                },
            };

            const result = await recipesCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        //  Delete a recipe
        app.delete('/recipes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await recipesCollection.deleteOne(query);
            res.send(result);
        });

        //  Patch likes (optional feature)
        app.patch('/recipes/:id/like', async (req, res) => {
            const { id } = req.params;

            try {
                const result = await recipesCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $inc: { likes: 1 } }
                );

                if (result.modifiedCount > 0) {
                    res.send({ success: true, message: 'Like added' });
                } else {
                    res.status(404).send({ success: false, message: 'Recipe not found' });
                }
            } catch (error) {
                console.error('Error updating likes:', error);
                res.status(500).send({ success: false, message: 'Server error' });
            }
        });

        //  Add a user
        app.post('/users', async (req, res) => {
            const userProfile = req.body;
            const result = await usersCollection.insertOne(userProfile);
            res.send(result);
        });

        // Confirm DB connection
        await client.db("admin").command({ ping: 1 });
        console.log(" Connected to MongoDB");
    } finally {
        // Optional: Close the connection on exit
        // await client.close();
    }
}
run().catch(console.dir);

// Base route
app.get('/', (req, res) => {
    res.send('Explore recipes and make your own!');
});

// Start server
app.listen(port, () => {
    console.log(` Server running at http://localhost:${port}`);
});
