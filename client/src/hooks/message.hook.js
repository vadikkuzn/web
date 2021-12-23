import {useCallback} from "react"; //делаем, чтобы реакт в рекурсию не ушёл

export const useMessage = () =>{
    return useCallback( text => {
        if(window.M && text)
            window.M.toast({html: text}) //data.message is not a func
        }, [])
}