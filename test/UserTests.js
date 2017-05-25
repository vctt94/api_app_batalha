process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
chai.use(chaiHttp);

describe('Users', () => {


  describe('/GET users', () => {

    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/user/get-all-users')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        });
    });

    it('it should GET user by id', (done) => {
      chai.request(server)
        .get('/user/get-all-users')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        });
    });

  });

});