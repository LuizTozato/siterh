import React, {useState, createContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Validacao from './validarToken.js'

export const AuthContext = createContext() //disponível em todo o sistema

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        //useEffect é assíncrono, por isso, preciso fazer essa verificação antes de renderizar a página
        const recoveredToken = localStorage.getItem('token')

        const validacao = Validacao.validarToken(recoveredToken)

        if(validacao){
            setUser(true)
        }

        setLoading(false)

    }, []) //esse [] significa que vai rodar toda vez que atualizar a página. Se fosse [user], seria executado toda vez que o user fosse atualizado, por exemplo.


    const login = function(email, senha) {

        return new Promise(function(myResolve, myReject){
            
            axios.put('/credenciais/token', {email, senha} ).then(resp => {
                
                const token = resp.data

                if(!!token){
                    localStorage.setItem("token",token)
                    setUser({email})
                    myResolve("OK")
                } else {
                    localStorage.removeItem('token')
                    setUser(null)
                    myReject("Deu ruim")
                }
            })
        })

    }

    const logout = () => {

        console.log("logout")
        setUser(null)
        localStorage.removeItem('token')
        navigate("/")
    }    
    
    return (
        <AuthContext.Provider value={{
            authenticated: !!user,
            user,
            loading,
            login,
            logout
        }}>
            {children}

        </AuthContext.Provider>
    )
}