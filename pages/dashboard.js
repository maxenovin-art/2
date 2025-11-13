import { useEffect, useState } from 'react';
export default function Dashboard(){
  const [list,setList] = useState([]);
  useEffect(()=>{ fetch('/api/reservations').then(r=>r.json()).then(d=>setList(d.list||[])) },[]);
  return (<div style={{padding:20,fontFamily:'sans-serif'}}>
    <h2>Admin Dashboard (read-only demo)</h2>
    <table border='1' cellPadding='6'>
      <thead><tr><th>id</th><th>resource</th><th>start</th><th>end</th><th>user</th><th>status</th></tr></thead>
      <tbody>{list.map(r=>(
        <tr key={r.id}><td>{r.id}</td><td>{r.resource}</td><td>{new Date(r.startAt).toLocaleString()}</td><td>{new Date(r.endAt).toLocaleString()}</td><td>{r.user?.email}</td><td>{r.status}</td></tr>
      ))}</tbody>
    </table>
  </div>);
}
