const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    email:{type: String, required:true,unique:true}, // required - обязательное поле, unique - не повторяется
    password: {type: String, required:true},
    tutors: [{ type: Types.ObjectId, ref: 'Tutor' }] //связка пользователя и его записей в бд // Link - к какой модели привязываться
})
module.exports = model('User', schema)//экcпорт из файла результат функции model. Название модели- юзер,схема по которой работает - schema
