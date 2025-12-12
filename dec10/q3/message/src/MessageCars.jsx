function MessageCard(props){
return(
    <div style={{ border: "1px solid #ccc", padding: "12px", margin: "10px" }}>
        <h3>{props.title}</h3>
        <p>{props.message}</p>
    </div>
)
}
export default MessageCard;