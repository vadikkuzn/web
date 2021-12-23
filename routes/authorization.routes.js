const {Router} = require('express')
const User = require('../models/User')
const router = Router()
const {check, validationResult} = require ('express-validator') //это для проверки данных на корректность /npm i express-validator
const jwt = require('jsonwebtoken')
const config = require('config')

//api/authorization/reg
router.post('/reg',[
    check('email', 'Некорр mail').isEmail(),
    check('password', 'Мин. длина > 6 символов').isLength({min:6})],
    async (req,res)=>{ //что значит стрелочная функция?
    try {
        console.log('body:', req.body);

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array(), message:'Некор. данные при реге'})
        }
        const {email,password} = req.body

        const findUser = await User.findOne({email}) //логика проверки пользователя. Мб есть уже пользователь
        if(findUser){
            return res.status(400).json({message: 'Польз существует'})
        }

        const user = new User({email,password}) // создание польз
        await user.save() //Когда промис этот будет завершён, то мы созд юзера
        res.status(201).json({message: 'Польз создан'}) //201 статус - что-то создаётся

    }catch (e){
        console.log('body:', e);
        res.status(500).json({message:'e.Ошибка в роутере /reg'})
    }
})

//api/authorization/login
router.post('/login',[
    check('email','Введи корректную почту').normalizeEmail().isEmail(),
    check('password', 'Введи пароль').exists()
],
    async (req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array(), message:'Некор. данные при входе'})
        }
        const {email,password} = req.body
        const user = await User.findOne({email}) //логика проверки пользователя. Мб есть уже пользователь
        if(!user){
            return res.status(400).json({message: 'Польз не существует'})
        }

            if(password != user.password)
                return res.status(400).json({message: 'Неверный пароль'})


                    //модуль GVT Tokena //npm i jsonwebtoken
        const  token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({token,userId: user.id})

    }catch (e){
        res.status(500).json({message:e.message})
    }
})

module.exports = router //экспорт из модуля