import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/todoApp';

async function test() {
  try {
    console.log('Testing MongoDB connection to:', mongoURI);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected successfully');
    
    // List databases
    const admin = mongoose.connection.getClient().db('admin');
    const result = await admin.admin().listDatabases();
    console.log('✓ Databases:', result.databases.map(db => db.name));
    
    await mongoose.disconnect();
    console.log('✓ Disconnected');
  } catch (err) {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

test();
