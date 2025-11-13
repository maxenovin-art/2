import { useState } from 'react';
export default function Search(){
  const [resource,setResource]=useState('room:101');
  const [from,setFrom]=useState('');
  const [to,setTo]=useState('');
  async function doSearch(e){
    e.preventDefault();
    const q = new URLSearchParams({resource, from, to});
    const res = await fetch('/api/reservations?'+q.toString());
    const data = await res.json();
    alert('Found '+ (data.list?.length||0) + ' reservations (see console)');
    console.log(data);
  }
  return (<div style={{padding:20,fontFamily:'sans-serif'}}>
    <h2>Search</h2>
    <form onSubmit={doSearch}>
      <div><label>Resource <input value={resource} onChange={e=>setResource(e.target.value)} /></label></div>
      <div><label>From <input type='datetime-local' value={from} onChange={e=>setFrom(e.target.value)} /></label></div>
      <div><label>To <input type='datetime-local' value={to} onChange={e=>setTo(e.target.value)} /></label></div>
      <button>Search</button>
    </form>
  </div>);
}
