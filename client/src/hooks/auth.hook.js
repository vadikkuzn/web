import {useState, useCallback, useEffect} from "react";
import {set} from "mongoose";

const storageName = 'userData'

export  const useAuth = () => {
const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)

    const login = useCallback( (jwtToken,id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            token:jwtToken, userId:id
        }))
    },[])


    const logout = useCallback( () => {
        setToken(null) //чистим значение
        setUserId (null)
        localStorage.removeItem(storageName)
    },[])

    useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token)
            login(data.token, data.userId)
    },[login]) //логин - зависимость. Именно для этого момента мы логин оборачивали в useCalback

    return {login,logout,token,userId}
}