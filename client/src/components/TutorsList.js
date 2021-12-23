import React, {useContext, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";




export const TutorsList = ({ tutors }) => {
    const {token} = useContext(AuthContext)
    const {request} = useHttp()
    const [tutorName, setTutorName] = useState('')
    const [tutorRate, setTutorRate] = useState(0)
    const [tutorSubject, setTutorSubject] = useState('')
    const [tutorExperience, setTutorExperience] = useState('')


    if (!tutors) {
        return <p className="center">Ссылок пока нет</p>
    }


    const updateTutor = async (id) => {
        try {
            window.location.reload()
            //console.log(id)
            const data = await request(`/api/tutor/update/${id}`, 'PUT', {name:tutorName,rate:tutorRate,subject:tutorSubject,experience:tutorExperience}, {
                Authorization: `Bearer ${token}`
            })
            console.log(id)
            console.log(data)

        } catch (e) {}
    }

    const deleteTutor = async (id) => {
        try {
            window.location.reload()
            await request(`/api/tutor/delete/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })

        } catch (e) {
        }
    }

        return (
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Оценка</th>
                    <th>Тема</th>
                    <th>Опыт</th>
                </tr>
                </thead>

                <tbody>
                {tutors.map((tutor, index) => {
                    return (
                        <tr key={tutor._id}>
                            <td>{index + 1}</td>
                            <td>{tutor.name}</td>
                            <td>{tutor.rate}</td>
                            <td>{tutor.subject}</td>
                            <td>{tutor.experience}</td>
                            <td>
                                <button className="btn yellow darken-4" style={{marginRight: 10}}
                                        onClick={() => updateTutor(tutor._id)}>Обновить
                                </button>
                                <button className="btn yellow darken-4" style={{marginRight: 10}}
                                        onClick={() => deleteTutor(tutor._id)}>Удалить
                                </button>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td><label>Изменить данные</label></td>
                    <td><input placeholder="name" id="name" type="text" size="20" onChange={e=>setTutorName(e.target.value)}/></td>
                    <td><input placeholder="rate" id="rate" type="number" size="20" onChange={e=>setTutorRate(e.target.value)}/></td>
                    <td><input placeholder="subject" id="subject" type="text" size="20" onChange={e=>setTutorSubject(e.target.value)}/></td>
                    <td><input placeholder="experience" id="experience" type="text" size="20" onChange={e=>setTutorExperience(e.target.value)}/></td>

                </tr>
                </tbody>
            </table>
        )
}
