// Run this ONCE to add categories to existing listings
// Command: node updateCategories.js

const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

// Your MongoDB connection URL - UPDATE THIS if different
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
        updateCategories();
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

async function updateCategories() {
    try {
        const listings = await Listing.find({});
        
        const categories = ['Trending', 'Rooms', 'Iconic cities', 'Mountains', 'Castles', 'Amazing pools', 'Camping', 'Farms', 'Arctic'];
        
        // Assign random categories to existing listings
        for (let listing of listings) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            listing.category = randomCategory;
            await listing.save();
            console.log(`Updated "${listing.title}" with category: ${randomCategory}`);
        }
        
        console.log("\n✅ All listings updated with categories!");
        mongoose.connection.close();
    } catch (err) {
        console.log("❌ Error:", err);
        mongoose.connection.close();
    }
}