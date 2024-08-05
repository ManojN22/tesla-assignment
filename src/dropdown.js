function DropDown({data,value,setValue,id}){
    return  <select onChange={(e)=>setValue(e.target.value)}  value = {value} id={id} defaultValue={value}>
    {data.map(val=> <option value={val}>{val}</option>)}
  </select>;
}
export default DropDown;