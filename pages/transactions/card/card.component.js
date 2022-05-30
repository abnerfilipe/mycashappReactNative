const Card = (props) => {
    return (
        <View className="card mb-3" >
            <View className="card-body">
                {/* <h5 className="card-title">Card title</h5> */ }
                {props.type === 'r' &&  <h6 className="card-subtitle mb-2 text-success"> Recebido </h6>}
                {props.type === 'p' &&  <h6 className="card-subtitle mb-2 text-danger"> Enviado </h6>}
                <p className="card-text">Amount: R$ { props.value }</p>
            </View>
            <View className="card-footer">
                <span className="text-muted">Data da Transaçāo: { new Intl.DateTimeFormat('en-US',
                        { 
                            year: 'numeric', 
                            month: '2-digit', 
                            day: '2-digit', 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            second: '2-digit' 
                        }).format(new Date(props.date)) }</span>
            </View>
        </View>
    )
}
export default Card;