/*==================================================

                BRISA 5.0

==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

/*==================================================

                LOADER

==================================================*/

const loader=document.querySelector(".loader");

window.addEventListener("load",()=>{

loader.style.opacity="0";

loader.style.pointerEvents="none";

setTimeout(()=>{

loader.remove();

},700);

});

/*==================================================

                HEADER

==================================================*/

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

/*==================================================

                CURSOR

==================================================*/

const cursor=document.querySelector(".cursor");

const cursorDot=document.querySelector(".cursor-dot");

window.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

cursorDot.style.left=e.clientX+"px";

cursorDot.style.top=e.clientY+"px";

});

document.querySelectorAll("a,button").forEach(item=>{

item.addEventListener("mouseenter",()=>{

cursor.style.transform="translate(-50%,-50%) scale(1.6)";

});

item.addEventListener("mouseleave",()=>{

cursor.style.transform="translate(-50%,-50%) scale(1)";

});

});

/*==================================================

                SMOOTH SCROLL

==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(link.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/*==================================================

                SCROLL REVEAL

==================================================*/

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

document.querySelectorAll(

".hero-left,.section-header,.product-card,.story-image,.story-content,.lookbook-grid img,.value-card,.newsletter-content"

).forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});

});
/*==================================================

            FAVORITOS

==================================================*/

let favorites=JSON.parse(

localStorage.getItem("brisa-favorites")

)||[];

document.querySelectorAll(".favorite").forEach((button,index)=>{

button.setAttribute("aria-pressed", favorites.includes(index));

if(favorites.includes(index)){

button.classList.add("active");

button.innerHTML='<i class="fa-solid fa-heart"></i>';

}

button.addEventListener("click",()=>{

button.classList.toggle("active");

button.setAttribute("aria-pressed", button.classList.contains("active"));

if(button.classList.contains("active")){

button.innerHTML='<i class="fa-solid fa-heart"></i>';

favorites.push(index);

showToast("❤️ Añadido a favoritos");

}else{

button.innerHTML='<i class="fa-regular fa-heart"></i>';

favorites=favorites.filter(i=>i!==index);

showToast("🤍 Eliminado de favoritos");

}

localStorage.setItem(

"brisa-favorites",

JSON.stringify(favorites)

);

});

});

/*==================================================

                CARRITO

==================================================*/

let cart=JSON.parse(

localStorage.getItem("brisa-cart")

)||[];

const cartCounter=document.querySelector(".cart-btn span");

updateCart();

function updateCart(){

if(cartCounter){

cartCounter.textContent=cart.length;

}

}

document.querySelectorAll(".buy-btn").forEach(button=>{

button.addEventListener("click",()=>{

const product=button.closest(".product-card");

const image=product.querySelector("img").src;

const title=product.querySelector("h3").textContent;

const price=product.querySelector("strong").textContent;

cart.push({

image,

title,

price

});

localStorage.setItem(

"brisa-cart",

JSON.stringify(cart)

);

updateCart();

showToast("🛍 Producto añadido");

button.textContent="Añadido ✓";

setTimeout(()=>{

button.textContent="Comprar";

},1200);

});

});

/*==================================================

            CAMBIO DE IMAGEN

==================================================*/

document.querySelectorAll(".product-image img").forEach(img=>{

const front=img.src;

const back=img.dataset.back;

if(!back)return;

img.parentElement.addEventListener("mouseenter",()=>{

img.src=back;

});

img.parentElement.addEventListener("mouseleave",()=>{

img.src=front;

});

});

/*==================================================

            EFECTO 3D

==================================================*/

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*14;

const rotateX=((y/rect.height)-0.5)*-14;

card.style.transform=`

perspective(1200px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-10px)

`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*==================================================

            PARALLAX HERO

==================================================*/

const heroVideo=document.querySelector(".hero-video");

window.addEventListener("scroll",()=>{

if(heroVideo){

heroVideo.style.transform=

`translateY(${window.scrollY*0.2}px) scale(1.08)`;

}

});

/*==================================================

            PRELOAD

==================================================*/

document.querySelectorAll(".product-image img").forEach(img=>{

if(img.dataset.back){

const preload=new Image();

preload.src=img.dataset.back;

}

});
/*==================================================

            MENÚ MÓVIL

==================================================*/

const menuBtn=document.querySelector(".menu-btn");

const navbar=document.querySelector(".navbar");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

navbar.classList.toggle("active");

menuBtn.classList.toggle("active");

const isOpen=navbar.classList.contains("active");

menuBtn.setAttribute("aria-expanded", isOpen);

menuBtn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");

});

}

document.querySelectorAll(".navbar a").forEach(link=>{

link.addEventListener("click",()=>{

navbar.classList.remove("active");

menuBtn.classList.remove("active");

menuBtn.setAttribute("aria-expanded","false");

menuBtn.setAttribute("aria-label","Abrir menú");

});

});

/*==================================================

            SCROLL PROGRESS

==================================================*/

const progress=document.createElement("div");

progress.className="scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const width=(window.scrollY/total)*100;

progress.style.width=width+"%";

});

/*==================================================

            BOTÓN VOLVER ARRIBA

==================================================*/

const backTop=document.createElement("button");

backTop.className="back-top";

backTop.setAttribute("aria-label","Volver al inicio");

backTop.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(backTop);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*==================================================

            TOAST

==================================================*/

function showToast(text){

const toast=document.createElement("div");

toast.className="toast";

toast.textContent=text;

toast.setAttribute("role","status");

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},50);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},350);

},2500);

}

/*==================================================

            RIPPLE

==================================================*/

document.querySelectorAll("button,.btn-primary,.btn-secondary").forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

ripple.className="ripple";

const rect=button.getBoundingClientRect();

ripple.style.left=(e.clientX-rect.left)+"px";

ripple.style.top=(e.clientY-rect.top)+"px";

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});

/*==================================================

            NAVBAR ACTIVA

==================================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-200;

if(window.scrollY>=top){

current=section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

const newsletterForm=document.querySelector(".newsletter-form");

newsletterForm?.addEventListener("submit",(event)=>{

event.preventDefault();

if(newsletterForm.reportValidity()){

showToast("Gracias por unirte a Brisa.");

newsletterForm.reset();

}

});
