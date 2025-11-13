import Link from 'next/link';
export default function Home(){ return (
  <div style={{padding:20,fontFamily:'sans-serif'}}>
    <h1>Reservation System (Demo)</h1>
    <ul>
      <li><Link href='/search'>Search & Book</Link></li>
      <li><Link href='/dashboard'>Admin Dashboard</Link></li>
    </ul>
  </div>
); }
