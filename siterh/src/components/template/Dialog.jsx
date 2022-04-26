import './Dialog.css'

function Dialog(mensagem, callback, configuration = {}){
    const config = {confirm: false, ...configuration}
    return (
        <div className="gray-background">

            <div className="buttons-area">
                <h3>{mensagem}</h3>
                <div>{renderButtons(callback, config.confirm)}</div>
            </div>

        </div>
    )
}

function renderButtons(callback, confirm) {
    if (confirm) {
        return <>
            <button onClick={() => callback(true)}>Sim</button>
            <button onClick={() => callback(false)}>Não</button>
        </>
    } else {
        return <button onClick={callback}>OK</button>
    }
}

export default Dialog
