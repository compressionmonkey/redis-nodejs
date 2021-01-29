const express = require("express");
const axios = require('axios');
const redis = require('redis');

const app = express();

const redisPort = 6379;
const client = redis.createClient(redisPort); 

client.on(
    "error", (err) => {
        console.log(err);
    }
)

app.get(
    "/jobs", async (req, res) => {
        const searchTerm = req.query.search;
        console.log('hu',searchTerm);
        try{
            const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
            res.status(200).send({
                jobs: jobs.data
            });
        }
        catch(err){
            res.status(500).send({
                message: err.message
            });
        }
    }
)

app.listen(
    process.env.PORT || 3000, () => {
        console.log("Server started");
    }
)