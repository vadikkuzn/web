const {Router} = require('express')
const router = Router()
const Tutor = require('../models/Tutor')
const auth = require('../middleware/auth.middleware')

router.post('/create',auth, async (req,res) =>{

    try {
        console.log('body:', req.body);

        const {name,rate,subject,experience} = req.body


        const tutor = new Tutor({
            name,rate,subject,experience,owner:req.user.userId})

        await tutor.save()
        //res.status(201).json({tutor})
        res.status(201).json({message: 'Репетитор создан'})



    }catch (e){
        res.status(500).json({message: "Ошибка d создании репетитора"})
    }

})

router.put('/update',auth, async (req,res) =>{

    try {

        console.log('body:', req.body);

        const {name,rate,subject,experience} = req.body

        const tut = await Tutor.findOne({id: req.params.id},{$set:{name,rate,subject,experience}})
        res.json(tut)


    }catch (e){
        res.status(500).json({message: e.message})
    }

})

//update
router.put('/update/:id', auth, async (req,res)=>{
    try {
        console.log(req.body)
        const id = req.params.id
        const newName = req.body.name
        const newRate = req.body.rate
        const newSubject = req.body.subject
        const newExperience = req.body.experience

        //const tutor = new Tutor({name:newName,rate:newRate,subject:newSubject,experience:newExperience})

        try {
            await Tutor.findById(id,(e,updatedTutor)=>{
                updatedTutor.name = newName
                updatedTutor.rate = newRate
                updatedTutor.subject = newSubject
                updatedTutor.experience = newExperience

                updatedTutor.save()
            })
        }catch (e){}


    }catch (e){
        res.status(500).json('Что-то пошло не по плану')
    }


})


//delete
router.delete('/delete/:id', auth, async (req,res)=>{
    try {
        //const idd = await Tutor.findOne(req).deleteOne()
        //res.json(idd)

        const id = req.params.id
        const del = await Tutor.findByIdAndRemove(id).exec()

        //res.json(del)
    } catch (e){
    res.status(500).json('Что-то пошло не по плану')
}
})


router.get('/', auth, async(req,res) =>{
    try {
        const tutors = await Tutor.find({owner: req.user.userId }) //тут связваем с пользователем link //все ссылки котороые относятся к текущему пользователю
        res.json(tutors)
    }catch (e){
        res.status(500).json('Что-то пошло не по плану')
    }
})

router.get('/:id',auth, async(req,res) =>{
    try {
        const tutor = await Tutor.findById(req.params.id)
        res.json(tutor)
    }catch (e){
        res.status(500).json('Что-то пошло не по плану')
    }
})



module.exports = router