import './Display.css'
import Listagem from '../listagem/Listagem'

function dialog(mensagem, confirmaExclusao){
    return (
        <div className="gray-background">
            
            <div className="buttons-area">
                <h3>{mensagem}</h3>
                <div>
                    <button onClick={() => confirmaExclusao(true)}>Sim</button>
                    <button onClick={() => confirmaExclusao(false)}>Não</button>
                </div>
            </div>

        </div>
    )
}

export default dialog