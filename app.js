const WA='18090000000';
const PRODUCTS=[
{id:1,cat:'hogar',sku:'Hogar 01',img:'img/suavizante.jpg',name:'Suavizante Eliansa',spec:'Ropa suave · Aroma duradero',desc:'El favorito de la casa. Deja la ropa suave y oliendo rico.',price:null,tag:'EL FAVORITO',hot:1},
{id:2,cat:'hogar',sku:'Hogar 02',img:'img/suavizante-galon.jpg',name:'Suavizante Galón',spec:'Galón · Para el mes',desc:'Presentación grande para que no te falte en la semana.',price:null,tag:'',hot:0},
{id:3,cat:'hogar',sku:'Hogar 03',img:'img/suavizante-1l.jpg',name:'Suavizante 1 Litro',spec:'Botella 1L · Uso diario',desc:'Tamaño práctico para el hogar.',price:null,tag:'',hot:0},
{id:4,cat:'hogar',sku:'Hogar 04',img:'img/jabon-cama.jpg',name:'Jabón de Cama',spec:'Galón · Limpieza profunda',desc:'Para sábanas, cortinas y ropa de cama.',price:null,tag:'',hot:0},
{id:5,cat:'bano',sku:'Baño 01',img:'img/cloro.jpg',name:'Cloro Eliansa',spec:'Botella 1L · Desinfecta',desc:'Para baños, pisos y ropa blanca. No puede faltar.',price:null,tag:'',hot:0},
{id:6,cat:'desinf',sku:'Pisos 01',img:'img/desinfectante-lavanda.jpg',name:'Desinfectante Lavanda',spec:'Botella 1L · Aroma lavanda',desc:'Limpia, desinfecta y deja la casa oliendo rico por horas.',price:null,tag:'EL FAVORITO',hot:1},
{id:7,cat:'desinf',sku:'Pisos 02',img:'img/desinfectante-floral.jpg',name:'Desinfectante Floral 1.6L',spec:'1.6L · Bouquet floral',desc:'Fórmula concentrada de larga duración con aroma floral.',price:null,tag:'',hot:0},
{id:8,cat:'cocina',sku:'Cocina 01',img:'img/lavaplatos.jpg',name:'Jabón Lavaplatos 500ml',spec:'500ml · Aroma limón',desc:'Fórmula concentrada de alto rendimiento. Corta la grasa.',price:null,tag:'MUY PEDIDO',hot:1},
{id:9,cat:'barberia',sku:'Barb 01',img:'img/alcohol-mentolado.jpg',name:'Alcohol Mentolado Barbería',spec:'Spray · Efecto refrescante',desc:'Limpia y protege. Ideal para después del afeitado.',price:null,tag:'',hot:0},
{id:10,cat:'barberia',sku:'Barb 02',img:'img/crema-afeitar.jpg',name:'Crema de Afeitar Mentolada 16oz',spec:'16oz · Aloe vera y mentol',desc:'Suavidad y protección. Hidrata, refresca y evita irritaciones.',price:null,tag:'USO PROFESIONAL',hot:0},
{id:11,cat:'auto',sku:'Auto 01',img:'img/coolant.jpg',name:'Coolant Regular',spec:'Galón · Automotriz',desc:'Refrigerante para el radiador de tu vehículo.',price:null,tag:'',hot:0},
];
const CATS={hogar:'Hogar',cocina:'Cocina',bano:'Baños',desinf:'Desinfectantes',barberia:'Barbería',auto:'Automotriz'};
let cart=[];try{cart=JSON.parse(localStorage.getItem('nc-cart')||'[]');}catch(e){cart=[];}
let curFilter='todos',curSearch='',curSort='rel';
const fmt=n=>'RD$'+n.toLocaleString('es-DO');
function waLink(msg){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(msg);}
function save(){try{localStorage.setItem('nc-cart',JSON.stringify(cart));}catch(e){}updateBadge();}
function updateBadge(){const c=cart.reduce((a,i)=>a+i.qty,0);document.getElementById('count').textContent=c;document.getElementById('count2').textContent=c+(c===1?' ítem':' ítems');
const tot=cart.reduce((a,i)=>a+i.qty*(i.price||0),0);
document.getElementById('total').textContent=tot>0?fmt(tot):'A consultar';
const sm=document.getElementById('shipMsg');sm.textContent=cart.length?'Envíos disponibles · lo coordinamos por WhatsApp':'Arma tu pedido y envíalo por WhatsApp';renderCartItems();}
function renderCartItems(){const box=document.getElementById('items');if(!cart.length){box.innerHTML='<p style="color:var(--muted);text-align:center;margin-top:24px;font-size:.9rem">Tu carrito está vacío.<br>Agrega productos del catálogo.</p>';return;}
box.innerHTML=cart.map((i,idx)=>{const img=i.img?`<img src="${i.img}" onerror="this.remove()" alt="">`:'';return `<div class="ci">${img}<div class="inf"><b>${i.name}</b><small>${i.price!=null?fmt(i.price)+' c/u':'Precio a consultar'}</small></div><div class="qty"><button onclick="chQty(${idx},-1)">−</button><b>${i.qty}</b><button onclick="chQty(${idx},1)">+</button></div></div>`;}).join('');}
function chQty(idx,d){cart[idx].qty+=d;if(cart[idx].qty<=0)cart.splice(idx,1);save();}
function clearCart(){cart=[];save();toast('Carrito vaciado');}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);const f=cart.find(x=>x.id===id);if(f)f.qty++;else cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty:1});save();toast('Agregado al pedido');}
function askPrice(id){const p=PRODUCTS.find(x=>x.id===id);window.open(waLink('Hola Eliansa, ¿qué precio tiene '+p.name+' ('+p.spec+')?'),'_blank');}
function comboQuote(name){window.open(waLink('Hola Eliansa, me interesa el '+name+'. ¿Qué precio tiene?'),'_blank');}
function toggleCart(force){const c=document.getElementById('cart'),o=document.getElementById('overlay');const open=typeof force==='boolean'?force:!c.classList.contains('open');c.classList.toggle('open',open);o.classList.toggle('show',open);}
function checkout(){if(!cart.length){toast('Agrega productos primero');return;}const tot=cart.reduce((a,i)=>a+i.qty*(i.price||0),0);const lines=cart.map(i=>`• ${i.qty}x ${i.name}${i.price!=null?' - '+fmt(i.price*i.qty):' (precio a consultar)'}`).join('\n');const msg=`Hola Eliansa, quiero hacer este pedido:\n${lines}${tot>0?'\nTotal: '+fmt(tot):''}\nMi nombre es: `;window.open(waLink(msg),'_blank');}
function filterCat(c){curFilter=c;document.querySelectorAll('#filters .f').forEach(b=>b.classList.toggle('active',b.dataset.f===c));render();if(c!=='todos'){const el=document.getElementById('catalogo');if(el)el.scrollIntoView({behavior:'smooth'});}}
function onSearch(v){curSearch=v.toLowerCase();render();}
function onSort(v){curSort=v;render();}
function priceBlock(p){if(p.price!=null)return `<div class="price"><strong>${fmt(p.price)}</strong>${p.old?`<s>${fmt(p.old)}</s>`:''}</div><div class="card-actions"><button class="btn-primary" onclick="addToCart(${p.id})">Agregar</button><button class="ficha" onclick="openFicha(${p.id})">Ver</button></div>`;
return `<div class="price"><strong>Consultar precio</strong></div><div class="card-actions"><button class="btn-primary" onclick="askPrice(${p.id})">Consultar</button><button class="ficha" onclick="openFicha(${p.id})">Ver</button></div>`;}
function render(){const g=document.getElementById('grid');if(!g)return;
let list=PRODUCTS.filter(p=>(curFilter==='todos'||p.cat===curFilter)&&((p.name+' '+p.sku+' '+(p.desc||'')).toLowerCase().includes(curSearch)));
if(curSort==='asc')list=[...list].sort((a,b)=>(a.price||1e12)-(b.price||1e12));if(curSort==='desc')list=[...list].sort((a,b)=>(b.price||-1)-(a.price||-1));
if(!list.length){g.innerHTML='<p style="color:var(--muted)">No encontramos eso. Prueba con “cloro” o “suavizante”.</p>';return;}
g.innerHTML=list.map(p=>`<div class="card"><div class="card-img"><img loading="lazy" src="${p.img}" alt="${p.name}" onerror="this.remove()">${p.tag?`<span class="card-badge${p.hot?' hot':''}">${p.tag}</span>`:''}</div>
<div class="card-body"><span class="sku">${p.sku} · ${CATS[p.cat]||''}</span><h3>${p.name}</h3><span class="spec">${p.spec}</span><p class="desc">${p.desc}</p>
${priceBlock(p)}</div></div>`).join('');}
function openFicha(id){const p=PRODUCTS.find(x=>x.id===id);const m=document.getElementById('modal');document.getElementById('modalCard').innerHTML=`<span class="sku">${p.sku} · ${CATS[p.cat]||''}</span><h3>${p.name}</h3><p style="color:var(--muted);font-size:.9rem">${p.desc}</p>
<table><tr><th>Detalle</th><th>Info</th></tr><tr><td><strong>Presentación</strong></td><td>${p.spec}</td></tr><tr><td><strong>Precio</strong></td><td>${p.price!=null?fmt(p.price):'A consultar por WhatsApp'}</td></tr><tr><td><strong>Entrega</strong></td><td>Envíos disponibles</td></tr></table>
<div style="display:flex;gap:10px;margin-top:12px">${p.price!=null?`<button class="btn-primary" style="flex:1;justify-content:center" onclick="addToCart(${p.id});closeModal()">Agregar al pedido</button>`:`<button class="btn-primary" style="flex:1;justify-content:center" onclick="askPrice(${p.id})">Consultar por WhatsApp</button>`}<button class="ficha" onclick="closeModal()">Cerrar</button></div>`;
m.classList.add('open');}
function closeModal(){document.getElementById('modal').classList.remove('open');}
let toastT;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);}
document.addEventListener('DOMContentLoaded',()=>{render();updateBadge();document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();toggleCart(false);}});});
