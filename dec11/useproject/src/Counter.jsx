import { useEffect,useState } from "react";
function Counter(){
    const[count,setCount]=useState(0);
    useEffect(()=>{
        if(count!==0 && count%3===0){
            alert(`The current number ${count} is divisible by 3`)

        }
    },[count]);
    return(
        <div>
            <h2>Counter:{count}</h2>
            <button onClick={()=>setCount(count+1)}>
                Increment
            </button>
        </div>
    )
}
export default Counter;