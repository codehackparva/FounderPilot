"use client";
import {useState} from 'react';
const NM=['Observation','Problem Identification','Empathy Mapping','Mind Map','Brainstorming','SCAMPER'];
export default function About(){
  const [z,setZ]=useState(null);
  return <><h2>About the project</h2><p className="sub">C2P project, Atmiya University, Rajkot. Domain: AI in Entrepreneurship. Team: Tonmay Gajjar, Dave Parvaraj.</p>
  <div className="card"><div className="eyebrow">Problem statement</div><p style={{margin:0}}>How can we use AI to help small and early-stage entrepreneurs start and grow their business more efficiently, while keeping the solution affordable, user-friendly and suitable for non-technical users?</p></div>
  <div className="card" style={{marginTop:14}}><div className="eyebrow">Top 5 ideas, now built as pages</div><p className="mute" style={{margin:0}}>AI chatbot for customer support · AI-generated marketing content · Predictive sales forecasting · Automated social media scheduling · AI-based inventory management</p></div>
  <h3 style={{margin:'22px 0 10px'}}>Our six canvases</h3><div className="shots">{NM.map((n,i)=><div key={n}><button onClick={()=>setZ(i+1)}><img src={`/canvases/${i+1}.jpg`} alt={n+' canvas'}/></button><p className="mute" style={{margin:'6px 2px'}}>{i+1}. {n}</p></div>)}</div>
  {z&&<div id="lb" style={{display:'flex'}} onClick={()=>setZ(null)}><img src={`/canvases/${z}.jpg`} alt=""/></div>}</>}
