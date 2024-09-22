/* global CONFIG, firebase */
firebase.initializeApp({apiKey:CONFIG.firestore.apiKey,projectId:CONFIG.firestore.projectId}),function(){const e=(e,t)=>e.get().then((o=>{
// Has no data, initialize count
let r=o.exists?o.data().count:0;
// If first view this article
return t&&(
// Increase count
r++,e.set({count:r})),r})),t=firebase.firestore().collection(CONFIG.firestore.collection);document.addEventListener("page:loaded",(()=>{if(CONFIG.page.isPost){
// Fix issue #118
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
const o=document.querySelector(".post-title").textContent.trim(),r=t.doc(o);let n=CONFIG.hostname===location.hostname;localStorage.getItem(o)?n=!1:
// Mark as visited
localStorage.setItem(o,!0),e(r,n).then((e=>{document.querySelector(".firestore-visitors-count").innerText=e}))}else if(CONFIG.page.isHome){const o=[...document.querySelectorAll(".post-title")].map((o=>{const r=o.textContent.trim(),n=t.doc(r);return e(n)}));Promise.all(o).then((e=>{const t=document.querySelectorAll(".firestore-visitors-count");e.forEach(((e,o)=>{t[o].innerText=e}))}))}}))}();