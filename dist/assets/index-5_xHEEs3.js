(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var c=(t=>(t[t.Fahrenheit=0]="Fahrenheit",t[t.Celsius=1]="Celsius",t))(c||{});class q extends Error{constructor(e){super(e),this.name="NoCityError"}}function l(t,e){const n=+e.getAttribute("kelvin");t===0?e.textContent=Math.ceil((n-273.15)*9/5+32)+"":e.textContent=Math.ceil(n-273.15)+""}function y(t,e){const n=+e.getAttribute("unixTime"),r=new Date(n*1e3).getHours();t==="12"?e.textContent=`${r%12||12}:00 ${r>=12?"PM":"AM"}`:e.textContent=`${r}: 00`}function x(t){return t.replace(/(\s+$|^\s+)/g,"").replace(/(,\s+)/g,",").replace(/(\s+,)/g,",").replace(/\s+/g,"+")}function C(t){const e=new Date(t*1e3),n={weekday:"long",day:"numeric",month:"long"};return new Intl.DateTimeFormat("en-US",n).format(e)}function f(t){return`https://openweathermap.org/img/wn/${t}@2x.png`}async function L(t){t=x(t);const e=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&APPID=20f7632ffc2c022654e4093c6947b4f4`);if(e.status===404)throw new q(`No city with name ${t} was found`);return(await e.json()).coord}const j="20f7632ffc2c022654e4093c6947b4f4";let g,u={current:{},hourly:[],daily:[]};async function A(t){u={current:{},hourly:[],daily:[]};const e=await L(t);return g=await(await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${e.lat}&lon=${e.lon}&exclude=alerts&appid=${j}`)).json(),await Promise.all([$(t),E(),T()]),u}async function $(t){t=x(t);const n=await(await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&appid=${j}`)).json();u.current={kTemp:Math.floor(+n.main.temp),name:n.name,date:C(+n.dt),desc:n.weather[0].main,img:f(n.weather[0].icon),iconId:n.weather[0].icon}}async function E(){const t=g.daily;for(let e=1;e<=6;e++){const n=t[e];u.daily.push({kTemp:Math.floor(+n.temp.day),img:f(n.weather[0].icon),date:C(+n.dt),desc:n.weather[0].main})}}async function T(){const t=g.hourly;for(let e=0;e<12;e++){const n=t[e];u.hourly.push({kTemp:Math.floor(+n.temp),unixTime:+n.dt,img:f(n.weather[0].icon),desc:n.weather[0].main})}}const I="/weather-app/assets/drizzle-2Avzx933.jpg",M="/weather-app/assets/misty-ivU8LOsT.jpg",N="/weather-app/assets/thunderstorm-xrufQjfc.jpg",F="/weather-app/assets/clear-V6U6Gj5m.jpg",D="/weather-app/assets/cloudy-5OkdGzQr.jpg",P="/weather-app/assets/rain-knM3lChg.jpg",R="/weather-app/assets/shower-rain-urdDbwNt.jpg",z="/weather-app/assets/snowy-xXGYflsG.jpg",O="/weather-app/assets/clear-JXeR9taI.jpg",U="/weather-app/assets/cloudy-M3SKEb8J.jpg",G="/weather-app/assets/rain-EpaiueLM.jpg",H="/weather-app/assets/scattered-Ru7rjtlo.jpg",B="/weather-app/assets/snowy-iLcv8tMi.jpg",o={drizzle:I,misty:M,thunderstorm:N,night:{clear:F,cloudy:D,rain:P,showerRain:R,snowy:z},day:{clear:O,cloudy:U,rain:G,scattered:H,snowy:B}};let i={current:{},hourly:[],daily:[]};async function J(){const t=document.querySelectorAll(".sep-time");for(let e=0;e<t.length;e++){const n=t[e],r=i.hourly[e],a=n.querySelector(".temp");a.setAttribute("kelvin",r.kTemp),l(c.Fahrenheit,a);const s=n.querySelector(".time");s.setAttribute("unixTime",r.unixTime),y("12",s),n.querySelector("img").src=r.img}}async function K(){const t=document.querySelectorAll(".day");for(let e=0;e<t.length;e++){const n=t[e],r=i.daily[e],a=n.querySelector("img"),s=n.querySelector(".day-temp");s.setAttribute("kelvin",r.kTemp),l(c.Fahrenheit,s),a.src=r.img,a.title=r.desc,a.alt=r.desc,n.querySelector("div>span").textContent=r.date}}async function Q(){const t=document.querySelector("#temp-now");t.setAttribute("kelvin",i.current.kTemp),l(c.Fahrenheit,t),document.querySelector("#city").textContent=i.current.name,document.querySelector("#date-now").textContent=i.current.date}function S(t){alert(t)}async function X(t){let e;switch(t){case"11d":case"11n":e=o.thunderstorm;break;case"09d":e=o.drizzle;break;case"09n":e=o.night.showerRain;break;case"10d":e=o.day.rain;break;case"10n":e=o.night.rain;break;case"13d":e=o.day.snowy;break;case"13n":e=o.night.snowy;break;case"50d":case"50n":e=o.misty;break;case"01d":e=o.day.clear;break;case"01n":e=o.night.clear;break;case"02d":case"03d":e=o.day.scattered;break;case"02n":case"03n":case"04n":e=o.night.cloudy;break;case"04d":e=o.day.cloudy;break;default:e=o.day.clear;break}const n=document.querySelector("#container");n.style.backgroundImage=`url('${e}')`}async function w(t){var e;t=t??localStorage.getItem("city")??"New York",(e=document.querySelector("#error"))==null||e.classList.remove("hide");try{i=await A(t),localStorage.setItem("city",t),await Promise.all([Q(),K(),J(),X(i.current.iconId)])}catch(n){if(n instanceof q)S(`No city named '${t}' found`);else throw S("An error occured"),n}}const m=document.querySelector(".fahr"),k=document.querySelector(".cels"),d=document.querySelector("#moving-bg");function Y(){m.classList.contains("now")?(b(c.Fahrenheit),localStorage.setItem("format","eu"),k.classList.add("now"),m.classList.remove("now"),d.classList.remove("left"),d.classList.add("right")):(b(c.Celsius),localStorage.setItem("format","us"),k.classList.remove("now"),m.classList.add("now"),d.classList.add("left"),d.classList.remove("right"))}function b(t){const e=document.querySelectorAll(".temp"),n=document.querySelectorAll(".time");t===c.Fahrenheit?(e.forEach(r=>{l(c.Celsius,r)}),n.forEach(r=>{y("24",r)})):(e.forEach(r=>{l(c.Fahrenheit,r)}),n.forEach(r=>{y("12",r)}))}w();const h=document.querySelector("#search");h.addEventListener("keypress",t=>{t.key==="Enter"&&(t.preventDefault(),w(h.value))});document.querySelector(".find").addEventListener("click",()=>{w(h.value)});var v;(v=document.querySelector(".clear"))==null||v.addEventListener("click",()=>{h.value=""});const V=document.querySelector("#change-temp");V.addEventListener("click",Y);
