import { useState } from "react";
function ComponentA(){
    return <h2>Status is True</h2>
}
function ComponentB(){
    return <h2>Status is False</h2>
}
export default function StatusToggle(){
    const [status,setStatus] = useState(false);
    return(
        <div>
            <button onClick={()=>setStatus(!status)}>
                Toggle Status
            </button>
        </div>
    )
}