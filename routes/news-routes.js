    const express = require('express')
    const router = express.Router();
    const newsmodel = require('../models/News')
    const axios = require('axios');



router.get('/fetch-external-news', async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        
        const response = await axios.get(`https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${apiKey}`);
        
        const articles = response.data.articles;

        const formattedNews = articles.map(item => ({
            title: item.title,
            description: item.description || "No description available",
            imageUrl: item.urlToImage || "https://via.placeholder.com/150",
            category: "General"
        }));

        await newsmodel.insertMany(formattedNews, { ordered: false }).catch(err => err.insertedDocs);

        res.status(200).json({
            message: "News fetched and synced successfully!",
            count: articles.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch external news",
            error: error.message
        });
    }
});


router.get('/newslist', async (req, res) => {
    try {
        const newsList = await newsmodel.find();
        res.status(200).json(newsList);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

    module.exports = router;

