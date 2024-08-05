import { useEffect, useState } from 'react';
import './App.css';
import {teslaSale} from './data';
import DropDown from './dropdown';
function calAggregate(data){
  let region_total = {};
  let processedData = [];
  let splitData = {};
  let index = ["US","EU","CA"];
  console.log(index);
  for(let region in index){
    region_total[index[region]] = 0;
    splitData[index[region]] = [];
  }
  for(let indx in data)
  {
    region_total[data[indx].region]+=data[indx].sales;
    splitData[data[indx].region].push(data[indx]);
  }
  for(let region in index){
  processedData = [...processedData,{region:index[region], model:"sum" ,sales:region_total[index[region]]},...splitData[index[region]]]
  }
  return processedData;
}
function App() {
  let regions = ["All","US","EU","CA"];
  let models = ["All","A","B","C","D"];
  let aggregateData = calAggregate(teslaSale);
  // var [aggData,setAggData] = useState(aggregateData);
  var [originalData,setOriginalData] = useState(teslaSale);
  var [region,setRegion] = useState(regions[0]);
  var [model,setModel] = useState(models[0]);
  useEffect(()=>{
    console.log(region)
    let data = [...teslaSale]
  if(region!=="All"){
    data = data.filter((data)=>data.region == region);
  }
  if(model!=="All"){
    data = data.filter((data)=>data.model == model);
  }
  setOriginalData(data);  

  },[region,model]);
  return (
    <div className="App">
    <div className="container">
      <div className="table-heading">
        AGGREGATE TABLE
      </div>
    <table className="tables">
    <tr>
        <th>region</th>
        <th>model</th>
        <th>sales</th>
    </tr>
  {aggregateData.map(sales=><tr key={sales.region+"-"+sales.model}>
    <td>{sales.region}</td>
    <td>{sales.model}</td>
    <td>{sales.sales}</td>
  </tr>)}
</table>
    </div>
    <div className="container">
    <div className="table-heading">
        ORIGNAL TABLE
    </div>
    <div className="line">
      <span>Region Filter </span>
      <DropDown data={regions} value={region} setValue={setRegion} id="region"/>
      <span>  </span>
      <span>Model Filter </span>
      <DropDown data={models} value={model} setValue={setModel} id="model"/>
    </div>
    <table className="tables">
      <tr>
        <th>region</th>
        <th>model</th>
        <th>sales</th>
      </tr>
  {originalData.map(sales=><tr key={sales.region+"-"+sales.model}>
    <td>{sales.region}</td>
    <td>{sales.model}</td>
    <td>{sales.sales}</td>
  </tr>)}
</table>
    </div>
    </div>
  );
}

export default App;
