const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express() //роутер - это миддлвеар? *22.46, и чтобы не создавать отдельные переменные - пользуемся require

app.use(express.json({extended: true})) //чтобы в консоль выводился пароль. Это вроде middlewear
app.use('/api/authorization', require('./routes/authorization.routes'))
app.use('/api/tutor',require('./routes/tutor.routes'))


const PORT = config.get('port') || 5000

async function start(){ //промисы - это что-то в бд
try {
await mongoose.connect(config.get('mongoURI'), { // подождать, когда промис завершится? 13:28
    /*useNewUrlPaser:true, //чтобы коннект успешно работал
    useUnifiedTopology: true,
    useCreateIndex:true

     */
})
}catch (e){
    console.log('error', e.message)
    process.exit(1)
}
}
start()

app.listen(PORT,() => console.log(`app started on port ${PORT}`))
