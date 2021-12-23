let mongoose = require("mongoose");
let Tutor = require('../models/Tutor');
const should = require('should');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const {describe, it} = require("mocha");


chai.use(chaiHttp);

const should1 = chai.should()

describe('login', () => {
    describe('/LOGIN ', () => {
        it('Проверка входа с не существующей почтой', (done) => {
            const data = {
                email: 'jimp0@mail.ru',
                password: '12345678'
            }
            chai.request('http://localhost:5000')
                .post('/api/authorization/login')
                .send(data)
                .end((err, res) => {

                    res.should.have.status(400);
                    res.body.should.have.property('message').eq('user not found');
                    done();
                });
        });
        it('Проверка входа c неправильным паролем', (done) => {
            const data = {
                email: 'jimp1@mail.ru',
                password: '12345679'
            }
            chai.request('http://localhost:5000')
                .post('/api/authorization/login')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').eq('no valid password');
                    done();
                });
        });
        it('Вход', (done) => {
            const data = {
                email: 'jimp14@mail.ru',
                password: '12345678'
            }
            chai.request('http://localhost:5000')
                .post('/api/authorization/login')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('email').eq('jimp14@mail.ru');
                    done();
                });
        });
    });
});