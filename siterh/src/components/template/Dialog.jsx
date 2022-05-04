import './Dialog.css'
import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

function Dialog(mensagem, callback, configuration = {}){
    const config = {confirm: false, ...configuration}
    return (
        <div className="gray-background">

            <div className="buttons-area">
                <h3 className='mb-3'>{mensagem}</h3>
                <div>{renderButtons(callback, config.confirm)}</div>
            </div>

        </div>
    )
}

function renderButtons(callback, confirm) {
    if (confirm) {
        return <>
            <Button variant='primary' onClick={() => callback(true)}>Sim</Button>{' '}
            <Button variant='secondary' onClick={() => callback(false)}>Não</Button>
        </>
    } else {
        return <button onClick={callback}>OK</button>
    }
}

export default Dialog
