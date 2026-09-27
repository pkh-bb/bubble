const chat=document.getElementById("chat");
let selectedDate="all", selectedYear="all", selectedKind="all", query="";

const fmtDate=d=>new Date(d+"T00:00:00").toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"short"});
const years=[...new Set(BUBBLE_DATA.messages.map(m=>m.date.slice(0,4)))].sort((a,b)=>b-a);
const dates=[...new Set(BUBBLE_DATA.messages.map(m=>m.date))].sort((a,b)=>b.localeCompare(a));

document.getElementById("artist").textContent=BUBBLE_DATA.artist;
document.getElementById("count").textContent=BUBBLE_DATA.bubbleCount;

function filtered(){
 return BUBBLE_DATA.messages.filter(m=>{
  const okDate=selectedDate==="all"||m.date===selectedDate;
  const okYear=selectedYear==="all"||m.date.startsWith(selectedYear);
  const okKind=selectedKind==="all"||m.type===selectedKind;
  const hay=(m.text||"")+" "+(m.title||"");
  return okDate&&okYear&&okKind&&(!query||hay.toLowerCase().includes(query.toLowerCase()));
 });
}
function render(){
 chat.innerHTML="";
 const arr=filtered().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 let last="";
 arr.forEach(m=>{
  if(m.date!==last){const d=document.createElement("div");d.className="date-divider";d.textContent=fmtDate(m.date);chat.appendChild(d);last=m.date}
  const row=document.createElement("section");row.className="msg";
  const p=document.createElement("img");p.className="profile";p.src=BUBBLE_DATA.profile;row.appendChild(p);
  const body=document.createElement("div");body.className="msg-body";
  const n=document.createElement("div");n.className="name";n.textContent="Evan hansen";body.appendChild(n);
  if(m.type==="image"){const im=document.createElement("img");im.className="media";im.src=m.src;body.appendChild(im)}
  else{const b=document.createElement("div");b.className="bubble"+(m.type==="reply"?" reply":"");if(m.type==="reply"){b.innerHTML="<strong></strong><div class='muted'></div>";b.querySelector("strong").textContent=m.title;b.querySelector(".muted").textContent=m.text}else b.textContent=m.text;body.appendChild(b)}
  if(m.time){const t=document.createElement("div");t.className="time";t.textContent=m.time;body.appendChild(t)}
  row.appendChild(body);chat.appendChild(row);
 });
 if(!arr.length){const e=document.createElement("div");e.style.textAlign="center";e.style.padding="60px 10px";e.style.color="#999";e.textContent="백업된 메시지가 없습니다.";chat.appendChild(e)}
 document.getElementById("dateLabel").textContent=selectedDate==="all"?"전체 기간":fmtDate(selectedDate);
}
function panel(id,show=true){document.getElementById(id).classList.toggle("hidden",!show)}
function buildPanels(){
 document.getElementById("dateChoices").innerHTML=dates.map(d=>`<button class="choice" data-date="${d}">${fmtDate(d)}</button>`).join("");
 document.getElementById("yearChoices").innerHTML=years.map(y=>{let c=BUBBLE_DATA.messages.filter(m=>m.date.startsWith(y)).length;return `<div class="year-item"><button data-year="${y}">${y}년 <span class="match-count">${c}개</span></button></div>`}).join("");
}
document.getElementById("dateBtn").onclick=()=>panel("datePanel");
document.getElementById("yearBtn").onclick=()=>panel("yearPanel");
document.getElementById("filterBtn").onclick=()=>panel("filterPanel");
document.getElementById("searchBtn").onclick=()=>{panel("searchPanel");document.getElementById("searchInput").focus()};
document.getElementById("clearSearch").onclick=()=>{document.getElementById("searchInput").value="";query="";render();panel("searchPanel",false)};
document.getElementById("searchInput").oninput=e=>{query=e.target.value.trim();render()};
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>panel(b.dataset.close,false));
document.addEventListener("click",e=>{
 if(e.target.dataset.date!==undefined){selectedDate=e.target.dataset.date;selectedYear="all";panel("datePanel",false);render()}
 if(e.target.dataset.year){selectedYear=e.target.dataset.year;selectedDate="all";panel("yearPanel",false);render()}
 if(e.target.dataset.kind){selectedKind=e.target.dataset.kind;panel("filterPanel",false);render()}
});
document.getElementById("back").onclick=()=>history.back();
buildPanels();render();