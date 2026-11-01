export default async function handler(req,res){
  try{
    if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
    const token=process.env.INSTAGRAM_ACCESS_TOKEN;
    if(!token)return res.status(503).json({error:'Instagram feed is not configured'});
    const actor=process.env.INSTAGRAM_USER_ID||'me';
    const base=process.env.INSTAGRAM_API_BASE||'https://graph.instagram.com';
    const fields='id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const url=`${base}/${actor}/media?fields=${encodeURIComponent(fields)}&limit=12&access_token=${encodeURIComponent(token)}`;
    const r=await fetch(url); const d=await r.json();
    if(!r.ok)throw new Error(d.error?.message||'Instagram API request failed');
    const media=(d.data||[]).map(x=>({id:x.id,caption:x.caption||'',media_type:x.media_type,permalink:x.permalink,image:x.media_type==='VIDEO'?(x.thumbnail_url||x.media_url):x.media_url,timestamp:x.timestamp})).filter(x=>x.image);
    res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=86400');
    res.status(200).json({media});
  }catch(e){res.status(500).json({error:e.message})}
}
