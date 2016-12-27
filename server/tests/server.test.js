const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: "first test todo",
}, {
  _id: new ObjectID(),
  text: "second test todo",
  completed: true,
  completedAt: 123
}];

// WARNING: this will clear the todos database b/c below we expect one todo item
beforeEach((done) => {
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then( () => done());
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
          return done(err); // this will pass the error to mocha
        };
        Todo.find({text}).then( (todos) => {
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
          expect(todos.length).toBe(2);
          done();
        }).catch( (e) => done(e));
      })

  });
});

describe('GET /todos', () => {

  it('should get all todos', (done) =>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect( (res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {

  it('should return todo doc with valid ID', (done) => {

    var id = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(200)
      .expect( (res)=> {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it('should return 404 if todo not found', (done) => {
    var newId = new ObjectID;
    var newIdString = newId.toHexString();
    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if non-object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () =>{

  it('should delete a todo with a valid ID', (done) =>{
    var id = todos[0]._id.toHexString();
    var todoText = todos[0].text;
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(todoText);
      })
      .end( (err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(id).then( (todo) => {
          expect(todo).toNotExist();
          done();
        }).catch( (error) => {
          done(error);
        });
      });
  });

  it('should return 404 if todo not found', (done) => {
      var newIdString = new ObjectID().toHexString();
      request(app)
        .delete(`/todos/${newIdString}`)
        .expect(404)
        .end(done);
  });

  it('should return 404 if object id is invalid', (done) =>{
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {
  it('should update the todo when completed is set to true or text is changed', (done) => {
    var hexID = todos[0]._id.toHexString();
    var text = "updated todo"
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        text,
        completed: true
      })
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
    // below is not needed, but is done to check the database
    .end( (err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(hexID).then( (todo) => {
        expect(todo.text).toBe(text);
        expect(todo.completed).toBe(true);
        expect(todo.completedAt).toBeA('number');
        done();
      }).catch( (err) => done(err) );
    });
  });


  it('should clear completedAt when completed is set to false', (done) => {
    var hexID = todos[1]._id.toHexString();
    var text = "almost completed!"
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(text),
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });
});
