/* global NexT, CONFIG */
document.addEventListener("page:loaded",(()=>{const{appid:t,appkey:a}=CONFIG.changyan,n=`https://cy-cdn.kuaizhan.com/upload/plugins/plugins.list.count.js?clientId=${t}`;
// Get the number of comments
setTimeout((()=>NexT.utils.getScript(n,{attributes:{async:!0,id:"cy_cmt_num"}})),0),
// When scroll to comment section
CONFIG.page.comments&&!CONFIG.page.isHome&&NexT.utils.loadComments("#SOHUCS").then((()=>NexT.utils.getScript("https://cy-cdn.kuaizhan.com/upload/changyan.js",{attributes:{async:!0}}))).then((()=>{window.changyan.api.config({appid:t,conf:a})})).catch((t=>{
// eslint-disable-next-line no-console
console.error("Failed to load Changyan",t)}))}));