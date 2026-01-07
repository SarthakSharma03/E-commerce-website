import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const adminInitialize = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Default admin initialized: admin@example.com / admin123');
    } else {
      console.log('Admin already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

export default adminInitialize;
