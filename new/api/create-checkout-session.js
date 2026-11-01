import Stripe from 'stripe';
import {catalog} from './catalog.js';
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.STRIPE_SECRET_KEY)return res.status(500).json({error:'Stripe is not configured'});
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
  const items=(req.body?.items||[]).filter(i=>catalog[i.id]);
  if(!items.length)return res.status(400).json({error:'No valid items'});
  const session=await stripe.checkout.sessions.create({mode:'payment',line_items:items.map(i=>({quantity:Math.max(1,Number(i.qty)||1),price_data:{currency:(process.env.STORE_CURRENCY||'usd').toLowerCase(),unit_amount:catalog[i.id].amount,product_data:{name:catalog[i.id].name}}})),success_url:`${process.env.SITE_URL}/shop.html?checkout=success`,cancel_url:`${process.env.SITE_URL}/shop.html?checkout=cancelled`,shipping_address_collection:{allowed_countries:['US','GB','GH','CA']}});
  res.status(200).json({url:session.url});
}
