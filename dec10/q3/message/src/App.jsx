import MessageCard from "./MessageCars";
function App(){
  return(
    <div>
      <MessageCard
      title="welcome"
      message="welcome to react application" />
      <MessageCard
      title="Success"
      message="Your Operation is Successful" />
      <MessageCard
      title="Warning"
      message="Please check your input values" />

    </div>
  )
}
export default App;