"use client";
import {useState} from 'react';import Link from 'next/link';import {useApp} from '@/components/Store';import {BIZ} from '@/lib/data';
export default function Knowledge(){
  const {faqs,setFaqs}=useApp(),[q,setQ]=useState(''),[a,setA]=useState('');
  const add=()=>{if(!q.trim()||!a.trim())return;setFaqs(f=>[...f,{q:q.trim(),a:a.trim()}]);setQ('');setA('')};
  return <><h2>Business Data</h2><p className="sub">This is the demo data for {BIZ.name} that the assistant answers from. Add an FAQ here, then ask the same question in Support Chat.</p>
  <div className="grid" style={{marginBottom:16}}>{[['FAQs',faqs.length],['Products',BIZ.products.length],['Orders',BIZ.orders.length],['Months of sales',BIZ.sales.length]].map(([l,n])=><div className="card kpi" key={l}><span className="mute">{l}</span><b>{n}</b></div>)}</div>
  <div className="split"><div className="card"><h3>FAQs</h3>{faqs.map((f,i)=><div className="qi" key={i}><b>{f.q}</b><br/>{f.a} <a href="#" className="mute" style={{color:'var(--warn)'}} onClick={e=>{e.preventDefault();setFaqs(x=>x.filter((_,j)=>j!==i))}}>remove</a></div>)}
    <label>New question</label><input value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. Do you gift wrap?"/><label>Answer</label><textarea rows={2} value={a} onChange={e=>setA(e.target.value)} placeholder="e.g. Yes, gift wrapping is free on orders above ₹500."/>
    <p><button className="btn s" onClick={add}>Add to knowledge</button> <Link className="btn s g" href="/chat">Test in chat</Link></p></div>
  <div className="card" style={{overflowX:'auto'}}><h3>Orders</h3><table><thead><tr><th>ID</th><th>Item</th><th>Status</th></tr></thead><tbody>{BIZ.orders.map(o=><tr key={o.id}><td>{o.id}</td><td>{o.item}</td><td>{o.st}</td></tr>)}</tbody></table>
    <h3 style={{marginTop:18}}>Products</h3><table><thead><tr><th>Name</th><th>Price</th><th>Stock</th></tr></thead><tbody>{BIZ.products.map(p=><tr key={p.n}><td>{p.n}</td><td>₹{p.p}</td><td>{p.s}</td></tr>)}</tbody></table></div></div></>
}
