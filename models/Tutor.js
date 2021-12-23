const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    //id:{type: String, required:true,unique:true}, // required - обязательное поле, unique - не повторяется
    name: {type: String, required:true},
    rate: {type: Number, required:true},
    subject: {type: String, required:true},
    experience: {type: String, required:true},
    owner: {type: Types.ObjectId, ref: 'User'} //связка пользователя и его записей в бд // Link - к какой модели привязываться
})
module.exports = model('Tutor', schema)//экcпорт из файла результат функции model. Название модели- юзер,схема по которой работает - schema

//id,name,rate,subject,experience
//id, имя, оценка, тема, опыт

