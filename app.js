const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const API_URL = "http://localhost:4000";
const port = 3000;
const masterKey = "SDYDQLJXGXSXAVCUHVWCDSL";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", async(req, res) => {
    try {
        const response = await axios.get(API_URL + "/all");
        const request = response.data;
        console.log(request);
        res.send(request);
    } catch(error) {
        res.send(error.message);
        console.log(error.message);
    }
});  

app.get("/random", async(req, res) => {
    try {
        const response = await axios.get(API_URL + "/random");
        const request = response.data;
        console.log(request);
        res.send(request);
    } catch(error) {
        res.send(error.message);
        console.log(error.message);  
    }
});

app.get("/getById/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(API_URL + `/specific/${id}`);
        const request = response.data;
        console.log(request);
        res.send(request);
    } catch(error) {
        res.send(error.message);
        console.log(error.message);  
    }
});

app.get("/getByFilter", async(req, res) => {
    try {
        const response = await axios.get(`${API_URL}/filter?category=${req.query.category}`);
        const request = response.data;
        console.log(request);
        res.send(request);
    } catch(error) {
        res.send(error.message);
        console.log(error.message);  
    }
});

app.post("/postData", async (req, res) => {
    try {
        const postData = req.body; 
        const response = await axios.post(`${API_URL}/post`, postData); // Pass the data to the backend
        const request = response.data;
        console.log(request);
        res.send(request); 
    } catch (error) {
        res.status(500).send(error.message); 
        console.error(error.message);
    }
});

app.put("/update/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const response = await axios.put(API_URL + `/put/${id}`, updatedData); // Pass the data to the backend
        const request = response.data;
        console.log(request);
        res.send(request); 
    } catch (error) {
        res.status(500).send(error.message); 
        console.error(error.message);
    } 
});

app.patch("/partialUpdate/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const patchData = req.body;  // Get the patch data from the request body
        
        // Make the PATCH request to the backend API
        const response = await axios.patch(`${API_URL}/patch/${id}`, patchData); 

        // Check if the response status is OK
        if (response.status === 200) {
            const updatedItem = response.data; // Get the updated item from the backend response
            console.log(updatedItem);
            res.send(updatedItem); // Send the updated item to the client
        } else {
            res.status(response.status).send(response.data); // Handle non-200 responses
        }
    } catch (error) {
        console.error(error.message); 
        res.status(500).send(error.message); // Send error response with appropriate status
    }
});


app.delete("/deleteById/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        const request = response.data;
        console.log(request);
        res.send(request);
    } catch(error) {
        res.send(error.message);
        console.log(error.message);
    }
});


app.delete("/empty", async(req, res) => {
    try {
        const key = req.query.key;
        const response = await axios.delete(`${API_URL}/deleteAll?key=${key}`);
        const request = response.data;
        console.log(request);
        res.send(request);
    } catch(error) {
        res.send(error.message);
        console.log(error.message);        
    }
})


app.listen(port, (req, res) => {
    console.log(`Server running on port: http://localhost:${port}`)
})