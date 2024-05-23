process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;
//welcome route test
describe('Welcome Route', () => {
    it('should return status code 200', (done) => {
        chai.request(app) // Using chai-http request
            .get('/api/welcome')
            .end((err, res) => {
                // Check for errors and status code
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done(); 
            });
    });
});