export default function RestaurantCard({ data,isAdmin,onDelete,onUpdate}){
    return(
        <div className="card">
<img src={data.image} alt="" />
<h4>{data.restaurantName}</h4>
<p>{data.address}</p>
<p>
{data.type}
</p>      
<p> {data.parkingLot ? "Parking Available":"No Parking"}</p>
{isAdmin &&(
    <>
    <button onClick={()=>onUpdate(data)}>Update</button>
    <button onClick={()=>onDelete(data.restaurantID)}>Delete</button>
    </>
)}
  </div>
    )
}