"use client";
import {useRef,useState} from 'react';import {useApp} from '@/components/Store';import {BIZ,T,TY,TN,LN,DAYS} from '@/lib/data';import {askAI} from '@/lib/ai';
export default function Content(){
  const {pend,setPend,setSched}=useApp(),[p,setP]=useState(0),[ty,setTy]=useState('caption'),[to,setTo]=useState('friendly'),[lg,setLg]=useState('en'),[out,setOut]=useState(''),[src,setSrc]=useState(''),[d,setD]=useState(0),n=useRef(0);
  const gen=async()=>{const o=BIZ.products[p];setOut('Writing...');
    const a=await askAI(`Write one ${TY[ty]} for a small business in a ${TN[to]} tone, in ${LN[lg]}. Use only these facts and invent no prices, discounts or claims.\nBusiness: ${BIZ.name}, ${BIZ.city}. ${BIZ.about}\nBrand voice: ${BIZ.voice}\nProduct: ${JSON.stringify(o)}\nOutput only the final text, no quotes, at most 60 words.`);
    if(a){setOut(a);setSrc('Written by AI from your product data and brand voice.')}else{const l=T[ty][to];setOut(l[n.current++%l.length](o));setSrc('Template filled from your product data. AI is not connected (add ANTHROPIC_API_KEY), and non-English output needs AI.')}};
  const send=()=>{if(!out.trim())return;setPend(a=>[...a,{t:out,d}]);setOut('')};
  const approve=i=>{setSched(s=>[...s,{d:pend[i].d,t:pend[i].t,s:'Scheduled'}]);setPend(a=>a.filter((_,j)=>j!==i))};
  const Sel=({v,set,o})=><select value={v} onChange={e=>set(e.target.value)}>{o.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select>;
  return <><h2>Content Studio</h2><p className="sub">Drafts are written from {BIZ.name}'s product data and brand voice. Edit, then send for approval.</p>
  <div className="split"><div className="card"><label>Product</label><select value={p} onChange={e=>setP(+e.target.value)}>{BIZ.products.map((x,i)=><option key={i} value={i}>{x.n} (₹{x.p})</option>)}</select>
    <div className="row"><div style={{flex:1,minWidth:120}}><label>Type</label><Sel v={ty} set={setTy} o={[['caption','Instagram caption'],['ad','Ad copy'],['blog','Blog intro']]}/></div><div style={{flex:1,minWidth:120}}><label>Tone</label><Sel v={to} set={setTo} o={[['friendly','Friendly'],['bold','Bold'],['pro','Professional']]}/></div><div style={{flex:1,minWidth:120}}><label>Language</label><Sel v={lg} set={setLg} o={[['en','English'],['hi','Hindi'],['gu','Gujarati']]}/></div></div>
    <p><button className="btn" onClick={gen}>Generate draft</button></p><label>Draft (edit before sending)</label><textarea rows={5} value={out} onChange={e=>setOut(e.target.value)} placeholder="Your draft appears here"/><p className="mute" style={{margin:'4px 0 0'}}>{src}</p>
    <div className="row" style={{marginTop:10}}><select style={{width:'auto'}} value={d} onChange={e=>setD(+e.target.value)}>{DAYS.map((x,i)=><option key={x} value={i}>{x}</option>)}</select><button className="btn g" onClick={send}>Send for approval</button></div>
    <p className="mute" style={{margin:'14px 0 0'}}>Brand voice: {BIZ.voice}</p></div>
  <div className="card"><span className="tag w">Approval queue</span>{pend.length?pend.map((x,i)=><div className="qi" key={i}>{x.t}<div className="mute">Planned: {DAYS[x.d]}</div><div className="row"><button className="btn s" onClick={()=>approve(i)}>Approve</button><button className="btn s g" onClick={()=>setPend(a=>a.filter((_,j)=>j!==i))}>Reject</button></div></div>):<p className="mute">Nothing waiting for approval.</p>}</div></div></>
}
