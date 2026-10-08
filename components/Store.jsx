"use client";
import {createContext,useContext,useEffect,useState} from 'react';
import {BIZ,R,ESC,LN,SCHED0} from '@/lib/data';
import {localReply} from '@/lib/logic';
import {askAI} from '@/lib/ai';
const Ctx=createContext(null);export const useApp=()=>useContext(Ctx);
export default function Store({children}){
  const [theme,setTheme]=useState('light'),[mini,setMini]=useState(false),[lang,setLang0]=useState('en');
  const [chat,setChat]=useState([{c:'b',t:R.en.hi}]),[queue,setQueue]=useState([]),[busy,setBusy]=useState(false);
  const [pend,setPend]=useState([]),[sched,setSched]=useState(SCHED0),[faqs,setFaqs]=useState(BIZ.faqs);
  const [inv,setInv]=useState(BIZ.products.map(p=>({n:p.n,s:p.s,r:p.r})));
  useEffect(()=>{try{setTheme(localStorage.getItem('fp_theme')==='dark'?'dark':'light');setMini(localStorage.getItem('fp_mini')==='1')}catch{}},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme},[theme]);
  const toggleTheme=()=>setTheme(t=>{const n=t==='dark'?'light':'dark';try{localStorage.setItem('fp_theme',n)}catch{}return n});
  const toggleMini=()=>setMini(m=>{try{localStorage.setItem('fp_mini',m?'0':'1')}catch{}return !m});
  useEffect(()=>{const k=e=>{if(e.key==='['&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName))toggleMini()};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
  const setLang=l=>{setLang0(l);setChat([{c:'b',t:R[l].hi}])};
  const say=async t=>{t=(t||'').trim();if(!t||busy)return;const hot=ESC.test(t),hist=[...chat,{c:'u',t}];setChat([...hist,{c:'b',t:'...'}]);if(hot)setQueue(q=>[...q,{q:t}]);setBusy(true);
    const ctx={faqs,products:BIZ.products,orders:BIZ.orders};
    const a=await askAI(`You are the customer support assistant for ${BIZ.name}. Reply in ${LN[lang]}, in 1 to 3 short sentences, using ONLY the data below. If the answer is not in the data, say you will ask the team. If the customer demands a refund, complains, threatens legal action or is angry, politely say a team member will follow up personally. Voice: ${BIZ.voice}\nDATA: ${JSON.stringify({business:BIZ.name,city:BIZ.city,about:BIZ.about,products:BIZ.products,faqs,orders:BIZ.orders})}\n\nConversation:\n${hist.slice(-8).map(x=>(x.c==='u'?'Customer: ':'Assistant: ')+x.t).join('\n')}\nAssistant:`);
    const r=a?{t:a,s:hot?'esc':'ai'}:localReply(t,lang,ctx);
    setChat([...hist,{c:r.s==='esc'?'h':'b',t:r.t,s:r.s}]);setBusy(false)};
  return <Ctx.Provider value={{theme,toggleTheme,mini,toggleMini,lang,setLang,chat,say,busy,queue,setQueue,pend,setPend,sched,setSched,faqs,setFaqs,inv,setInv}}>{children}</Ctx.Provider>
}
