/* global CONFIG, firebase */
firebase.initializeApp({apiKey:CONFIG.firestore.apiKey,projectId:CONFIG.firestore.projectId}),function(){const e=async(e,t)=>{
// IncreaseCount will be false when not in article page
const o=await e.get();
// Has no data, initialize count
let r=o.exists?o.data().count:0;
// If first view this article
return t&&(
// Increase count
r++,e.set({count:r})),r},t=firebase.firestore().collection(CONFIG.firestore.collection);document.addEventListener("page:loaded",async()=>{if(CONFIG.page.isPost){
// Fix issue #118
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
const o=document.querySelector(".post-title").textContent.trim(),r=t.doc(o);let i=CONFIG.hostname===location.hostname;localStorage.getItem(o)?i=!1:
// Mark as visited
localStorage.setItem(o,!0);const n=await e(r,i);document.querySelector(".firestore-visitors-count").innerText=n}else if(CONFIG.page.isHome){const o=[...document.querySelectorAll(".post-title")].map(o=>{const r=o.textContent.trim(),i=t.doc(r);return e(i)}),r=await Promise.all(o),i=document.querySelectorAll(".firestore-visitors-count");r.forEach((e,t)=>{i[t].innerText=e})}})}();