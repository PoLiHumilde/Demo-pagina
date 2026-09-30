const WA='18096106690',WA2='18297785347';
let pendingWa='Hola Eliansa';
function waNumLink(num,msg){return 'https://wa.me/'+num+'?text='+encodeURIComponent(msg);}
function waChoose(msg){pendingWa=msg||'Hola Eliansa';document.getElementById('waOpt1').href=waNumLink(WA,pendingWa);document.getElementById('waOpt2').href=waNumLink(WA2,pendingWa);document.getElementById('waModal').classList.add('open');}
function closeWa(){document.getElementById('waModal').classList.remove('open');}
const PRODUCTS=[
{id:1,cat:'hogar',sku:'Hogar 01',img:'img/suavizante-galon.png',name:'Suavizante de Ropa',spec:'Galón · Ropa suave',desc:'Ropa suave y con rico aroma. El favorito de la casa.',price:495,old:595,tag:'EL FAVORITO',hot:1},
{id:2,cat:'hogar',sku:'Hogar 02',img:'img/air-freshener.png',name:'Air Freshener Cherry',spec:'Spray · Aroma cherry',desc:'Aroma duradero, elimina olores. Hogar fresco.',price:225,old:280,tag:'NUEVO',hot:0},
{id:3,cat:'hogar',sku:'Hogar 03',img:'img/jabon-cuaba.png',name:'Jabón de Cuaba',spec:'Galón · Limón',desc:'El clásico jabón de cuaba para fregar y lavar.',price:450,old:540,tag:'',hot:0},
{id:4,cat:'cocina',sku:'Cocina 01',img:'img/lavaplatos.png',name:'Jabón Lavaplatos 500ml',spec:'500ml · Limón fresco',desc:'Poder desengrasante. Corta la grasa al instante.',price:175,old:220,tag:'MUY PEDIDO',hot:1},
{id:5,cat:'cocina',sku:'Cocina 02',img:'img/lavaplatos-galon.png',name:'Jabón Lavaplatos Galón',spec:'Galón · Limpieza efectiva',desc:'Presentación grande para la cocina. Rinde más.',price:425,old:520,tag:'',hot:0},
{id:6,cat:'cocina',sku:'Cocina 03',img:'img/desengrasante.png',name:'Desengrasante Multiusos',spec:'Spray · Cocina y superficies',desc:'Elimina grasa difícil. Limpieza profunda.',price:295,old:360,tag:'NUEVO',hot:0},
{id:7,cat:'bano',sku:'Baño 01',img:'img/cloro.png',name:'Cloro 1 Litro',spec:'1L · Desinfecta',desc:'Para baños, pisos y ropa blanca. No puede faltar.',price:150,old:185,tag:'',hot:0},
{id:8,cat:'bano',sku:'Baño 02',img:'img/cloro-puro.png',name:'Cloro Puro 1 Galón',spec:'1 GL · Máxima pureza',desc:'Cloro puro en galón. Rinde más por menos.',price:350,old:425,tag:'',hot:0},
{id:9,cat:'desinf',sku:'Desinf 01',img:'img/desinfectante-lavanda.png',name:'Desinfectante Lavanda',spec:'Aroma lavanda',desc:'Limpia, desinfecta y deja la casa oliendo rico por horas.',price:200,old:250,tag:'EL FAVORITO',hot:1},
{id:10,cat:'desinf',sku:'Desinf 02',img:'img/desinfectante-floral.png',name:'Desinfectante Floral',spec:'Galón · Bouquet floral',desc:'Fórmula de larga duración con aroma floral.',price:350,old:425,tag:'',hot:0},
{id:11,cat:'pisos',sku:'Pisos 01',img:'img/limpia-ceramicas.png',name:'Limpia Cerámicas',spec:'Galón · Alto rendimiento',desc:'Limpia, desengrasa y da brillo a pisos cerámicos.',price:475,old:575,tag:'NUEVO',hot:0},
{id:12,cat:'auto',sku:'Auto 01',img:'img/shampoo-autos.png',name:'Shampoo para Autos',spec:'Galón · Espuma activa',desc:'Lava y cuida la pintura de tu vehículo.',price:450,old:550,tag:'NUEVO',hot:0},
{id:13,cat:'auto',sku:'Auto 02',img:'img/limpia-parabrisas.png',name:'Limpia Parabrisas',spec:'Visibilidad clara',desc:'Remueve suciedad sin dejar residuos.',price:375,old:450,tag:'',hot:0},
{id:14,cat:'auto',sku:'Auto 03',img:'img/agua-bateria.png',name:'Agua para Batería',spec:'Galón · Mantenimiento',desc:'Para el cuidado de la batería de tu vehículo.',price:300,old:375,tag:'',hot:0},
{id:15,cat:'auto',sku:'Auto 04',img:'img/almorol.png',name:'Almorol Blanco',spec:'Spray · Protector premium',desc:'Acabado brillante con protección UV para gomas e interiores.',price:325,old:395,tag:'NUEVO',hot:0},
];
const CATS={hogar:'Hogar',cocina:'Cocina',bano:'Baños',desinf:'Desinfectantes',pisos:'Pisos',auto:'Automotriz'};
let cart=[];try{cart=JSON.parse(localStorage.getItem('nc-cart')||'[]');}catch(e){cart=[];}
let curFilter='todos',curSearch='',curSort='rel';
const fmt=n=>'RD$'+n.toLocaleString('es-DO');
function save(){try{localStorage.setItem('nc-cart',JSON.stringify(cart));}catch(e){}updateBadge();}
function updateBadge(){const c=cart.reduce((a,i)=>a+i.qty,0);document.getElementById('count').textContent=c;document.getElementById('count2').textContent=c+(c===1?' ítem':' ítems');
const tot=cart.reduce((a,i)=>a+i.qty*(i.price||0),0);
document.getElementById('total').textContent=fmt(tot);
const sm=document.getElementById('shipMsg');sm.textContent=cart.length?'Envíos disponibles · lo coordinamos por WhatsApp':'Arma tu pedido y envíalo por WhatsApp';renderCartItems();}
function renderCartItems(){const box=document.getElementById('items');if(!cart.length){box.innerHTML='<p style="color:var(--muted);text-align:center;margin-top:24px;font-size:.9rem">Tu carrito está vacío.<br>Agrega productos del catálogo.</p>';return;}
box.innerHTML=cart.map((i,idx)=>{const img=i.img?`<img src="${i.img}" onerror="this.remove()" alt="">`:'';return `<div class="ci">${img}<div class="inf"><b>${i.name}</b><small>${i.price!=null?fmt(i.price)+' c/u':'Precio a consultar'}</small></div><div class="qty"><button onclick="chQty(${idx},-1)">−</button><b>${i.qty}</b><button onclick="chQty(${idx},1)">+</button></div></div>`;}).join('');}
function chQty(idx,d){cart[idx].qty+=d;if(cart[idx].qty<=0)cart.splice(idx,1);save();}
function clearCart(){cart=[];save();toast('Carrito vaciado');}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);const f=cart.find(x=>x.id===id);if(f)f.qty++;else cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty:1});save();toast('Agregado al pedido');}
function askPrice(id){const p=PRODUCTS.find(x=>x.id===id);waChoose('Hola Eliansa, ¿qué precio tiene '+p.name+' ('+p.spec+')?');}
function comboQuote(name){waChoose('Hola Eliansa, me interesa el '+name+'. ¿Qué precio tiene?');}
function addCombo(name,price,img){const f=cart.find(x=>x.name===name);if(f)f.qty++;else cart.push({id:'pack-'+Date.now(),name,price,img:img||'img/suavizante-galon.png',qty:1});save();toast('Combo agregado');toggleCart(true);}
function toggleCart(force){const c=document.getElementById('cart'),o=document.getElementById('overlay');const open=typeof force==='boolean'?force:!c.classList.contains('open');c.classList.toggle('open',open);o.classList.toggle('show',open);}
function checkout(){if(!cart.length){toast('Agrega productos primero');return;}const tot=cart.reduce((a,i)=>a+i.qty*(i.price||0),0);const lines=cart.map(i=>`• ${i.qty}x ${i.name}${i.price!=null?' - '+fmt(i.price*i.qty):' (precio a consultar)'}`).join('\n');const msg=`Hola Eliansa, quiero hacer este pedido:\n${lines}${tot>0?'\nTotal: '+fmt(tot):''}\nMi nombre es: `;waChoose(msg);}
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
function openFicha(id){const p=PRODUCTS.find(x=>x.id===id);const m=document.getElementById('modal');document.getElementById('modalCard').innerHTML=`<img src="${p.img}" alt="${p.name}" onerror="this.remove()" style="width:100%;height:240px;object-fit:contain;background:#F4F7FA;border-radius:12px;margin-bottom:12px"><span class="sku">${p.sku} · ${CATS[p.cat]||''}</span><h3>${p.name}</h3><p style="color:var(--muted);font-size:.9rem">${p.desc}</p>
<table><tr><th>Detalle</th><th>Info</th></tr><tr><td><strong>Presentación</strong></td><td>${p.spec}</td></tr><tr><td><strong>Precio</strong></td><td>${p.price!=null?fmt(p.price):'A consultar por WhatsApp'}</td></tr><tr><td><strong>Entrega</strong></td><td>Envíos disponibles</td></tr></table>
<div style="display:flex;gap:10px;margin-top:12px">${p.price!=null?`<button class="btn-primary" style="flex:1;justify-content:center" onclick="addToCart(${p.id});closeModal()">Agregar al pedido</button>`:`<button class="btn-primary" style="flex:1;justify-content:center" onclick="askPrice(${p.id})">Consultar por WhatsApp</button>`}<button class="ficha" onclick="closeModal()">Cerrar</button></div>`;
m.classList.add('open');}
function closeModal(){document.getElementById('modal').classList.remove('open');}
let toastT;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);}
document.addEventListener('DOMContentLoaded',()=>{render();updateBadge();document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();toggleCart(false);closeWa();}});});
