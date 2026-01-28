const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data', 'community.json');

function read(){ try{ return JSON.parse(fs.readFileSync(DATA,'utf8')) }catch(e){ return [] } }
function write(d){ fs.writeFileSync(DATA, JSON.stringify(d,null,2),'utf8') }

function checkAuth(req){
  const h = req.headers['authorization'] || '';
  const token = h.replace('Bearer ','');
  return token && (token === (process.env.ADMIN_TOKEN || 'ADMIN_SESSION_TOKEN'));
}

module.exports = (req,res) => {
  if(req.method === 'GET'){
    return res.status(200).json(read());
  }
  if(req.method === 'POST'){
    let body=''; req.on('data',c=>body+=c); req.on('end',()=>{
      try{
        const { name, phone, note } = JSON.parse(body||'{}');
        const list = read();
        const item = { id: Date.now(), name, phone, note, approved:false };
        list.push(item); write(list); return res.status(201).json(item);
      }catch(e){ return res.status(400).json({message:'Bad Request'}) }
    });
    return;
  }
  if(req.method === 'PUT'){
    if(!checkAuth(req)) return res.status(401).json({message:'Unauthorized'});
    let body=''; req.on('data',c=>body+=c); req.on('end',()=>{
      try{
        const { id, approved } = JSON.parse(body||'{}');
        const list = read();
        const idx = list.findIndex(x=>String(x.id)===String(id));
        if(idx===-1) return res.status(404).json({message:'Not found'});
        list[idx].approved = !!approved; write(list); return res.status(200).json(list[idx]);
      }catch(e){ return res.status(400).json({message:'Bad Request'}) }
    });
    return;
  }
  res.status(405).json({message:'Method Not Allowed'});
}
