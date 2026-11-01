const CART_KEY='odos_cart_v2';
const products={
  'sienna-flow-kaftan':{id:'sienna-flow-kaftan',name:"Sienna Flow Kaftan",price:148,image:'shop/sienna-flow-kaftan.webp'},
  'cobalt-grace-gown':{id:'cobalt-grace-gown',name:"Cobalt Grace Gown",price:185,image:'shop/cobalt-grace-gown.webp'},
  'scarlet-bloom-peplum':{id:'scarlet-bloom-peplum',name:"Scarlet Bloom Peplum Dress",price:210,image:'shop/scarlet-bloom-peplum.webp'},
  'ivory-petal-maxi':{id:'ivory-petal-maxi',name:"Ivory Petal Maxi",price:165,image:'shop/ivory-petal-maxi.webp'},
  'kente-muse-column':{id:'kente-muse-column',name:"Kente Muse Column Dress",price:225,image:'shop/kente-muse-column.webp'},
  'lime-noir-resort-kaftan':{id:'lime-noir-resort-kaftan',name:"Lime Noir Resort Kaftan",price:155,image:'shop/lime-noir-resort-kaftan.webp'},
  'sunset-mosaic-kaftan':{id:'sunset-mosaic-kaftan',name:"Sunset Mosaic Kaftan",price:158,image:'shop/sunset-mosaic-kaftan.webp'},
  'coral-lace-midi':{id:'coral-lace-midi',name:"Coral Lace Midi",price:195,image:'shop/coral-lace-midi.webp'},
  'ember-kente-corset':{id:'ember-kente-corset',name:"Ember Kente Corset Dress",price:215,image:'shop/ember-kente-corset.webp'},
  'harbour-botanical-maxi':{id:'harbour-botanical-maxi',name:"Harbour Botanical Maxi",price:168,image:'shop/harbour-botanical-maxi.webp'},
  'blue-garden-kimono-set':{id:'blue-garden-kimono-set',name:"Blue Garden Kimono Set",price:180,image:'shop/blue-garden-kimono-set.webp'},
  'sunset-silk-kimono-set':{id:'sunset-silk-kimono-set',name:"Sunset Silk Kimono Set",price:190,image:'shop/sunset-silk-kimono-set.webp'},
  'jade-polka-occasion':{id:'jade-polka-occasion',name:"Jade Polka Occasion Dress",price:205,image:'shop/jade-polka-occasion.webp'},
  'rose-garden-layered-set':{id:'rose-garden-layered-set',name:"Rose Garden Layered Set",price:198,image:'shop/rose-garden-layered-set.webp'},
  'ruby-kente-corset-gown':{id:'ruby-kente-corset-gown',name:"Ruby Kente Corset Gown",price:235,image:'shop/ruby-kente-corset-gown.webp'},
  'terracotta-heritage-dress':{id:'terracotta-heritage-dress',name:"Terracotta Heritage Dress",price:188,image:'shop/terracotta-heritage-dress.webp'},
  'ivory-bloom-statement':{id:'ivory-bloom-statement',name:"Ivory Bloom Statement Dress",price:220,image:'shop/ivory-bloom-statement.webp'},
  'ruby-ease-kaftan':{id:'ruby-ease-kaftan',name:"Ruby Ease Kaftan",price:150,image:'shop/ruby-ease-kaftan.webp'},
  'fuchsia-petal-dress':{id:'fuchsia-petal-dress',name:"Fuchsia Petal Dress",price:195,image:'shop/fuchsia-petal-dress.webp'}
};
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{return[]}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));renderCart();renderCheckout()}
function addToCart(id){const c=getCart(),x=c.find(i=>i.id===id);if(x)x.qty++;else c.push({id,qty:1});saveCart(c);openCart()}
function removeFromCart(id){saveCart(getCart().filter(i=>i.id!==id))}
function changeQty(id,d){const c=getCart(),x=c.find(i=>i.id===id);if(!x)return;x.qty=Math.max(1,x.qty+d);saveCart(c)}
function openCart(){document.querySelector('.cart-drawer')?.classList.add('open');document.querySelector('[data-cart-backdrop]')?.classList.add('open');document.body.classList.add('cart-open')}
function closeCart(){document.querySelector('.cart-drawer')?.classList.remove('open');document.querySelector('[data-cart-backdrop]')?.classList.remove('open');document.body.classList.remove('cart-open')}
function renderCart(){const c=getCart(),body=document.querySelector('.cart-body'),count=c.reduce((s,i)=>s+i.qty,0),total=c.reduce((s,i)=>s+(products[i.id]?.price||0)*i.qty,0);document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=count);document.querySelectorAll('[data-cart-total]').forEach(el=>el.textContent=money(total));if(body)body.innerHTML=c.length?c.map(i=>{const p=products[i.id];if(!p)return'';return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><small>${money(p.price)}</small><div class="qty-row"><button type="button" onclick="changeQty('${i.id}',-1)">−</button><span>${i.qty}</span><button type="button" onclick="changeQty('${i.id}',1)">+</button></div></div><button class="remove-btn" type="button" aria-label="Remove ${p.name}" onclick="removeFromCart('${i.id}')">×</button></div>`}).join(''):'<p class="muted">Your bag is empty.</p>'}
function renderCheckout(){const box=document.querySelector('[data-checkout-items]'),totalEl=document.querySelector('[data-checkout-total]');if(!box&&!totalEl)return;const c=getCart(),total=c.reduce((s,i)=>s+(products[i.id]?.price||0)*i.qty,0);if(box)box.innerHTML=c.length?c.map(i=>{const p=products[i.id];return p?`<div class="summary-item"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><br><small>Qty ${i.qty}</small></div><strong>${money(p.price*i.qty)}</strong></div>`:''}).join(''):'<p class="muted">Your bag is empty. <a class="btn-link" href="shop.html">Return to the shop</a></p>';if(totalEl)totalEl.textContent=money(total)}
async function stripeCheckout(){const items=getCart();if(!items.length)return alert('Your bag is empty.');try{const r=await fetch('/api/create-checkout-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Stripe checkout is unavailable');location.href=d.url}catch(e){alert(e.message+'\n\nAdd STRIPE_SECRET_KEY and SITE_URL to the deployment environment.')}}
async function paypalCheckout(){const items=getCart();if(!items.length)return alert('Your bag is empty.');try{const r=await fetch('/api/paypal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items})});const d=await r.json();if(!r.ok)throw new Error(d.error||'PayPal checkout is unavailable');const link=d.links?.find(x=>x.rel==='approve')?.href;if(!link)throw new Error('PayPal approval link was not returned');location.href=link}catch(e){alert(e.message+'\n\nAdd PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET and SITE_URL to the deployment environment.')}}
async function hydrateInstagram(){const feed=document.querySelector('[data-instagram-feed]');if(!feed)return;try{const r=await fetch('/api/instagram-feed');if(!r.ok)return;const d=await r.json();const media=(d.media||[]).filter(x=>x.image).slice(0,8);if(!media.length)return;feed.innerHTML=media.slice(0,6).map(x=>`<a href="${x.permalink}" target="_blank" rel="noopener" aria-label="View Odo's Kloset post on Instagram"><img src="${x.image}" alt="Odo's Kloset Instagram look"></a>`).join('')}catch(_){}}
async function resolvePaymentStatus(){const card=document.querySelector('[data-payment-status]');if(!card)return;const q=new URLSearchParams(location.search),provider=q.get('provider');const mark=card.querySelector('.status-mark'),h=card.querySelector('h2'),p=card.querySelector('p');try{if(provider==='paypal'){const token=q.get('token');if(!token)throw new Error('Missing PayPal order token');const r=await fetch('/api/paypal-capture-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({orderId:token})});const d=await r.json();if(!r.ok)throw new Error(d.error||'PayPal payment could not be captured');mark.textContent='✓';h.textContent='Payment received';p.textContent='Your Odo’s Kloset order has been confirmed. We will follow up with fulfilment details.';localStorage.removeItem(CART_KEY);renderCart();return}if(provider==='stripe'){const id=q.get('session_id');if(!id)throw new Error('Missing Stripe session');const r=await fetch('/api/verify-stripe-session?session_id='+encodeURIComponent(id));const d=await r.json();if(!r.ok||!d.paid)throw new Error(d.error||'Stripe payment is not confirmed');mark.textContent='✓';h.textContent='Payment received';p.textContent='Your Odo’s Kloset order has been confirmed. We will follow up with fulfilment details.';localStorage.removeItem(CART_KEY);renderCart();return}throw new Error('Unknown payment provider')}catch(e){mark.textContent='!';h.textContent='We could not confirm the payment';p.textContent=e.message+'. Please contact the store before attempting another payment.'}}
function initNav(){const btn=document.querySelector('[data-menu]'),drawer=document.querySelector('.mobile-drawer');if(!btn||!drawer)return;btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));drawer.classList.toggle('open',!open);document.body.classList.toggle('menu-open',!open)});drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{btn.setAttribute('aria-expanded','false');drawer.classList.remove('open');document.body.classList.remove('menu-open')}))}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();const btn=document.querySelector('[data-menu]'),drawer=document.querySelector('.mobile-drawer');btn?.setAttribute('aria-expanded','false');drawer?.classList.remove('open');document.body.classList.remove('menu-open')}});
document.addEventListener('DOMContentLoaded',()=>{initNav();renderCart();renderCheckout();hydrateInstagram();resolvePaymentStatus()});
Object.assign(window,{addToCart,removeFromCart,changeQty,openCart,closeCart,stripeCheckout,paypalCheckout});


function initTypewriter(){
  const el=document.querySelector('[data-typewriter]');
  if(!el)return;
  const full=el.textContent.trim();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const caret=el.parentElement?.querySelector('.type-caret');
  if(reduced){el.textContent=full;caret?.classList.add('done');return;}
  el.textContent='';
  let i=0;
  const tick=()=>{
    el.textContent=full.slice(0,i++);
    if(i<=full.length){setTimeout(tick,30)}else{setTimeout(()=>caret?.classList.add('done'),500)}
  };
  setTimeout(tick,180);
}
function initSectionReveal(){
  document.documentElement.classList.add('js');
  const sections=[...document.querySelectorAll('main > section')];
  if(!sections.length)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){sections.forEach(s=>s.classList.add('is-visible'));return;}
  sections.forEach((s,i)=>{s.classList.add('reveal-section');if(i===0)s.classList.add('is-visible')});
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -8% 0px'});
  sections.slice(1).forEach(s=>io.observe(s));
}
document.addEventListener('DOMContentLoaded',()=>{initSectionReveal();initTypewriter()});
