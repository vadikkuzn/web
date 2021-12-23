let mongoose = require("mongoose");
let Tutor = require('../models/Tutor');
//const should = require('should');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const {describe, it} = require("mocha");


chai.use(chaiHttp);
const should = chai.should()

describe('auth', () => {
    describe('/Auth ', () => {
        it('Проверка регистрации с не корректными данными', (done) => {
            const data = {
                email: '2',
                password: 'qwerty1234'
            }
            chai.request('http://localhost:5000')
                .post('/api/authorization/reg')
                .send(data)
                .end((err, res) => {
                   // should.exist(res.body);
                    console.log(res)
                    res.should.have.status(400);
                    res.body.should.have.property('message').eq('Некор. данные при реге');
                    done();
                });
        });
        // it('Проверка регистрации c существующем email', (done) => {
        //     const data = {
        //         email: '2@mail.ru',
        //         password: 'qwerty1234'
        //     }
        //     chai.request('http://localhost:5000')
        //         .post('/api/authorization/reg')
        //         .send(data)
        //         .end((err, res) => {
        //             res.should.have.status(400);
        //
        //             res.body.should.have.property('message').eq('Польз существует');
        //             done();
        //         });
        // });
        // it('Регистрация', (done) => {
        //     const data = {
        //         email: '2@mail.ru',
        //         password: 'qwerty1234'
        //     }
        //     chai.request('http://localhost:5000')
        //         .post('/api/authorization/reg')
        //         .send(data)
        //         .end((err, res) => {
        //             res.should.have.status(201);
        //             res.body.should.have.property('message').eq('Польз создан');
        //             done();
        //         });
        // });
    });
});
