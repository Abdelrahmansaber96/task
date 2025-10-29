import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/todoApp';

let cachedConnection = null;

const connectDB = async () => {
  // Return cached connection for serverless
  if (cachedConnection) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to MongoDB');
    cachedConnection = mongoose;
    return mongoose;
  }

  try {
    console.log('Attempting to connect to MongoDB at', mongoURI);
    await mongoose.connect(mongoURI, {
      retryWrites: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully');
    cachedConnection = mongoose;
    return mongoose;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    throw err;
  }
};

mongoose.connection.on('error', (err) => {
  console.error('Mongoose runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected from MongoDB');
  cachedConnection = null;
});

export default connectDB;