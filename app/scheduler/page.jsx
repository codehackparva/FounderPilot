"use client";
import {useState} from 'react';import {useApp} from '@/components/Store';import {DAYS} from '@/lib/data';
export default function Scheduler(){
  const {sched,setSched}=useApp(),[t,setT]=useState(''),[d,setD]=useState(0);
  const add=()=>{if(!t.trim())return;setSched(s=>[...s,{d,t:t.trim(),s:'Scheduled'}]);setT('')};
  const handleDrop = (e, i) => {
    const idx = e.dataTransfer.getData('idx');
    if (idx !== null && idx !== '') {
      setSched(s => {
        const ns = [...s];
        ns[idx] = { ...ns[idx], d: i };
        return ns;
      });
    }
  };
  return <><h2>Scheduler</h2><p className="sub">Your week of posts. Approved items from the Content Studio appear here.</p>
  <div className="week">{DAYS.map((x,i)=><div className="day" key={x} onDragOver={e=>e.preventDefault()} onDrop={e=>handleDrop(e,i)}><h3>{x}</h3>{sched.map((p,j)=>p.d===i&&<div className="post" key={j} draggable onDragStart={e=>e.dataTransfer.setData('idx',j)}><button className="del-cross" onClick={e=>{e.preventDefault();e.stopPropagation();setSched(s=>s.filter((_,k)=>k!==j))}} title="Remove">×</button>{p.t}</div>)}</div>)}</div>
  <div className="card" style={{marginTop:16}}><h3>Add a post</h3><div className="row"><input style={{flex:1,minWidth:200}} value={t} onChange={e=>setT(e.target.value)} placeholder="Post idea or caption"/><select style={{width:'auto'}} value={d} onChange={e=>setD(+e.target.value)}>{DAYS.map((x,i)=><option key={x} value={i}>{x}</option>)}</select><button className="btn" onClick={add}>Add</button></div></div></>
}

