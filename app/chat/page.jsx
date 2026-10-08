"use client";
import {useEffect,useRef,useState} from 'react';import Link from 'next/link';
import {useApp} from '@/components/Store';import {BIZ,R,SRC,CHIPS} from '@/lib/data';
export default function Chat(){
  const {chat,queue,setQueue,lang,setLang,say,faqs}=useApp(),[v,setV]=useState(''),box=useRef();
  useEffect(()=>{if(box.current)box.current.scrollTop=box.current.scrollHeight},[chat]);
  const send=()=>{say(v);setV('')};
  return <><h2>Support Chat</h2><p className="sub">Answers come from {BIZ.name}'s own FAQs, products and orders. Refunds and complaints go to a human.</p>
  <div className="row" style={{marginBottom:12}}><span className="mute">Language</span><div className="seg">{[['en','English'],['hi','हिन्दी'],['gu','ગુજરાતી']].map(([k,n])=><button key={k} className={lang===k?'on':''} onClick={()=>setLang(k)}>{n}</button>)}</div></div>
  <div className="split"><div className="card chatbox">
    <div className="chath"><span className="av">RS</span><div><b>{BIZ.name}</b><div className="mute">Support assistant</div></div></div>
    <div className="msgs" ref={box}>{chat.map((x,i)=><div key={i} className={'m '+x.c}>{x.t}{x.s&&<small>{SRC[x.s]}</small>}</div>)}</div>
    <div className="chips">{CHIPS[lang].map(c=><button key={c} className="chip" onClick={()=>say(c)}>{c}</button>)}</div>
    <div className="inp"><input value={v} onChange={e=>setV(e.target.value)} placeholder="Type a message" onKeyDown={e=>e.key==='Enter'&&send()}/><button className="btn" onClick={send}>Send</button></div></div>
  <div><div className="card"><span className="tag w">Human queue</span>{queue.length?queue.map((q,i)=><div className="qi" key={i}>{q.q}<br/><button className="btn s g" onClick={()=>setQueue(a=>a.filter((_,j)=>j!==i))}>Mark resolved</button></div>):<p className="mute">No cases waiting. Refunds and complaints appear here.</p>}</div>
  <div className="card" style={{marginTop:14}}><span className="tag">Trained on</span><p className="mute" style={{margin:0}}>{faqs.length} FAQs, {BIZ.products.length} products and {BIZ.orders.length} orders. <Link href="/knowledge" style={{color:'var(--acc)'}}>View or add data</Link></p></div></div></div></>
}
