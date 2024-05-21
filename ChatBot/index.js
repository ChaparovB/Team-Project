const openai = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

const apiKey = process.env.API_TOKEN;
const baseApiUrl = 'https://api.openai.com/v1';

app.post('/message', async (req, res) => {
    try {
        const response = await axios.post(`${baseApiUrl}/chat/completions`, {
            model: 'gpt-4o',
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: req.body.message }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const message = { message: response.data.choices[0].message.content };
        res.json(message);
    } catch (error) {
        console.error('Error generating chat completion:', error.response.data);
        res.status(error.response.status).json(error.response.data);
    }
});

app.listen(3000, () => console.log('Listening on port 3000'));
