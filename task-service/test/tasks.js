import { beforeEach, describe, it } from 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'
import taskModel from '../repository/taskModel.js'

// eslint-disable-next-line no-unused-vars
const should = chai.should()
chai.use(chaiHttp)

describe('Tasks', function() {
    beforeEach(function(done) {
        taskModel.deleteMany({}, () => {
            done();
        })
    });

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
        it('should add a new task', (done) => {
            let task = {"description": "New Task", "isChecked": true}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(201);
                done();
            })
        })

        it('should not add a task with invalid description type', (done) => {
            let task = {"description": 1, "isChecked": true}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })

        it('should not add a task with invalid isChecked type', (done) => {
            let task = {"description": "Task with invalid isChecked type", "isChecked": "yes"}
            chai.request(app).post('/api/task/addTask').send(task).end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
    })
})
