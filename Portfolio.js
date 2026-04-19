const text="I am Shreshtha Johari";
let i=0;

function typeEffect(){
 if(i<text.length){
 document.getElementById("typing").innerHTML+=text.charAt(i);
 i++;
 setTimeout(typeEffect,100);
 }else{
 setTimeout(()=>{
 document.getElementById("typing").innerHTML="";
 i=0;
 typeEffect();
 },1500)
 }
}

typeEffect();

function toggleMode(){
 document.body.classList.toggle("dark");
 let icon=document.querySelector(".toggle");
 icon.textContent=document.body.classList.contains("dark")?"☀️":"🌙";
}

const faders=document.querySelectorAll('.fade');
window.addEventListener('scroll',()=>{
 faders.forEach(el=>{
 const top=el.getBoundingClientRect().top;
 if(top<window.innerHeight-100){
 el.classList.add('show');
 }
 })
 // form
document.getElementById("form").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("response").innerText = "Message sent ✅";
};
});
