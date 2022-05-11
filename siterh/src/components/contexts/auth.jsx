import React, {useState, createContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";


export const AuthContext = createContext() //disponível em todo o sistema

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const login = (email, senha) => {

        console.log({email,senha})

        axios.put('/credenciais/token', {email, senha} ).then(resp => {
            
            const token = resp.data

            if(!!token){
                localStorage.setItem("token",token)
                setUser({email})
                navigate("/listagem")
            } else {
                localStorage.clear()
            }
        })

    }

    const logout = () => {

        console.log("logout")
        setUser(null)
        navigate("/")
    }    
    
    return (
        <AuthContext.Provider value={{
            authenticated: !!user,
            user,
            login,
            logout
        }}>
            {children}

        </AuthContext.Provider>
    )
}