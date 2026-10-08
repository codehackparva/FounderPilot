import {BIZ,R,ESC,tok,MN} from './data';
export function ground(q,ctx){q=q.replace(/\bcod\b/ig,'cash on delivery');const m=q.match(/ord-?\s?(\d{4})/i);
 if(m){const o=ctx.orders.find(x=>x.id==='ORD-'+m[1]);return{t:o?`${o.id} (${o.item}) is ${o.st.toLowerCase()}, ${o.eta}.`:`I could not find ORD-${m[1]}. Please check the number.`}}
 const w=tok(q),pr=ctx.products.find(p=>w.some(x=>p.n.toLowerCase().includes(x)));
 if(pr&&/price|cost|stock|available|how much|₹|કિંમત|कीमत/i.test(q))return{t:`${pr.n} is ₹${pr.p}. ${pr.s>0?pr.s+' in stock.':'Currently out of stock.'} ${pr.tag}.`};
 let best=null,bs=0;ctx.faqs.forEach(f=>{const qt=tok(f.q),at=tok(f.a),hit=(l,x)=>l.some(y=>y.slice(0,4)===x.slice(0,4)),sc=w.reduce((a,x)=>a+(hit(qt,x)?2:hit(at,x)?1:0),0);if(sc>bs){bs=sc;best=f}});
 if(best)return{t:best.a};
 if(/order|track/i.test(q))return{t:'Please share your order number, for example ORD-1042, and I will check it.'};return null}

export function localReply(t,lang,ctx){if(ESC.test(t))return{t:R[lang].esc,s:'esc'};const g=ground(t,ctx);return g?{t:g.t,s:'kb'}:{t:R[lang].d,s:'none'}}
export function fc(y){const n=y.length,mx=(n-1)/2,my=y.reduce((a,b)=>a+b)/n;let nu=0,de=0;y.forEach((v,i)=>{nu+=(i-mx)*(v-my);de+=(i-mx)**2});const s=nu/de,b=my-s*mx;return[0,1,2].map(k=>Math.round(b+s*(n+k)))}
export const dLeft=inv=>inv.map(x=>({n:x.n,d:x.r?x.s/x.r:99,s:x.s,r:x.r}));
export function localAdvice(q,budget,inv){const y=BIZ.sales,CH=BIZ.ch,f=fc(y),tot=CH.reduce((a,c)=>a+c[1],0),top=[...CH].sort((a,b)=>b[1]-a[1])[0],low=dLeft(inv).filter(x=>x.d<7);
 if(/budget|spend|\bads?\b|channel|marketing/i.test(q))return`Put the most into ${top[0]} (₹${top[1]} back per ₹1 in the data): about ₹${Math.round(budget*top[1]/tot).toLocaleString('en-IN')} of ₹${budget.toLocaleString('en-IN')}. ${CH[CH.length-1][0]} returns the least, so keep it small.`;
 if(/stock|restock|reorder|inventory/i.test(q))return low.length?`Reorder soon: ${low.map(x=>`${x.n} (${x.d.toFixed(1)} days left)`).join(', ')}.`:'No product is below 7 days of stock right now.';
 if(/dip|drop|fall|down|why/i.test(q)){const i=y.findIndex((v,k)=>k&&v<y[k-1]);return i>0?`The data shows a dip in ${MN[i]}: ₹${y[i]}k after ₹${y[i-1]}k. It records no cause, so check what ran that month before drawing conclusions.`:'Sales rose every month in this data.'}
 return`Sales grew from ₹${y[0]}k to ₹${y[11]}k over 12 months. The trend forecast for next month is ₹${f[0]}k.`}
