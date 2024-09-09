const { connectDB, closeDB } = require('./config/database'); // Certifique-se de que o caminho está correto

const { ObjectId } = require('mongodb');

async function seedDatabase() {
  const db = await connectDB();
  
  const farmers = db.collection('farmers');
  const productions = db.collection('milkProductions');
  
  // Inserir dados de fazendeiros
  await farmers.insertMany([
    { _id: new ObjectId(), name: 'John Doe', farmName: 'Green Farm', distance: 25, password: 'password123' },
    { _id: new ObjectId(), name: 'Jane Doe', farmName: 'Blue Farm', distance: 45, password: 'password456' }
  ]);

  // Inserir dados de produção de leite
  await productions.insertMany([
    { farmerId: 'farmerId1', liters: 100, date: '2023-09-01', month: 9, year: 2023 },
    { farmerId: 'farmerId2', liters: 150, date: '2023-09-01', month: 9, year: 2023 }
  ]);

  console.log('Database seeded successfully!');
  await closeDB();
}

seedDatabase().catch(console.error);
