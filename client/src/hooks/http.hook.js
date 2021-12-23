import {useState,useCallback} from 'react' //импорт хуков с реакта

export const useHttp = () =>{ //позволяет взаимодейств. с сервером и экпортировать сущности
    //внутри данного хука проверяем вообще грузит ли что-то сервер или нет
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null) // по дефолту в ошибках пусто
    const request = useCallback (async (url,method = 'GET',body = null, headers={}) => { //в параметрахЖ 1-я асинхр функция, 2 - набор зависимостей

        setLoading(true)
        try {

            if(body){
                body= JSON.stringify(body) //в консоли нет, а в пакетах в браузере есть
                headers['Content-Type']='application/json' // указываем, что передаём по сети json
            }
            const response = await fetch(url,{method,body,headers}) //на канале есть. Этьо бразуерный метод
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Какая-то ошибка в response')
            }
            setLoading(false)

            return data

        }catch (e){
            console.log(e.message)
            setLoading(false) //т.к. запрос всё равно отработал
            setError(e.message)
            throw e //просто выкидываем эту ошибку
        }
        },[])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}