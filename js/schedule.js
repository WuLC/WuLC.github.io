/* global CONFIG */
// https://developers.google.com/calendar/api/v3/reference/events/list
!function(){
// Initialization
const e={orderBy:"startTime",showLocation:!1,offsetMax:72,offsetMin:4,showDeleted:!1,singleEvents:!0,maxResults:250};
// Read config form theme config file
Object.assign(e,CONFIG.calendar);const t=new Date,n=new Date,s=new Date;n.setHours(t.getHours()+e.offsetMax),s.setHours(t.getHours()-e.offsetMin);
// Build URL
const a={key:e.api_key,orderBy:e.orderBy,timeMax:n.toISOString(),timeMin:s.toISOString(),showDeleted:e.showDeleted,singleEvents:e.singleEvents,maxResults:e.maxResults},o=new URL(`https://www.googleapis.com/calendar/v3/calendars/${e.calendar_id}/events`);function r(n,s,a,o){const r={weekday:"short",hour:"2-digit",minute:"2-digit"},i="now"===n?"NOW":function(e,t){const n=36e5,s=864e5,a=2592e6,o=31536e6;let r=e-t;const i=r>0?" ago":" later";return r=Math.abs(r),r<n?Math.round(r/6e4)+" minutes"+i:r<s?Math.round(r/n)+" hours"+i:r<a?"about "+Math.round(r/s)+" days"+i:r<o?"about "+Math.round(r/a)+" months"+i:"about "+Math.round(r/o)+" years"+i}(t,a),c=a.toLocaleTimeString([],r)+" - "+o.toLocaleTimeString([],r);let d="";e.showLocation&&s.location&&(d=`<span class="event-location event-details">${s.location}</span>`);let l="";s.description&&(l=`<span class="event-description event-details">${s.description}</span>`);return`<section class="event event-${n}">\n        <h2 class="event-summary">\n          ${s.summary}\n          <span class="event-relative-time">${i}</span>\n        </h2>\n        ${d}\n        <span class="event-duration event-details">${c}</span>\n        ${l}\n      </section>`}async function i(){const e=document.querySelector(".event-list");if(e)try{const n=await fetch(o.href),s=await n.json();if(0===s.items.length)return void(e.innerHTML="<hr>");
// Clean the event list
e.innerHTML="";let a=0;// used to decide where to insert an <hr>
const i=6e4*(new Date).getTimezoneOffset();s.items.forEach(n=>{
// Parse data
const s=new Date(n.start.dateTime||new Date(n.start.date).getTime()+i),o=new Date(n.end.dateTime||new Date(n.end.date).getTime()+i);let c="now";o<t?c="past":s>t&&(c="future"),"future"===c&&a<t&&e.insertAdjacentHTML("beforeend","<hr>"),e.insertAdjacentHTML("beforeend",r(c,n,s,o)),a=o})}catch(e){
// eslint-disable-next-line no-console
console.error("Error fetching calendar data:",e)}}Object.entries(a).forEach(e=>o.searchParams.append(...e)),i();const c=setInterval(i,6e4);document.addEventListener("pjax:send",()=>{clearInterval(c)})}();