import React from "react";
import {Routes, Route} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {Home} from "./pages/Home";
import {DBindex} from "./pages/BDindex";


export const useRoutes = isAuth => { //если пользв. зареган (есть токен), то
    if(isAuth){
        return(
        <Routes>
            <Route exact path='/bdindex' element={<DBindex/>}/>
            <Route exact path='/home' element={<Home/>}/>
        </Routes>
        )
    }
    return (
        <Routes>
            <Route exact path='/' element={<AuthPage/>}/>
        </Routes>

    )
}