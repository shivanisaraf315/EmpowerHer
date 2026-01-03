import { useRef,useEffect } from "react";
export default function Navbar({
    search,
    setSearch,
    type,
    setType,
    parking,
    setParking,
}){
    const ref=useRef();
    useEffect(()=>{
        ref.current.focus();
    },[]);
    return(
        <div className="navbar">
            <input ref={ref} placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <select value={type} onChange={(e)=> setType(e.target.value)}>
                <option value="">All Types</option>
                <option>Rajasthani</option>
                <option>Gujarti</option>
                <option>Mughlai</option>
                <option>Jain</option>
                <option>Thai</option>
                <option>North Indian</option>
                <option>South Indian</option>
            </select>
            <select value={parking} onChange={(e)=>setParking(e.target.value)}>
                <option value="">All Parking</option>
                <option value="true">Parking</option>
                <option value="false"> No Parking</option>

            </select>
        </div>
    );
}