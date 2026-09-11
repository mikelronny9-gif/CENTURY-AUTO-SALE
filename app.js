const defaultCars=[
{id:1,year:2023,make:"Toyota",model:"RAV4 XLE",body:"SUV",miles:"28,410",price:28995,img:"https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1000&q=80"},
{id:2,year:2022,make:"Honda",model:"Accord Sport",body:"Sedan",miles:"31,205",price:24995,img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80"},
{id:3,year:2024,make:"Ford",model:"F-150 XLT",body:"Truck",miles:"12,880",price:41995,img:"https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1000&q=80"},
{id:4,year:2021,make:"BMW",model:"330i",body:"Sedan",miles:"35,612",price:31995,img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"},
{id:5,year:2023,make:"Chevrolet",model:"Camaro LT",body:"Coupe",miles:"18,430",price:33995,img:"https://images.unsplash.com/photo-1603553322202-5f5e7e5b7a7a?auto=format&fit=crop&w=1000&q=80"},
{id:6,year:2022,make:"Jeep",model:"Grand Cherokee",body:"SUV",miles:"27,900",price:36995,img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80"}];

function getCars(){return JSON.parse(localStorage.getItem("dealerCars")||"null")||defaultCars}
function saveCars(c){localStorage.setItem("dealerCars",JSON.stringify(c))}
function money(n){return "$"+Number(n).toLocaleString()}
function renderCars(){
 const box=document.getElementById("cars"); if(!box)return;
 const q=(document.getElementById("search")?.value||"").toLowerCase(), body=document.getElementById("body")?.value||"", max=Number(document.getElementById("price")?.value||0);
 const cars=getCars().filter(c=>(`${c.make} ${c.model}`.toLowerCase().includes(q))&&(!body||c.body===body)&&(!max||c.price<=max));
 document.getElementById("count").textContent=`${cars.length} vehicles`;
 box.innerHTML=cars.map(c=>`<article class="car-card"><div class="car-img" style="background-image:url('${c.img}')"></div><div class="car-body"><p class="eyebrow">${c.year} • ${c.body}</p><h3>${c.make} ${c.model}</h3><div class="price">${money(c.price)}</div><div class="specs">${c.miles} miles</div><button class="btn" onclick="openRequest('${c.year} ${c.make} ${c.model}')">Ask About This Vehicle</button></div></article>`).join("")
}
function chatStore(){return JSON.parse(localStorage.getItem("dealerChats")||"[]")}
function saveChats(c){localStorage.setItem("dealerChats",JSON.stringify(c))}
function chatId(){let id=sessionStorage.getItem("chatId");if(!id){id="chat-"+Date.now()+"-"+Math.random().toString(36).slice(2,7);sessionStorage.setItem("chatId",id)}return id}
function openChat(){document.getElementById("chatWidget")?.classList.remove("hidden");renderChat();if(window.chatTimer)clearInterval(window.chatTimer);window.chatTimer=setInterval(renderChat,1000)}
function closeChat(){document.getElementById("chatWidget")?.classList.add("hidden");if(window.chatTimer)clearInterval(window.chatTimer)}
function renderChat(){let b=document.getElementById("chatMessages");if(!b)return;let msgs=chatStore().filter(x=>x.chatId===chatId());if(!msgs.length)msgs=[{from:"dealer",text:"Hi! How can we help you today?",time:new Date().toLocaleTimeString()}];b.innerHTML=msgs.map(m=>`<div class="msg ${m.from==="customer"?"user":"dealer"}">${escapeHtml(m.text)}<small style="display:block;opacity:.6;margin-top:4px">${escapeHtml(m.time||"")}</small></div>`).join("");b.scrollTop=b.scrollHeight}
function sendChat(){let i=document.getElementById("chatText"),t=i.value.trim();if(!t)return;let chats=chatStore();chats.push({chatId:chatId(),from:"customer",text:t,time:new Date().toLocaleString()});saveChats(chats);i.value="";renderChat()}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openRequest(vehicle=""){document.getElementById("vehicleField").value=vehicle;document.getElementById("modalTitle").textContent="Request to Chat";document.getElementById("modalIntro").textContent="Leave your contact information and a dealer will reach out.";document.getElementById("modal").classList.remove("hidden")}
function openFinance(){document.getElementById("vehicleField").value="Financing Request";document.getElementById("modalTitle").textContent="Financing Request";document.getElementById("modalIntro").textContent="Tell us how we can help with your next vehicle.";document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function submitLead(e){e.preventDefault();let f=new FormData(e.target),lead=Object.fromEntries(f.entries());lead.time=new Date().toLocaleString();let leads=JSON.parse(localStorage.getItem("dealerLeads")||"[]");leads.unshift(lead);localStorage.setItem("dealerLeads",JSON.stringify(leads));closeModal();e.target.reset();alert("Request sent! A dealer representative will contact you.");}
function initAdmin(){
 if(!document.getElementById("dashboard"))return;
 if(sessionStorage.getItem("dealerAdmin")==="1")showDashboard();
}
function login(e){e.preventDefault();let email=document.getElementById("email").value.trim(),pass=document.getElementById("password").value;
 if(email==="yomawisdom55@gmail.com"&&pass==="mamaboy12"){sessionStorage.setItem("dealerAdmin","1");showDashboard()}else document.getElementById("loginError").textContent="Incorrect admin email or password."}
function logout(){sessionStorage.removeItem("dealerAdmin");location.reload()}
function showDashboard(){document.getElementById("login").classList.add("hidden");document.getElementById("dashboard").classList.remove("hidden");renderAdmin()}
function renderChatInbox(){let box=document.getElementById("chatInbox");if(!box)return;let chats=chatStore(),ids=[...new Set(chats.map(x=>x.chatId))];box.innerHTML=ids.length?ids.map(id=>{let ms=chats.filter(x=>x.chatId===id),last=ms[ms.length-1];return `<div class="lead"><strong>Chat ${escapeHtml(id)}</strong><span>${ms.length} messages • Last: ${escapeHtml(last.time||"")}</span><div style="margin:10px 0;max-height:220px;overflow:auto">${ms.map(m=>`<div class="msg ${m.from==="customer"?"user":"dealer"}" style="margin:6px 0">${escapeHtml(m.text)}</div>`).join("")}</div><div style="display:flex;gap:8px"><input id="reply-${id}" placeholder="Type your reply..." style="flex:1"><button class="btn" onclick="replyChat('${id}')">Reply</button></div></div>`}).join(""):"<p class='muted'>No live chats yet.</p>"}
function replyChat(id){let input=document.getElementById("reply-"+id),text=input?.value.trim();if(!text)return;let chats=chatStore();chats.push({chatId:id,from:"dealer",text,time:new Date().toLocaleString()});saveChats(chats);renderChatInbox()}
function clearChats(){if(confirm("Clear all live chats?")){localStorage.removeItem("dealerChats");renderChatInbox()}}
function renderAdmin(){
 let leads=JSON.parse(localStorage.getItem("dealerLeads")||"[]"),cars=getCars();
 document.getElementById("leadCount").textContent=leads.length;renderChatInbox();document.getElementById("carCount").textContent=cars.length;
 document.getElementById("leads").innerHTML=leads.length?leads.map(l=>`<div class="lead"><strong>${escapeHtml(l.name)} — ${escapeHtml(l.email)}</strong><span>${escapeHtml(l.phone||"No phone")} • ${escapeHtml(l.vehicle||"General inquiry")} • ${escapeHtml(l.time||"")}</span><p>${escapeHtml(l.message||"No message")}</p></div>`).join(""):"<p class='muted'>No customer requests yet.</p>";
 document.getElementById("adminCars").innerHTML=cars.map(c=>`<div class="admin-car"><span><b>${c.year} ${c.make} ${c.model}</b> — ${money(c.price)}</span><span><button class="outline" onclick="deleteCar(${c.id})">Delete</button></span></div>`).join("")
}
function clearLeads(){if(confirm("Clear all customer requests?")){localStorage.removeItem("dealerLeads");renderAdmin()}}
function deleteCar(id){saveCars(getCars().filter(c=>c.id!==id));renderAdmin();if(document.getElementById("cars"))renderCars()}
function addCar(){let make=prompt("Make?");if(!make)return;let model=prompt("Model?");if(!model)return;let year=Number(prompt("Year?",2024)||2024),price=Number(prompt("Price?",29995)||29995),body=prompt("Body style?","SUV")||"SUV",miles=prompt("Mileage?","0")||"0",img=prompt("Image URL?","");let cars=getCars();cars.push({id:Date.now(),year,make,model,body,miles,price,img:img||"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"});saveCars(cars);renderAdmin()}
if(document.getElementById("cars"))renderCars()
