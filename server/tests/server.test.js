const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// this will clear the todos database b/c below we expect one todo item
beforeEach((done) => {
  Todo.remove({}).then(()=>{
    done();
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {

    var text = 'Buy xmas gifts';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect( (res) => {
        expect(res.body.text).toBe(text);
      })
      .end( (err, res) => {
        if (err) {
          return done(err);
        };
        Todo.find().then( (todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch( (e) => done(e));
      });
  });

  it('should not create a new todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end( (err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then( (todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch( (e) => done(e));
      })

  });

});
