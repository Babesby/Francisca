import Stripe from 'stripe';
import {catalog} from './catalog.js';
export default async function handler(req,res){
  try{
    if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
    if(!process.env.STRIPE_SECRET_KEY||!process.env.SITE_URL)return res.status(500).json({error:'Stripe is not configured'});
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const items=(req.body?.items||[]).filter(i=>catalog[i.id]).map(i=>({id:i.id,qty:Math.max(1,Math.min(10,Number(i.qty)||1))}));
    if(!items.length)return res.status(400).json({error:'No valid items'});
    const currency=(process.env.STORE_CURRENCY||'usd').toLowerCase();
    const session=await stripe.checkout.sessions.create({mode:'payment',line_items:items.map(i=>({quantity:i.qty,price_data:{currency,unit_amount:catalog[i.id].amount,product_data:{name:catalog[i.id].name}}})),success_url:`${process.env.SITE_URL}/checkout-success.html?provider=stripe&session_id={CHECKOUT_SESSION_ID}`,cancel_url:`${process.env.SITE_URL}/checkout.html?cancelled=1`,billing_address_collection:'required',shipping_address_collection:{allowed_countries:['US','GB','GH','CA','DE','FR','NL','BE','ES','IT','IE','AU','ZA','NG','KE','RW','ZM']},phone_number_collection:{enabled:true},metadata:{store:'Odos Kloset'}});
    res.status(200).json({url:session.url});
  }catch(e){res.status(500).json({error:e.message})}
}
