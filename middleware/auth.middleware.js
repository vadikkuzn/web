const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req,res,next) =>{ //функция, которая перехватывает данные и делает функцию
    if(req.method === 'OPTIONS'){ //проверяет доступность сервера. Options - значит ничего делать не нужно
        return next()
    }

    try {
        const  token = req.headers.authorization.split(' ')[1] // строка с фронтэнда - "Bearer token" // через сплит токен забираем
        if(!token){
           return res.status(401).json({message: 'Нет авторизации'})
        }

        const decoded = jwt.verify(token,config.get('jwtSecret'))//для раскодировки токент
        req.user = decoded
        next()

    }catch (e){
        return res.status(401).json({message: 'Нет авторизации'})
    }

}