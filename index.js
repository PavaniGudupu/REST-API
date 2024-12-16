const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const exp = require("constants");
const { it } = require("node:test");
const { REPLServer } = require("repl");
const cors = require("cors");


const port = 4000;
const app = express();
app.use(cors());
const masterKey = "SDYDQLJXGXSXAVCUHVWCDSL";
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());


const foodItems = [
    {
      id: 1,
      name: "Spaghetti Bolognese",
      image: "https://example.com/spaghetti.jpg",
      content: "A classic Italian pasta dish with rich tomato and meat sauce.",
      category: "Italian",
      score: 4.8
    },
    {
      id: 2,
      name: "Sushi Platter",
      image: "https://example.com/sushi.jpg",
      content: "A variety of fresh sushi, including nigiri, sashimi, and rolls.",
      category: "Japanese",
      score: 4.7
    },
    {
      id: 3,
      name: "Chicken Tikka Masala",
      image: "https://example.com/tikka.jpg",
      content: "A flavorful Indian curry dish with tender pieces of marinated chicken.",
      category: "Indian",
      score: 4.9
    },
    {
      id: 4,
      name: "Caesar Salad",
      image: "https://example.com/caesar.jpg",
      content: "A crisp salad with romaine lettuce, croutons, Parmesan, and Caesar dressing.",
      category: "Salad",
      score: 4.6
    },
    {
      id: 5,
      name: "Cheesecake",
      image: "https://example.com/cheesecake.jpg",
      content: "A creamy dessert with a buttery graham cracker crust.",
      category: "Dessert",
      score: 4.8
    },
    {
      id: 6,
      name: "Pad Thai",
      image: "https://example.com/padthai.jpg",
      content: "A popular Thai noodle dish with shrimp, peanuts, and a tangy sauce.",
      category: "Thai",
      score: 4.9
    },
    {
      id: 7,
      name: "Tacos",
      image: "https://example.com/tacos.jpg",
      content: "Mexican tortillas filled with meat, cheese, and fresh vegetables.",
      category: "Mexican",
      score: 4.5
    },
    {
      id: 8,
      name: "Margherita Pizza",
      image: "https://example.com/pizza.jpg",
      content: "A simple pizza topped with fresh tomatoes, mozzarella, and basil.",
      category: "Italian",
      score: 4.7
    },
    {
      id: 9,
      name: "French Onion Soup",
      image: "https://example.com/onionsoup.jpg",
      content: "A warm soup topped with melted cheese and a slice of bread.",
      category: "French",
      score: 4.6
    },
    {
      id: 10,
      name: "Chocolate Cake",
      image: "https://example.com/chocolatecake.jpg",
      content: "A rich and moist chocolate dessert topped with creamy frosting.",
      category: "Dessert",
      score: 4.9
    },
    {
      id: 11,
      name: "Pho",
      image: "https://example.com/pho.jpg",
      content: "A Vietnamese noodle soup with beef, herbs, and aromatic spices.",
      category: "Vietnamese",
      score: 4.8
    },
    {
      id: 12,
      name: "Falafel Wrap",
      image: "https://example.com/falafel.jpg",
      content: "A Middle Eastern wrap with crispy falafel, vegetables, and tahini sauce.",
      category: "Middle Eastern",
      score: 4.6
    },
    {
      id: 13,
      name: "Beef Burger",
      image: "https://example.com/burger.jpg",
      content: "A juicy beef patty served in a bun with lettuce, tomato, and cheese.",
      category: "American",
      score: 4.7
    },
    {
      id: 14,
      name: "Shrimp Scampi",
      image: "https://example.com/scampi.jpg",
      content: "A pasta dish with shrimp sautéed in garlic, butter, and white wine.",
      category: "Seafood",
      score: 4.8
    },
    {
      id: 15,
      name: "Pancakes",
      image: "https://example.com/pancakes.jpg",
      content: "Fluffy breakfast cakes served with syrup, butter, or fruit.",
      category: "Breakfast",
      score: 4.5
    },
    {
      id: 16,
      name: "Ceviche",
      image: "https://example.com/ceviche.jpg",
      content: "A seafood dish made with fresh fish, lime juice, and spices.",
      category: "Peruvian",
      score: 4.7
    },
    {
      id: 17,
      name: "Ramen",
      image: "https://example.com/ramen.jpg",
      content: "A Japanese noodle soup with savory broth, meat, and vegetables.",
      category: "Japanese",
      score: 4.8
    },
    {
      id: 18,
      name: "Greek Salad",
      image: "https://example.com/greeksalad.jpg",
      content: "A fresh salad with cucumbers, tomatoes, feta cheese, and olives.",
      category: "Greek",
      score: 4.6
    },
    {
      id: 19,
      name: "Ice Cream Sundae",
      image: "https://example.com/sundae.jpg",
      content: "A dessert made with scoops of ice cream, syrup, and toppings.",
      category: "Dessert",
      score: 4.9
    },
    {
      id: 20,
      name: "Steak",
      image: "https://example.com/steak.jpg",
      content: "A perfectly grilled beef steak seasoned with salt and pepper.",
      category: "American",
      score: 4.8
    }
  ];
  

