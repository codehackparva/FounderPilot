"use client";
import {useApp} from '@/components/Store';
export default function Inventory(){
  const {inv,setInv}=useApp();
  return <><h2>Inventory</h2><p className="sub">Change the stock numbers and watch days left and reorder alerts update. Sample data.</p>
  <div className="card" style={{overflowX:'auto'}}><table><thead><tr><th>Product</th><th>In stock</th><th>Sold / day</th><th>Days left</th><th>Status</th></tr></thead><tbody>{inv.map((x,i)=>{const dl=x.r?x.s/x.r:99,low=dl<7,need=Math.max(0,Math.ceil(x.r*14-x.s));return <tr key={x.n}><td>{x.n}</td><td><input type="number" min="0" value={x.s} style={{width:80}} onChange={e=>setInv(a=>a.map((z,j)=>j===i?{...z,s:Math.max(0,+e.target.value||0)}:z))}/></td><td>{x.r}</td><td>{dl.toFixed(1)}</td><td><span className={'tag '+(low?'w':'o')}>{low?'Reorder '+need:'OK'}</span></td></tr>})}</tbody></table>
  <p className="mute">Alert when less than 7 days of stock remain. Suggested reorder covers 14 days of sales.</p></div></>
}
