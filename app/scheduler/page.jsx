"use client";
import {useState} from 'react';import {useApp} from '@/components/Store';import {DAYS} from '@/lib/data';
export default function Scheduler(){
  const {sched,setSched}=useApp(),[t,setT]=useState(''),[d,setD]=useState(0);
  const add=()=>{if(!t.trim())return;setSched(s=>[...s,{d,t:t.trim(),s:'Scheduled'}]);setT('')};
  return <><h2>Scheduler</h2><p className="sub">Your week of posts. Approved items from the Content Studio appear here.</p>
  <div className="week">{DAYS.map((x,i)=><div className="day" key={x}><h3>{x}</h3>{sched.map((p,j)=>p.d===i&&<div className="post" key={j}>{p.t}<br/><span className="mute">{p.s} · <a href="#" style={{color:'var(--warn)'}} onClick={e=>{e.preventDefault();setSched(s=>s.filter((_,k)=>k!==j))}}>remove</a></span></div>)}</div>)}</div>
  <div className="card" style={{marginTop:16}}><h3>Add a post</h3><div className="row"><input style={{flex:1,minWidth:200}} value={t} onChange={e=>setT(e.target.value)} placeholder="Post idea or caption"/><select style={{width:'auto'}} value={d} onChange={e=>setD(+e.target.value)}>{DAYS.map((x,i)=><option key={x} value={i}>{x}</option>)}</select><button className="btn" onClick={add}>Add</button></div></div></>
}
