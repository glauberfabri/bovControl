const request = require('supertest');
const app = require('../app');
const { connectDB, closeDB } = require('../config/database');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('Volume Routes', () => {
  let farmerId;

  beforeEach(async () => {
    // Adiciona um fazendeiro de teste
    const res = await request(app)
      .post('/api/farmers')
      .send({
        name: 'Test Farmer',
        farmName: 'Test Farm',
        distance: 15
      });
    farmerId = res.body.insertedId;

    // Registra a produção de leite
    await request(app)
      .post(`/api/farmers/${farmerId}/milk-production`)
      .send({
        liters: 100,
        date: '2023-09-01'
      });
  });

  it('should return the total volume and average for the given farm and month', async () => {
    const res = await request(app)
      .get(`/api/volume?farmerId=${farmerId}&month=9&year=2023`)
      .expect(200);

    expect(res.body).toHaveProperty('totalLiters');
    expect(res.body).toHaveProperty('averageLiters');
    expect(typeof res.body.totalLiters).toBe('number');
    expect(typeof res.body.averageLiters).toBe('number');
  });

  it('should return 404 if no milk production is found', async () => {
    const invalidFarmerId = 'nonExistentFarmerId';
    const res = await request(app)
      .get(`/api/volume?farmerId=${invalidFarmerId}&month=9&year=2023`)
      .expect(404);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('No milk production found for this farm and month.');
  });
});
