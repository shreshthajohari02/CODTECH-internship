function goHome(){ window.location.href='index.html'; }

const courses=[
{
name:"Python",
thumbnail:"https://img.youtube.com/vi/_uQrJ0TkZlc/0.jpg",
lectures:[{title:"Intro",duration:"10 min",video:"https://www.youtube.com/embed/_uQrJ0TkZlc",desc:"Basics",thumb:"https://img.youtube.com/vi/_uQrJ0TkZlc/0.jpg"}]
},
{
name:"JavaScript",
thumbnail:"https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg",
lectures:[{title:"JS Basics",duration:"15 min",video:"https://www.youtube.com/embed/W6NZfCO5SIk",desc:"JS intro",thumb:"https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg"}]
},
{
name:"Java",
thumbnail:"https://img.youtube.com/vi/eIrMbAQSU34/0.jpg",
lectures:[{title:"Java Intro",duration:"12 min",video:"https://www.youtube.com/embed/eIrMbAQSU34",desc:"Java basics",thumb:"https://img.youtube.com/vi/eIrMbAQSU34/0.jpg"}]
},
{
name:"UI/UX Design",
thumbnail:"https://img.youtube.com/vi/3YlVE0zY7dE/0.jpg",
lectures:[{title:"UI UX Intro",duration:"10 min",video:"https://www.youtube.com/embed/3YlVE0zY7dE",desc:"Design basics",thumb:"https://img.youtube.com/vi/3YlVE0zY7dE/0.jpg"}]
},
{
name:"Graphic Design",
thumbnail:"https://img.youtube.com/vi/3YlVE0zY7dE/0.jpg",
lectures:[{title:"Graphic Design Intro",duration:"9 min",video:"https://www.youtube.com/embed/3YlVE0zY7dE",desc:"Graphic design basics",thumb:"https://img.youtube.com/vi/3YlVE0zY7dE/0.jpg"}]
}
];

if(document.getElementById("courses")) displayCourses(courses);

function displayCourses(data){
let html="";
data.forEach((c,i)=>{
html+=`<div class="card" onclick="openCourse(${i})"><img src="${c.thumbnail}"><h3>${c.name}</h3></div>`;
});
document.getElementById("courses").innerHTML=html;
}

function searchCourse(){
let val=document.getElementById("search").value.toLowerCase();
displayCourses(courses.filter(c=>c.name.toLowerCase().includes(val)));
}

function openCourse(i){
localStorage.setItem("courseIndex",i);
window.location.href="course.html";
}

if(document.getElementById("lectureList")){
let c=courses[localStorage.getItem("courseIndex")];
document.getElementById("courseTitle").innerText=c.name;
let html="";
c.lectures.forEach((l,i)=>{
html+=`<div class="lecture"><input type="checkbox" onchange="updateProgress()"><img src="${l.thumb}"><div onclick="openVideo(${i})"><p>${l.title}</p><small>${l.duration}</small></div></div>`;
});
document.getElementById("lectureList").innerHTML=html;
}

function updateProgress(){
let all=document.querySelectorAll("input[type='checkbox']");
let checked=document.querySelectorAll("input[type='checkbox']:checked");
document.getElementById("progress").style.width=(checked.length/all.length)*100+"%";
}

function openVideo(i){
localStorage.setItem("videoIndex",i);
window.location.href="video.html";
}

if(document.getElementById("videoFrame")){
let c=courses[localStorage.getItem("courseIndex")];
let v=c.lectures[localStorage.getItem("videoIndex")];
document.getElementById("videoTitle").innerText=v.title;
document.getElementById("videoFrame").src=v.video+"?autoplay=1";
document.getElementById("videoDesc").innerText=v.desc;
}
