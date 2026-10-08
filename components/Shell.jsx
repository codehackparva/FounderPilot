"use client";
import Link from 'next/link';import {usePathname} from 'next/navigation';import {useState} from 'react';
import Icon from './Icon';import {useApp} from './Store';import {BIZ} from '@/lib/data';
import AIPopup from './AIPopup';

const NAME={'':'Home',chat:'Support Chat',content:'Content Studio',insights:'Insights',scheduler:'Scheduler',inventory:'Inventory',knowledge:'Business Data',pricing:'Pricing',about:'About the project'};
const GR=[['',['']],['Workspace',['chat','content','insights','scheduler','inventory','knowledge']],['Company',['pricing','about']]];
const TABS=['','chat','content','insights'],MORE=['scheduler','inventory','knowledge','pricing','about'];
export default function Shell({children}){
  const {theme,toggleTheme,mini,toggleMini,queue,pend}=useApp(),cur=usePathname().split('/')[1]||'',[sheet,setSheet]=useState(false);
  const n=k=>k==='chat'?queue.length:k==='content'?pend.length:0,ic=k=>k===''?'home':k,dk=theme==='dark';
  const Bd=({k})=>n(k)?<em className="bd">{n(k)}</em>:null;
  return <>
  <header className="top"><div className="logo">Founder<b>Pilot</b></div><button className="tgl2" onClick={toggleTheme} aria-label="Switch theme"><Icon k={dk?'sun':'moon'}/></button></header>
  <div className="app">
    <nav className={'side'+(mini?' mini':'')}>
      <div className="brand"><div className="logo"><span className="lf">Founder<b>Pilot</b></span><span className="lm">F<b>P</b></span></div>
        <button className="tg" onClick={toggleMini} title={(mini?'Expand':'Collapse')+' menu ( [ )'} aria-label="Toggle menu"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button></div>
      {GR.map(([g,ks])=><div key={g}>{g&&<div className="grp">{g}</div>}{ks.map(k=><Link key={k} href={'/'+k} title={NAME[k]} className={k===cur?'on':''}><Icon k={ic(k)}/><span>{NAME[k]}</span><Bd k={k}/></Link>)}</div>)}
      <div className="sp"/><button className="tgl" onClick={toggleTheme} title="Switch theme"><Icon k={dk?'sun':'moon'}/><span>{dk?'Light mode':'Dark mode'}</span></button>
    </nav>
    <main><div className="pg">{children}</div>
      <footer className="ft"><div className="ftg">
        <div><div className="logo">Founder<b>Pilot</b></div><p>An AI workspace for small teams. A concept project built from six C2P canvases on AI in entrepreneurship.</p></div>
        <div><h4>Workspace</h4>{['chat','content','insights','scheduler','inventory'].map(k=><Link key={k} href={'/'+k}>{NAME[k]}</Link>)}</div>
        <div><h4>Project</h4>{['knowledge','pricing','about'].map(k=><Link key={k} href={'/'+k}>{NAME[k]}</Link>)}</div>
        <div><h4>Team</h4><p>Tonmay Gajjar<br/>Dave Parvaraj</p><p>C2P, Atmiya University, Rajkot</p></div></div>
        <div className="ftb"><span>© 2026 FounderPilot. Demo data for {BIZ.name}, no real customers.</span><span>Tip: press [ to collapse the menu</span></div></footer>
    </main>
  </div>
  <nav className="tabs">{TABS.map(k=><Link key={k} href={'/'+k} className={k===cur?'on':''}><Icon k={ic(k)} size={20}/><span>{k===''?'Home':k==='chat'?'Chat':k==='content'?'Content':NAME[k]}</span><Bd k={k}/></Link>)}
    <a href="#" className={TABS.includes(cur)?'':'on'} onClick={e=>{e.preventDefault();setSheet(s=>!s)}}><Icon k="more" size={20}/><span>More</span></a></nav>
  {sheet&&<div id="sheet" style={{display:'block'}}>{MORE.map(k=><Link key={k} href={'/'+k} className={k===cur?'on':''} onClick={()=>setSheet(false)}><Icon k={k}/><span>{NAME[k]}</span></Link>)}</div>}
  
  <AIPopup />
  </>
}
