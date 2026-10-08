export async function POST(req){
  const {prompt}=await req.json();const key=process.env.ANTHROPIC_API_KEY;
  if(!key)return Response.json({error:'no key'},{status:503});
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},
    body:JSON.stringify({model:process.env.ANTHROPIC_MODEL||'claude-sonnet-5-5',max_tokens:400,messages:[{role:'user',content:String(prompt).slice(0,12000)}]})});
  if(!r.ok)return Response.json({error:'upstream'},{status:502});
  const j=await r.json();return Response.json({text:(j.content||[]).map(b=>b.text||'').join('')});
}
