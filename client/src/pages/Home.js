import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {TutorsList} from '../components/TutorsList'

export const Home = () => {

    const [tutorName, setTutorName] = useState('')
    //const [tutorRate, setTutorRate] = useState(0)
   // const [tutorSubject, setTutorSubject] = useState('')
   // const [tutorExperience, setTutorExperience] = useState('')

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)


    const getTutors = useCallback(async () => {
        try {
            const gotTutors = await request('/api/tutor', 'GET', null, {
                Authorization: `Bearer ${token}`

            })
            setTutorName(gotTutors)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getTutors()
    }, [getTutors])


    return(
        <>
            {!loading && <TutorsList tutors={tutorName} />}
        </>
    )
}