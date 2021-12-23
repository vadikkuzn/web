import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useMessage} from "../hooks/message.hook";


export const DBindex = () => {

    const message = useMessage()
    const auth = useContext(AuthContext)
    const { request,error,clearError} = useHttp()
    const [tutorName, setTutorName] = useState('')
    const [tutorRate, setTutorRate] = useState(0)
    const [tutorSubject, setTutorSubject] = useState('')
    const [tutorExperience, setTutorExperience] = useState('')


    useEffect(()=> { //хук для обработки ошибок
        //console.log('error',error)
        message(error)
        clearError()
    },[error,message, clearError])

    const pressHandler = async () => {
            try {
                const data = await request('/api/tutor/create', 'POST', {name:tutorName,rate:tutorRate,subject:tutorSubject,experience:tutorExperience}, {
                    Authorization: `Bearer ${auth.token}`
                }
                )
                console.log(data)
                message(data.message)
            } catch (e) {}
    }




    return (
    <div className="row">
        <h1>DB</h1>
        <div className="input-field">
            <input placeholder="Введите name" id="name" type="text" onChange={e=>setTutorName(e.target.value)}/>
            <input placeholder="Введите rate" id="rate" type="number" onChange={e=>setTutorRate(e.target.value)} />
            <input placeholder="Введите subject" id="subject" type="text" onChange={e=>setTutorSubject(e.target.value)} />
            <input placeholder="Введите experience" id="experience" type="text" onChange={e=>setTutorExperience(e.target.value)}/>
        </div>
        <button className="btn yellow darken-4" style={{marginRight: 10}} onClick={pressHandler}>Добавить</button>
    </div>
    )
}