/* global NexT, CONFIG, mermaid */
document.addEventListener("page:loaded",(()=>{const e=document.querySelectorAll(".mermaid");e.length&&NexT.utils.getScript(CONFIG.mermaid.js,{condition:window.mermaid}).then((()=>{e.forEach((e=>{const a=document.createElement("div");a.innerHTML=e.innerHTML,a.className=e.className;const r=e.parentNode;
// Fix issue #347
// Support mermaid inside backtick code block
r.matches("pre")?r.parentNode.replaceChild(a,r):r.replaceChild(a,e)})),mermaid.initialize({theme:CONFIG.darkmode&&window.matchMedia("(prefers-color-scheme: dark)").matches?CONFIG.mermaid.theme.dark:CONFIG.mermaid.theme.light,logLevel:4,flowchart:{curve:"linear"},gantt:{axisFormat:"%m/%d/%Y"},sequence:{actorMargin:50}}),mermaid.run()}))}));