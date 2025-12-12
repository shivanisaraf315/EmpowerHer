import UserInfo from "./UserInfo";
function UserProfile(){
    const name="shivani"
    const age=19;
    return(
        <div>
            <UserInfo name={name} age={age}/>
        </div>
    )
}
export default UserProfile;