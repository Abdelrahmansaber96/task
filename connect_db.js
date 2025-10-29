import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/todoApp';

const connectDB = async () => {

  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to MongoDB');
    return mongoose;
  }

  try {
    console.log('Attempting to connect to MongoDB at', mongoURI);
    await mongoose.connect(mongoURI, {
      retryWrites: true,
    });
    console.log('MongoDB connected successfully');
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
});

export default connectDB;