const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let db;
let client;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not defined in .env file');
    }

    // Inicializando o cliente do MongoDB com a URI fornecida no .env
    client = new MongoClient(process.env.MONGO_URI);

    // Conectando ao MongoDB
    await client.connect();

    // Selecionando o banco de dados padrão, se você quiser usar um nome específico, adicione-o aqui.
    db = client.db(process.env.DB_NAME || 'bovcontrol'); // Definindo o nome do banco de dados, por exemplo 'bovcontrol'

    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Encerrar o processo caso ocorra um erro
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Please connect to the database first.');
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close(); // Fechar o cliente do MongoDB
    console.log('MongoDB connection closed');
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB,
};
