const e=document.querySelector(".video-background"),t=document.querySelector(".event"),n=(document.querySelector(".event__input--text"),document.querySelector("#event-date")),o=document.querySelector(".timer-container"),r=document.querySelector(".timer"),l=document.querySelector(".timer-title"),a=document.querySelectorAll(".timer__nb"),c=(document.querySelector("#submitBtn"),document.querySelector("#resetBtn"));let s,i,m=Date,u="";!function(){const e=new Date,t=new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString().slice(0,16);n.setAttribute("min",t)}();const d=function(){t.style.cssText="display:none",r.style.cssText="display:flex",o.style.cssText="display:flex",e.hidden=!1},y=function(){const e=Date.now(),t=(m-e)/1e3,n=[Math.floor(t/86400),Math.floor(t%86400/3600),Math.floor(t%3600/60),Math.floor(t%60)];a.forEach(((e,t)=>{e.textContent=`${n[t]}`})),t<1&&(localStorage.removeItem("time"),clearInterval(i),r.style.cssText="display:none",l.textContent=`${u.toUpperCase()} HAS STARTED ! `,l.style.cssText="margin-bottom: 2rem")},v=function(){i=setInterval((function(){y()}),1e3)},S=function(){l.textContent=`The ${u.toLowerCase()} will begin in`};t.addEventListener("submit",(function(e){e.preventDefault(),u=e.target[0].value,m=new Date(e.target[1].value).getTime(),s={savedEventName:u,savedEventDate:m},localStorage.setItem("time",JSON.stringify(s)),v(),S(),d()})),c.addEventListener("click",(function(){clearInterval(i),localStorage.removeItem("time"),t.style.cssText="display:flex",e.hidden=!0,o.style.cssText="display:none"})),localStorage.getItem("time")&&(d(),s=JSON.parse(localStorage.getItem("time")),u=s.savedEventName,m=new Date(s.savedEventDate).getTime(),S(),v());
//# sourceMappingURL=index.4a2077cd.js.map