app.get("/all", (req, res) => {
    res.send(foodItems);
});

app.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * foodItems.length) + 1;
    const item = foodItems[randomIndex];
    res.send(item);
});

app.get("/specific/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = foodItems.find((item) => item.id === id);
    if (index) {
        res.send(index)
    } else {
        res.send("Data Not Found..")
    }
});


app.get("/filter", (req, res) => {
    const category = req.query.category;
    const foodItem = foodItems.filter((item) => item.category === category);
    if (foodItem) {
        res.send(foodItem);
    } else {
        res.send("Data Not Found..")
    }
});


app.post("/post", (req, res) => {
    const newFoodItem = {
        id: foodItems.length + 1,
        name: req.body.name,
        image: req.body.image,
        content: req.body.content,
        category: req.body.category,
        score: req.body.score
    }
    foodItems.push(newFoodItem);
    res.send(newFoodItem);
});

app.put("/put/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = foodItems.findIndex((item) => item.id === id);

    if (index !== -1) {
        const replacement = {
            id: foodItems[index].id, // Keep the original ID
            name: req.body.name,
            image: req.body.image,
            content: req.body.content,
            category: req.body.category,
            score: req.body.score
        };
        foodItems[index] = replacement; // Replace the item
        res.send(replacement); // Send the updated item back
    } else {
        res.status(404).send("Data Not Found..");
    }
});


app.patch("/patch/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingItem = foodItems.find((item) => item.id === id);  // Use singular name for one item

    // Check if item exists
    if (!existingItem) {
        return res.status(404).send("Item not found.");
    }

    // Create a replacement object with updated values or original values if not provided
    const updatedItem = {
        id: existingItem.id, // Keep original id
        name: req.body.name || existingItem.name,
        image: req.body.image || existingItem.image,
        content: req.body.content || existingItem.content,
        category: req.body.category || existingItem.category,
        score: req.body.score || existingItem.score
    };

    // Find the index of the item and replace it with the updated one
    const index = foodItems.findIndex((item) => item.id === id);
    if (index !== -1) {
        foodItems[index] = updatedItem; // Replace the item in the array
    }

    res.send(updatedItem);  // Send the updated item back
});



app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = foodItems.findIndex((item) => item.id === id);
    if (searchIndex > -1) {
        foodItems.splice(searchIndex, 1); 
        res.send("Successfully deleted.");
    } else {
        res.status(404).send(`${id} Not Found, Data not deleted.`);
    }
});

app.delete("/deleteAll", (req, res) => {
    const key = req.query.key;
    if (key === "SDYDQLJXGXSXAVCUHVWCDSL") {
        foodItems.splice(0, foodItems.length); // Clear all elements from the array
        res.send("Successfully deleted.");
    } else {
        res.status(404).send(`${key} Not Found, You are not authorized to delete...`);
    }
});


app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
  });
  