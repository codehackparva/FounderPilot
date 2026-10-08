"use client";
import {useState} from 'react';import {useApp} from '@/components/Store';import {BIZ,MN} from '@/lib/data';import {fc,dLeft,localAdvice} from '@/lib/logic';import {askAI} from '@/lib/ai';
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
export default function Insights(){
  const {inv}=useApp(),[b,setB]=useState(50000),[q,setQ]=useState(''),[ans,setAns]=useState(''),[src,setSrc]=useState('');
  const y=BIZ.sales,CH=BIZ.ch,f=fc(y),all=[...y,...f],mx=Math.max(...all)*1.1,M=[...MN,'Oct','Nov','Dec'],tot=CH.reduce((a,c)=>a+c[1],0),g=((y[11]/y[0])**(1/11)-1)*100;
  const ask=async t=>{t=(t||q).trim();if(!t)return;setQ(t);setAns('Thinking...');setSrc('');
    const a=await askAI(`You are a business advisor for ${BIZ.name}. Answer in at most 3 short sentences using only this data, and say so when the data cannot answer.\nMonthly sales in ₹ thousand, oldest first (${MN.join(',')}): ${JSON.stringify(y)}\nTrend forecast for next 3 months: ${JSON.stringify(f)}\nAd channels and return per ₹1: ${JSON.stringify(CH)}\nMonthly ad budget: ₹${b}\nStock: ${JSON.stringify(dLeft(inv).map(x=>({product:x.n,inStock:x.s,soldPerDay:x.r,daysLeft:+x.d.toFixed(1)})))}\nQuestion: ${t}`);
    setAns(a||localAdvice(t,b,inv));setSrc(a?'AI answer, grounded in your data':'Basic rules applied to your data (AI not connected)')};
  return <><h2>Insights</h2><p className="sub">Sales trend, a simple forecast and a recommendation for where to spend your ad budget. Demo data: replace with your CRM numbers.</p>
  <div className="grid"><div className="card kpi"><span className="mute">Last month sales</span><b>₹{y[11]}k</b></div><div className="card kpi"><span className="mute">Avg monthly growth</span><b>{g.toFixed(1)}%</b></div><div className="card kpi"><span className="mute">Forecast next month</span><b style={{color:'var(--acc)'}}>₹{f[0]}k</b></div></div>
  <div className="card" style={{marginTop:14,overflowX:'auto'}}><h3>Sales (₹ thousand): actual vs forecast</h3>
    <svg viewBox="0 0 640 215" style={{minWidth:560,width:'100%'}}>{all.map((v,i)=>{const h=v/mx*170,x=20+i*40;return <g key={i}><rect x={x} y={190-h} width="26" height={h} rx="4" fill={i<12?'var(--acc)':'var(--gold)'}/><text x={x+13} y="206" fontSize="10" textAnchor="middle" fill="var(--mute)">{M[i]}</text></g>})}</svg>
    <p className="mute" style={{margin:0}}>Green: last 12 months. Gold: linear-trend forecast for 3 months. A forecast is a guess, so check it before big decisions.</p></div>
  <div className="card" style={{marginTop:14}}><h3>Where should I spend my ad budget?</h3><label>Monthly budget: <b>{inr(b)}</b></label><input type="range" min="10000" max="200000" step="5000" value={b} onChange={e=>setB(+e.target.value)}/>
    <table style={{marginTop:8}}><thead><tr><th>Channel</th><th>Return per ₹1</th><th>Suggested spend</th><th/></tr></thead><tbody>{CH.map(([n,r])=><tr key={n}><td>{n}</td><td>{r}x</td><td>{inr(b*r/tot)}</td><td style={{width:'35%'}}><div className="bar"><i style={{width:r/tot*100+'%'}}/></div></td></tr>)}</tbody></table>
    <p>Expected return: <b>{inr(CH.reduce((a,[,r])=>a+b*r/tot*r,0))}</b> <span className="mute">(based on sample channel returns, not real results)</span></p></div>
  <div className="card" style={{marginTop:14}}><h3>Ask your data</h3><div className="row" style={{margin:'8px 0'}}>{['Where should I spend my budget?','Which product needs restocking?','Why did sales dip?'].map(c=><button key={c} className="chip" onClick={()=>ask(c)}>{c}</button>)}</div>
    <div className="row"><input style={{flex:1,minWidth:200}} value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about sales, ads or stock" onKeyDown={e=>e.key==='Enter'&&ask()}/><button className="btn" onClick={()=>ask()}>Ask</button></div>
    <p style={{margin:'12px 0 2px'}}>{ans}</p><p className="mute" style={{margin:0}}>{src}</p></div></>
}
