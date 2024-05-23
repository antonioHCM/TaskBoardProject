const Project = require('../models/project');
const User = require('../models/user');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

describe('User workflow tests', () => {
  let token;
  let project;
  let ownerId;
  let contributorIds;

  before(async () => {
    await Project.deleteMany({});
    await User.deleteMany({});
    ownerId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for the owner
    contributorIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];// Generate a new ObjectId for the contributors
  });

  after(async () => {
    await Project.deleteMany({});
    await User.deleteMany({});
  });
//Registering
  it('should register a new user', async () => {
    const user = {
      name: "Antonio Magalhaes",
      email: "antonio@email.com",
      password: "123456"
    };

    const res = await chai.request(app)
      .post('/api/user/register')
      .send(user);

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.equal(null);
  });
//Logging in
  it('should login the user', async () => {
    const loginDetails = {
      email: "antonio@email.com",
      password: "123456"
    };

    const res = await chai.request(app)
      .post('/api/user/login')
      .send(loginDetails);

    expect(res.status).to.be.equal(200);
    expect(res.body.error).to.be.equal(null);
    token = res.body.data.token; //Token for subsequent requests
  });
//Creating new project
it('should create a new project', async () => {
  
  const newProject = {
    name: "Sample Project",
    owner: ownerId.toString(), 
    contributors: contributorIds.map(id => ({ _id: id.toString() })), 
    
  };

  // Send request with authentication token
  const res = await chai.request(app)
    .post('/api/project')
    .set('auth-token', token) // Set authentication token in request headers
    .send(newProject);


  // Store the created project data
  createdProject = res.body;

  // Assertions
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.an('object');
  expect(res.body.name).to.be.equal(newProject.name);
  expect(res.body.owner).to.be.equal(newProject.owner);
  expect(res.body.contributors).to.be.an('array');
  expect(res.body.contributors.length).to.be.equal(2);
  expect(res.body.contributors[0]._id).to.be.equal(newProject.contributors[0]._id);
  expect(res.body.contributors[1]._id).to.be.equal(newProject.contributors[1]._id);
  expect(res.body.description).to.be.equal(newProject.description);
});

  it('should verify one project in the DB', async () => {
    const res = await chai.request(app)
      .get('/api/project')
      .set('auth-token', token);

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.eql(1);

    const fetchedProject = res.body[0];
    expect(fetchedProject.name).to.be.equal(createdProject.name);
    expect(fetchedProject.owner).to.be.equal(createdProject.owner);
    expect(fetchedProject.contributors).to.be.an('array');
    expect(fetchedProject.contributors.length).to.be.equal(2);
    expect(fetchedProject.contributors[0]._id).to.be.equal(createdProject.contributors[0]._id);
    expect(fetchedProject.contributors[1]._id).to.be.equal(createdProject.contributors[1]._id);
    expect(fetchedProject.description).to.be.equal(createdProject.description);
  });
});
