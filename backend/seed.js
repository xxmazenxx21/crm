import User from './models/User.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log('✓ Cleared existing users');

    // Create demo users
    const users = await User.create([
      {
        name: 'Mazen Sales',
        email: 'sales@example.com',
        password: 'password123',
        role: 'sales',
      },
      {
        name: 'Ahmed Sales',
        email: 'ahmed@example.com',
        password: 'password123',
        role: 'sales',
      },
      {
        name: 'Manager',
        email: 'manager@example.com',
        password: 'password123',
        role: 'manager',
      },
    ]);

    console.log('✓ Created demo users:');
    users.forEach((user) => {
      console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    console.log('\n✓ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
