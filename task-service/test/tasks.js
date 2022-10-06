import { before, describe, it } from 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'
import taskModel from '../repository/taskModel.js'

// eslint-disable-next-line no-unused-vars
const should = chai.should()
const expect = chai.expect
chai.use(chaiHttp)

describe('Tasks', function() {
    describe('/GET Tasks', function() {
        it('should return a list of tasks', function(done) {
            chai.request(app).get('/api/task/getTasks').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

    describe('/POST Task', function() {
        before(function(done) {
            taskModel.deleteMany({}, () => {
                done();
            })
        });

        let task = {"description": "New Task", "isChecked": true}
        it('should add a new task', (done) => {
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('message').eql('Created task "New Task" successfully');
                done();
            })
        })

        it('should not add a task with invalid description type', (done) => {
            let task = {"description": 1, "isChecked": true}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"description" must be a string');
                done();
            })
        })

        it('should not add a task with invalid isChecked type', (done) => {
            let task = {"description": "Task with invalid isChecked type", "isChecked": "yes"}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"isChecked" must be a boolean');
                done();
            })
        })

        it('should not add a task with missing description', (done) => {
            let task = {"isChecked": false}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"description" is required');
                done();
            })
        })

        it('should not add a task with missing isChecked', (done) => {
            let task = {"description": "Task with missing isChecked"}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"isChecked" is required');
                done();
            })
        })

        it('should not add a task when JSON is empty', (done) => {
            let task = {}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"description" is required');
                done();
            })
        })

        it('should not add a task that already exists', (done) => {
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('Task already exists');
                done();
            })
        })

        it('should only contain "New Task"', (done) => {
            chai.request(app).get('/api/task/getTasks').end((err, res) => {
                res.should.have.status(200);
                expect(res.body.tasks).to.have.lengthOf(1);
                expect(res.body.tasks).to.be.an('array').that.deep.includes(task);
                done();
            })
        })
    })

    describe('/PUT Task', function() {
        it('shoud not update task that does not exist', (done) => {
            let task = {"oldDesc": "Task that does not exist", "oldIsChecked": true, "newDesc" : "Updated Task", "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('Task does not exist');
                done();
            })
        })
        
        it('should not update a task when oldDesc is missing', (done) => {
            let task = {"oldIsChecked": true, "newDesc" : "Updated Task", "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"oldDesc" is required');
                done();
            })
        })

        it('should not update a task when newDesc is missing', (done) => {
            let task = {"oldDesc": "New Task", "oldIsChecked": true, "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"newDesc" is required');
                done();
            })
        })

        it('should not update a task when oldIsChecked is missing', (done) => {
            let task = {"oldDesc": "New Task", "newDesc" : "Updated Task", "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"oldIsChecked" is required');
                done();
            })
        })

        it('should not update a task when newIsChecked is missing', (done) => {
            let task = {"oldDesc": "New Task", "oldIsChecked": true, "newDesc" : "Updated Task"}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"newIsChecked" is required');
                done();
            })
        })

        it('should not update a task when JSON is empty', (done) => {
            let task = {}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"oldDesc" is required');
                done();
            })
        })

        it('should not update a task with invalid oldDesc type', (done) => {
            let task = {"oldDesc": true, "oldIsChecked": true, "newDesc" : "Updated Task", "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"oldDesc" must be a string');
                done();
            })
        })

        it('should not update a task with invalid newDesc type', (done) => {
            let task = {"oldDesc": "New Task", "oldIsChecked": true, "newDesc" : 1, "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"newDesc" must be a string');
                done();
            })
        })

        it('should not update a task with invalid oldIsChecked type', (done) => {
            let task = {"oldDesc": "New Task", "oldIsChecked": 1, "newDesc" : "Updated Task", "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"oldIsChecked" must be a boolean');
                done();
            })
        })

        it('should not update a task with invalid newIsChecked type', (done) => {
            let task = {"oldDesc": "New Task", "oldIsChecked": true, "newDesc" : "Updated Task", "newIsChecked": 0}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"newIsChecked" must be a boolean');
                done();
            })
        })

        it('should update task', (done) => {
            let task = {"oldDesc": "New Task", "oldIsChecked": true, "newDesc" : "Updated Task", "newIsChecked": false}
            chai.request(app).put('/api/task/updateTask').send(task).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Updated task successfully');
                done();
            })
        })

        it('shoud only contain "Updated Task"', (done) => {
            chai.request(app).get('/api/task/getTasks').end((err, res) => {
                res.should.have.status(200);
                expect(res.body.tasks).to.have.lengthOf(1);
                expect(res.body.tasks).to.be.an('array').that.deep.includes({"description" : "Updated Task", "isChecked" : false});
                done();
            })
        })
    })

    describe('/DELETE Tasks', function() {
        it('should not delete a task that does not exist', function(done) {
            let task = {"description" : "Task that does not exist"};
            chai.request(app).delete('/api/task/deleteTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('Task does not exist');
                done();
            })
        })

        it('should not delete a task with invalid description type', function(done) {
            let task = {"description" : true};
            chai.request(app).delete('/api/task/deleteTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"description" must be a string');
                done();
            })
        })

        it('should not delete a task with missing description', function(done) {
            let task = {};
            chai.request(app).delete('/api/task/deleteTask').send(task).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('"description" is required');
                done();
            })
        })

        it('should delete a task', function(done) {
            let task = {"description" : "Updated Task"};
            chai.request(app).delete('/api/task/deleteTask').send(task).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Deleted task "Updated Task" successfully');
                done();
            })
        })

        it('shoud not contain any tasks', (done) => {
            chai.request(app).get('/api/task/getTasks').end((err, res) => {
                res.should.have.status(200);
                expect(res.body.tasks).to.have.lengthOf(0);
                done();
            })
        })
    })
})
