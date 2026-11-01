import Stripe from 'stripe';
export default async function handler(req,res){
  try{
    if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
    if(!process.env.STRIPE_SECRET_KEY)return res.status(500).json({error:'Stripe is not configured'});
    const id=req.query?.session_id; if(!id)return res.status(400).json({error:'Missing session id'});
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const session=await stripe.checkout.sessions.retrieve(id);
    res.status(200).json({paid:session.payment_status==='paid',payment_status:session.payment_status,customer_email:session.customer_details?.email||null});
  }catch(e){res.status(500).json({error:e.message})}
}
