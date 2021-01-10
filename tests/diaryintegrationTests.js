require('should');
const request = require('supertest');
const mongoose = require('mongoose');
process.env.ENV = 'Test';
const app = require('../app.js');
const Diary = mongoose.model('Diary');
const agent = request.agent(app);

describe('Diary Crud Test', () => {
  it('should allow diary entry to be posted and return read and _id', (done) => {
    const diaryPost = { title: 'title 01', userID: 'name.sur@protonmail.com', content: 'Content 01', location:'Warsaw' };
    agent.post('api/diary')
      .send(diaryPost)
      .expect(200)
      .end((err, results) => {

     //   console.log(results);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
