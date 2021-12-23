import {createContext} from "react";

function nool(){}
//можно передавать эти контексты(данные) не по древовидной структуре, а напрямую через контекст по всему приложению

export const AuthContext = createContext({
    token:null,
    userId:null,
    login:nool,
    logout:nool,
    isAuthenticated: false
})