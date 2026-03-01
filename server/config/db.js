const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/vezo-cms";
    
    await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✓ MongoDB connected successfully");
    console.log(`  Database: ${mongoose.connection.name}`);
    return mongoose;
  } catch (error) {
    console.error("✗ MongoDB connection error:", error.message);
    console.log("\n⚠️  Server starting WITHOUT database connection");
    console.log("   CMS features will be unavailable until MongoDB is connected");
    console.log("   Please check your MONGODB_URI in .env\n");
    // Don't crash - allow server to start without DB
    return null;
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✓ MongoDB reconnected');
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('✗ MongoDB error:', err.message);
});

module.exports = connectDB;
