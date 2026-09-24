const IMG={
hogar:'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=70',
cocina:'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=70',
bano:'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=70',
pisos:'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=600&q=70',
industrial:'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=70',
higiene:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=70'};
const PRODUCTS=[
{id:1,cat:'hogar',sku:'Hogar 01',name:'Detergente Líquido Floral 3.8L',spec:'Galón 3.8L · Rinde mucho',desc:'Para ropa y limpieza general. Deja buen olor.',price:495,old:650,tag:'EL FAVORITO',hot:1},
{id:2,cat:'hogar',sku:'Hogar 02',name:'Suavizante Bebé 3.8L',spec:'Galón 3.8L · Olor suave',desc:'Ropa suave y con rico aroma.',price:425,old:540,tag:'',hot:0},
{id:3,cat:'cocina',sku:'Cocina 01',name:'Degreasante Limón 3.8L',spec:'Galón 3.8L · Quita grasa',desc:'Para estufas, hornos y campanas. Muy potente.',price:595,old:750,tag:'MUY PEDIDO',hot:1},
{id:4,cat:'cocina',sku:'Cocina 02',name:'Lavaplatos Concentrado 3.8L',spec:'Galón 3.8L · Rinde mucho',desc:'Un chorrito limpia un fregado completo.',price:395,old:480,tag:'',hot:0},
{id:5,cat:'bano',sku:'Baño 01',name:'Cloro Concentrado 3.8L',spec:'Galón 3.8L · Desinfecta',desc:'Para baños, pisos y ropa blanca.',price:295,old:380,tag:'',hot:0},
{id:6,cat:'bano',sku:'Baño 02',name:'Cloro Gel Antisarro 1L',spec:'1 litro con aplicador',desc:'Para inodoros y azulejos. Quita sarro y mal olor.',price:250,old:320,tag:'',hot:0},
{id:7,cat:'bano',sku:'Baño 03',name:'Limpiavidrios 1L',spec:'1 litro con atomizador',desc:'Vidrios y espejos sin marcas.',price:225,old:290,tag:'',hot:0},
{id:8,cat:'pisos',sku:'Pisos 01',name:'Desinfectante Lavanda 3.8L',spec:'Galón 3.8L · Buen olor',desc:'Limpia y deja la casa oliendo rico por horas.',price:450,old:580,tag:'EL FAVORITO',hot:1},
{id:9,cat:'pisos',sku:'Pisos 02',name:'Cera Autobrillante 3.8L',spec:'Galón 3.8L · Brillo sin pulir',desc:'Para cerámica y granito. Brillo bonito.',price:685,old:850,tag:'',hot:0},
{id:10,cat:'industrial',sku:'Granel 01',name:'Desinfectante Granel 5 Galones',spec:'Tanque 5 galones',desc:'Para negocios o varias casas. Pregunta por precio especial.',price:2850,old:3400,tag:'POR CANTIDAD',hot:0},
{id:11,cat:'industrial',sku:'Granel 02',name:'Desengrasante Fuerte 3.8L',spec:'Galón 3.8L · Uso fuerte',desc:'Para grasa pesada, talleres y parqueos.',price:720,old:900,tag:'',hot:0},
{id:12,cat:'higiene',sku:'Higiene 01',name:'Jabón de Manos 3.8L',spec:'Galón 3.8L',desc:'Para la casa o tu negocio. Espuma suave.',price:475,old:590,tag:'',hot:0},
{id:13,cat:'higiene',sku:'Higiene 02',name:'Papel Toalla Jumbo x6',spec:'6 rollos grandes',desc:'Absorbe bien. Para cocina o negocio.',price:650,old:820,tag:'',hot:0},
{id:14,cat:'hogar',sku:'Hogar 03',name:'Multiusos Brisa Marina 3.8L',spec:'Galón 3.8L',desc:'Para superficies, mesas y manijas.',price:435,old:550,tag:'NUEVO',hot:0},
];
let cart=[];try{cart=JSON.parse(localStorage.getItem('nc-cart')||'[]');}catch(e){cart=[];}
let curFilter='todos',curSearch='',curSort='rel';
const fmt=n=>'RD$'+n.toLocaleString('es-DO');
function save(){try{localStorage.setItem('nc-cart',JSON.stringify(cart));}catch(e){}updateBadge();}
function updateBadge(){const c=cart.reduce((a,i)=>a+i.qty,0);document.getElementById('count').textContent=c;document.getElementById('count2').textContent=c+(c===1?' ítem':' ítems');
const tot=cart.reduce((a,i)=>a+i.qty*i.price,0);document.getElementById('total').textContent=fmt(tot);
const sm=document.getElementById('shipMsg');if(tot>0)sm.textContent='Envíos disponibles · lo coordinamos por WhatsApp';else sm.textContent='Arma tu pedido y envíalo por WhatsApp';renderCartItems();}
function renderCartItems(){const box=document.getElementById('items');if(!cart.length){box.innerHTML='<p style="color:var(--muted);text-align:center;margin-top:24px;font-size:.9rem">Tu carrito está vacío.<br>Agrega productos del catálogo.</p>';return;}
box.innerHTML=cart.map((i,idx)=>{const img=i.img?`<img src="${i.img}" onerror="this.remove()" alt="">`:'';return `<div class="ci">${img}<div class="inf"><b>${i.name}</b><small>${fmt(i.price)} c/u</small></div><div class="qty"><button onclick="chQty(${idx},-1)">−</button><b>${i.qty}</b><button onclick="chQty(${idx},1)">+</button></div></div>`;}).join('');}
function chQty(idx,d){cart[idx].qty+=d;if(cart[idx].qty<=0)cart.splice(idx,1);save();}
function clearCart(){cart=[];save();toast('Carrito vaciado');}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);const f=cart.find(x=>x.id===id);if(f)f.qty++;else cart.push({id:p.id,name:p.name,price:p.price,img:IMG[p.cat],qty:1});save();toast('Agregado al pedido');}
function addCombo(name,price){const f=cart.find(x=>x.name===name);if(f)f.qty++;else cart.push({id:'pack-'+Date.now(),name,price,img:IMG.pisos,qty:1});save();toast('Combo agregado');toggleCart(true);}
function toggleCart(force){const c=document.getElementById('cart'),o=document.getElementById('overlay');const open=typeof force==='boolean'?force:!c.classList.contains('open');c.classList.toggle('open',open);o.classList.toggle('show',open);}
function checkout(){if(!cart.length){toast('Agrega productos primero');return;}const tot=cart.reduce((a,i)=>a+i.qty*i.price,0);const lines=cart.map(i=>`• ${i.qty}x ${i.name} - ${fmt(i.price*i.qty)}`).join('\n');const msg=`Hola NovaClean, quiero hacer este pedido:\n${lines}\nTotal: ${fmt(tot)}\nMi nombre es: `;window.open('https://wa.me/18090000000?text='+encodeURIComponent(msg),'_blank');}
function filterCat(c){curFilter=c;document.querySelectorAll('#filters .f').forEach(b=>b.classList.toggle('active',b.dataset.f===c));render();if(c!=='todos'){const el=document.getElementById('catalogo');if(el)el.scrollIntoView({behavior:'smooth'});}}
function onSearch(v){curSearch=v.toLowerCase();render();}
function onSort(v){curSort=v;render();}
function imgFor(p){return IMG[p.cat]||IMG.hogar;}
function render(){const g=document.getElementById('grid');if(!g)return;
let list=PRODUCTS.filter(p=>(curFilter==='todos'||p.cat===curFilter)&&((p.name+' '+p.sku+' '+(p.desc||'')).toLowerCase().includes(curSearch)));
if(curSort==='asc')list=[...list].sort((a,b)=>a.price-b.price);if(curSort==='desc')list=[...list].sort((a,b)=>b.price-a.price);
if(!list.length){g.innerHTML='<p style="color:var(--muted)">No encontramos eso. Prueba con “cloro” o “desinfectante”.</p>';return;}
g.innerHTML=list.map(p=>`<div class="card"><div class="card-img"><img loading="lazy" src="${imgFor(p)}" alt="${p.name}" onerror="this.remove()">${p.tag?`<span class="card-badge${p.hot?' hot':''}">${p.tag}</span>`:''}</div>
<div class="card-body"><span class="sku">${p.sku}</span><h3>${p.name}</h3><span class="spec">${p.spec}</span><p class="desc">${p.desc}</p>
<div class="price"><strong>${fmt(p.price)}</strong><s>${fmt(p.old)}</s></div>
<div class="card-actions"><button class="btn-primary" onclick="addToCart(${p.id})">Agregar</button><button class="ficha" onclick="openFicha(${p.id})">Ver</button></div></div></div>`).join('');}
function openFicha(id){const p=PRODUCTS.find(x=>x.id===id);const m=document.getElementById('modal');document.getElementById('modalCard').innerHTML=`<span class="sku">${p.sku}</span><h3>${p.name}</h3><p style="color:var(--muted);font-size:.9rem">${p.desc}</p>
<table><tr><th>Detalle</th><th>Info</th></tr><tr><td><strong>Presentación</strong></td><td>${p.spec}</td></tr><tr><td><strong>Precio</strong></td><td>${fmt(p.price)} (antes ${fmt(p.old)})</td></tr><tr><td><strong>Entrega</strong></td><td>Envíos disponibles</td></tr></table>
<div style="display:flex;gap:10px;margin-top:12px"><button class="btn-primary" style="flex:1;justify-content:center" onclick="addToCart(${p.id});closeModal()">Agregar al pedido</button><button class="ficha" onclick="closeModal()">Cerrar</button></div>`;
m.classList.add('open');}
function closeModal(){document.getElementById('modal').classList.remove('open');}
let toastT;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);}
document.addEventListener('DOMContentLoaded',()=>{render();updateBadge();document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();toggleCart(false);}});});
