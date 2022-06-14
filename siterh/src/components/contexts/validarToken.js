export default {
    
    validarToken(recoveredToken){
        
        if(recoveredToken){
            return true
        } else {
            return false
        }

        /*
        const jwt = require('jsonwebtoken')
        const SECRET = 'Pakerwreah'

        jwt.verify(recoveredToken, SECRET, (err, decoded) => {
            if(!err){
                console.log("Verificado!")
                return true
            } else {
                console.log("Não ok...!")
                return false
            }
        })
        */

    }
    
}