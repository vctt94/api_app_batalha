process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai     = require('chai'),
  chaiHttp = require('chai-http'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  User 	   = mongoose.model('User')

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

      let user = new User({"name":"teste","email":"teste@teste.com","gender":"mano","user_level":1})

      user.save((err,user)=>{
        chai.request(server)
          .get('/user/get-user-by-id/'+user._id)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('success')
            res.body.data.should.have.property('name')
            res.body.data.should.have.property('email')
            res.body.data.should.have.property('gender')
            res.body.data.should.have.property('user_level')
            done()
          });
      })


    });

  });

  describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', (done) => {

      let user = new User({"name": "teste", "email": "teste@teste.com", "gender": "mano", "user_level": 1})

      user.save((err, user) => {
        chai.request(server)
          .put('/user/update-user-by-id/' + user._id)
          .send({"name": "teste update", "email": "testeUpdate@teste.com"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('teste update');
            res.body.data.should.have.property('email').eql('testeUpdate@teste.com');
            done();
          });

      });

    })

  })

  describe('/DELETE/:id user', () => {

    it('it should DELETE a user given the id', (done) => {

      let user = new User({"name": "teste", "email": "teste@teste.com", "gender": "mano", "user_level": 1})

      user.save((err, user) => {
        chai.request(server)
          .delete('/user/delete-user-by-id/' + user._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            done();
          });
      });
    });
  })

});
