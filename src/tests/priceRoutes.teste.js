const request = require('supertest');
const app = require('../app'); // O app precisa ser exportado no seu app.js
const { connectDB, closeDB } = require('../config/database');

beforeAll(async () => {
  await connectDB(); // Conectar ao banco de dados antes de rodar os testes
});

afterAll(async () => {
  await closeDB(); // Fechar a conexão com o banco de dados após os testes
});

describe('Price Routes', () => {
  it('should return the price per liter and total payment for a specific month', async () => {
    const farmerId = 'someValidFarmerId'; // Substitua por um ID válido
    const res = await request(app)
      .get(`/api/price?farmerId=${farmerId}&month=9&year=2023`)
      .expect(200);

    // Verificar a estrutura da resposta
    expect(res.body).toHaveProperty('pricePerLiter');
    expect(res.body).toHaveProperty('totalPayment');
    expect(res.body).toHaveProperty('pricePerLiterUSD');
    expect(res.body).toHaveProperty('totalPaymentUSD');
    expect(typeof res.body.pricePerLiter).toBe('string');
    expect(typeof res.body.totalPayment).toBe('string');
    expect(typeof res.body.pricePerLiterUSD).toBe('string');
    expect(typeof res.body.totalPaymentUSD).toBe('string');
  });

  it('should return 404 if no price is found for the given month and farm', async () => {
    const farmerId = 'nonExistentFarmerId'; // ID que não existe
    const res = await request(app)
      .get(`/api/price?farmerId=${farmerId}&month=9&year=2023`)
      .expect(404);

    // Verificar a mensagem de erro
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('No milk production found for this farm and month.');
  });
});
