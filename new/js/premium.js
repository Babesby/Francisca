const menuBtn=document.querySelector('[data-menu]'),drawer=document.querySelector('.mobile-drawer');if(menuBtn&&drawer)menuBtn.onclick=()=>drawer.classList.toggle('open');
const CART_KEY='odos_cart_v1';
const products={
  'heritage-one-shoulder':{id:'heritage-one-shoulder',name:'Heritage One-Shoulder Dress',price:165,image:'shop/look-14.jpg'},
  'signature-wrap':{id:'signature-wrap',name:'Signature Print Wrap Dress',price:175,image:'shop/look-34.jpg'},
  'celebration-dress':{id:'celebration-dress',name:'Celebration Print Dress',price:185,image:'shop/look-74.jpg'},
  'heritage-set':{id:'heritage-set',name:'Heritage Occasion Set',price:195,image:'shop/look-44.jpg'},
  'statement-look':{id:'statement-look',name:'Statement Ankara Look',price:180,image:'shop/look-54.jpg'},
  'custom-odo':{id:'custom-odo',name:"Odo's Custom Occasion Look",price:220,image:'shop/look-64.jpg'}
};
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{return[]}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));renderCart()}
function addToCart(id){const c=getCart(),x=c.find(i=>i.id===id);if(x)x.qty++;else c.push({id,qty:1});saveCart(c);openCart()}
function removeFromCart(id){saveCart(getCart().filter(i=>i.id!==id))}
function changeQty(id,d){const c=getCart();const x=c.find(i=>i.id===id);if(!x)return;x.qty=Math.max(1,x.qty+d);saveCart(c)}
function openCart(){document.querySelector('.cart-drawer')?.classList.add('open')}
function closeCart(){document.querySelector('.cart-drawer')?.classList.remove('open')}
function renderCart(){const c=getCart(),body=document.querySelector('.cart-body'),count=document.querySelector('[data-cart-count]'),total=c.reduce((s,i)=>s+(products[i.id]?.price||0)*i.qty,0);if(count)count.textContent=c.reduce((s,i)=>s+i.qty,0);if(body)body.innerHTML=c.length?c.map(i=>{const p=products[i.id];return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><div class="muted">$${p.price.toFixed(2)}</div><div style="margin-top:7px"><button onclick="changeQty('${i.id}',-1)">−</button> ${i.qty} <button onclick="changeQty('${i.id}',1)">+</button></div></div><button aria-label="Remove" onclick="removeFromCart('${i.id}')">×</button></div>`}).join(''):'<p class="muted">Your bag is empty.</p>';document.querySelectorAll('[data-cart-total]').forEach(el=>el.textContent='$'+total.toFixed(2))}
async function stripeCheckout(){const items=getCart();if(!items.length)return alert('Your bag is empty.');try{const r=await fetch('/api/create-checkout-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Checkout unavailable');location.href=d.url}catch(e){alert(e.message+'\n\nAdd STRIPE_SECRET_KEY and SITE_URL in your deployment environment.') }}
async function paypalCheckout(){const items=getCart();if(!items.length)return alert('Your bag is empty.');try{const r=await fetch('/api/paypal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items})});const d=await r.json();if(!r.ok)throw new Error(d.error||'PayPal unavailable');const link=d.links?.find(x=>x.rel==='approve')?.href;if(link)location.href=link;else throw new Error('PayPal approval link not returned.')}catch(e){alert(e.message+'\n\nAdd PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in your deployment environment.')}}
window.addToCart=addToCart;window.removeFromCart=removeFromCart;window.changeQty=changeQty;window.openCart=openCart;window.closeCart=closeCart;window.stripeCheckout=stripeCheckout;window.paypalCheckout=paypalCheckout;document.addEventListener('DOMContentLoaded',renderCart);
