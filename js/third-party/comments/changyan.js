/* global NexT, CONFIG */
document.addEventListener("page:loaded",async()=>{const{appid:a,appkey:t}=CONFIG.changyan,n=`https://cy-cdn.kuaizhan.com/upload/plugins/plugins.list.count.js?clientId=${a}`;
// When scroll to comment section
if(
// Get the number of comments
setTimeout(()=>NexT.utils.getScript(n,{attributes:{async:!0,id:"cy_cmt_num"}}),0),CONFIG.page.comments&&!CONFIG.page.isHome)try{await NexT.utils.loadComments("#SOHUCS"),await NexT.utils.getScript("https://cy-cdn.kuaizhan.com/upload/changyan.js",{attributes:{async:!0}}),window.changyan.api.config({appid:a,conf:t})}catch(a){
// eslint-disable-next-line no-console
console.error("Failed to load Changyan",a)}});