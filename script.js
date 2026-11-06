const products=[
 {id:1,name:"ARTIC PUFFER",type:"TECHNICAL JACKET / ICE",price:899.90,image:"https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=700&q=85",tag:"BEST SELLER"},
 {id:2,name:"NORTH SHELL",type:"WINDPROOF / SILVER",price:649.90,image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85",tag:"NEW"},
 {id:3,name:"GLACIER PARKA",type:"INSULATED / BLACK",price:789.90,image:"https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=700&q=85",tag:"LIMITED"},
 {id:4,name:"ALPINE HOODIE",type:"HEAVYWEIGHT / GREY",price:329.90,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",tag:""},
 {id:5,name:"FROST CARGO",type:"UTILITY PANTS / ICE",price:389.90,image:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85",tag:""},
 {id:6,name:"SUMMIT VEST",type:"THERMAL LAYER / BLUE",price:459.90,image:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=700&q=85",tag:"NEW"}
];
let cart=JSON.parse(localStorage.getItem("velorCart")||"[]");
const money=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const grid=document.getElementById("productsGrid");
grid.innerHTML=products.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.tag?`<span class="product-tag">${p.tag}</span>`:""}<button class="quick-add" data-add="${p.id}">ADD TO BAG ＋</button></div><div class="product-info"><h3>${p.name}</h3><p>${p.type}</p><strong>${money(p.price)}</strong></div></article>`).join("");
function save(){localStorage.setItem("velorCart",JSON.stringify(cart));renderCart()}
function add(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();openCart()}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("subtotal").textContent=money(total);document.getElementById("checkoutTotal").textContent=money(total);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{let p=products.find(p=>p.id===x.id);return `<div class="cart-row"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${money(p.price)}</p><div class="qty"><button data-qty="${p.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1">＋</button></div></div><button class="remove" data-remove="${p.id}">REMOVER</button></div>`}).join(""):`<div class="empty-cart">Seu carrinho está vazio.<br><span>Escolha suas peças favoritas.</span></div>`;
}
function openCart(){document.getElementById("cartDrawer").classList.add("show");document.getElementById("backdrop").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("show");document.getElementById("backdrop").classList.remove("show")}
grid.addEventListener("click",e=>{let b=e.target.closest("[data-add]");if(b)add(Number(b.dataset.add))});
document.getElementById("cartItems").addEventListener("click",e=>{let q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){let item=cart.find(x=>x.id===Number(q.dataset.qty));item.qty+=Number(q.dataset.delta);if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id);save()}if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));save()}});
document.getElementById("openCart").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("backdrop").onclick=closeCart;
document.getElementById("goCheckout").onclick=()=>{if(!cart.length){alert("Adicione pelo menos um produto ao carrinho.");return}closeCart();document.getElementById("checkoutModal").classList.add("show")};
document.getElementById("closeCheckout").onclick=()=>document.getElementById("checkoutModal").classList.remove("show");
document.getElementById("addressForm").addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());localStorage.setItem("velorAddress",JSON.stringify(data));document.getElementById("orderNotice").hidden=false;});
document.getElementById("filterBtn").onclick=()=>{document.getElementById("productsGrid").scrollIntoView({behavior:"smooth",block:"center"})};
renderCart();