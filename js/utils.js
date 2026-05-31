/* global NexT, CONFIG */
HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},function(){const e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:!0}));document.addEventListener("DOMContentLoaded",e),document.addEventListener("pjax:success",e)}(),NexT.utils={registerExtURL(){document.querySelectorAll("span.exturl").forEach(e=>{const t=document.createElement("a");
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},registerCopyButton(e,t,n=""){
// One-click copy code support.
e.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const o=e.querySelector(".copy-btn");o.addEventListener("click",async()=>{if(!n){const e=t.querySelector(".code")||t.querySelector("code");n=e.innerText}if(navigator.clipboard)
// https://caniuse.com/mdn-api_clipboard_writetext
try{await navigator.clipboard.writeText(n),o.querySelector("i").className="fa fa-check-circle fa-fw"}catch{o.querySelector("i").className="fa fa-times-circle fa-fw"}else o.querySelector("i").className="fa fa-times-circle fa-fw"}),
// If copycode.style is not mac, element is larger than target
// So we need to accept both of them as parameters
t.addEventListener("mouseleave",()=>{setTimeout(()=>{o.querySelector("i").className="fa fa-copy fa-fw"},300)})},registerCodeblock(e){const t=!!e;let n;n=CONFIG.hljswrap?(t?e:document).querySelectorAll("figure.highlight"):document.querySelectorAll("pre"),n.forEach(e=>{
// Skip pre > .mermaid for folding and copy button
if(e.querySelector(".mermaid"))return;const n=[...e.classList].find(e=>"highlight"!==e);if(!t){let t=e.querySelectorAll(".code .line span");0===t.length&&(
// Hljs without line_number and wrap
t=e.querySelectorAll("code.highlight span")),t.forEach(e=>{e.classList.forEach(t=>{e.classList.replace(t,`hljs-${t}`)})})}const o=parseInt(window.getComputedStyle(e).height,10),i=CONFIG.codeblock.fold.enable&&o>CONFIG.codeblock.fold.height;if(!i&&!CONFIG.codeblock.copy_button.enable&&!CONFIG.codeblock.language)return;let r;if(CONFIG.hljswrap&&"mac"===CONFIG.codeblock.copy_button.style)r=e;else{let t=e.querySelector(".code-container");if(!t){
// https://github.com/next-theme/hexo-theme-next/issues/98
// https://github.com/next-theme/hexo-theme-next/pull/508
const n=e.querySelector(".table-container")||e;t=document.createElement("div"),t.className="code-container",n.wrap(t),
// add "notranslate" to prevent Google Translate from translating it, which also completely messes up the layout
t.classList.add("notranslate")}r=t}if(i&&!r.classList.contains("unfold")&&(r.classList.add("highlight-fold"),r.insertAdjacentHTML("beforeend",'<div class="fold-cover"></div><div class="expand-btn"><i class="fa fa-angle-down fa-fw"></i></div>'),r.querySelector(".expand-btn").addEventListener("click",()=>{r.classList.remove("highlight-fold"),r.classList.add("unfold")})),!t&&CONFIG.codeblock.copy_button.enable&&this.registerCopyButton(r,e),!t&&CONFIG.codeblock.language&&n){const e=document.createElement("div");e.className="code-lang",e.innerText=n.toUpperCase(),r.insertAdjacentElement("afterbegin",e)}})},wrapTableWithBox(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe(){document.querySelectorAll("iframe").forEach(e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(t=>e.src.includes(t))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);const n=Number(e.width),o=Number(e.height);n&&o&&(t.style.paddingTop=o/n*100+"%")}})},updateActiveNav(){if(!Array.isArray(this.sections))return;let e=this.sections.findIndex(e=>e?.getBoundingClientRect().top>10);-1===e?e=this.sections.length-1:e>0&&e--,this.activateNavByIndex(e)},registerScrollPercent(){const e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");
// For init back to top in sidebar if page was scrolled after page refresh.
window.addEventListener("scroll",()=>{if(e||t){const n=document.body.scrollHeight-window.innerHeight,o=n>0?Math.min(100*window.scrollY/n,100):0;e&&(e.classList.toggle("back-to-top-on",Math.round(o)>=5),e.querySelector("span").innerText=Math.round(o)+"%"),t&&t.style.setProperty("--progress",o.toFixed(2)+"%")}this.updateActiveNav()},{passive:!0}),e?.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},
/**
   * Tabs tag listener (without twitter bootstrap).
   */
registerTabsTag(){
// Binding `nav-tabs` & `tab-content` by real time permalink changing.
document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",t=>{
// Prevent selected tab to select again.
if(t.preventDefault(),e.classList.contains("active"))return;const n=e.parentNode,o=n.nextElementSibling;
// Get the height of `tab-pane` which is activated before, and set it as the height of `tab-content` with extra margin / paddings.
o.style.overflow="hidden",o.style.transition="height 1s";
// Comment system selection tab does not contain .active class.
const i=o.querySelector(".active")||o.firstElementChild,r=parseInt(window.getComputedStyle(i).height,10)||0,c=parseInt(window.getComputedStyle(i).paddingTop,10),s=parseInt(window.getComputedStyle(i.firstElementChild).marginBottom,10);
// Hight might be `auto`.
o.style.height=r+c+s+"px",
// Add & Remove active class on `nav-tabs` & `tab-content`.
[...n.children].forEach(t=>{t.classList.toggle("active",t===e)});
// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
const a=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""));[...a.parentNode.children].forEach(e=>{e.classList.toggle("active",e===a)}),
// Trigger event
a.dispatchEvent(new Event("tabs:click",{bubbles:!0}));
// Get the height of `tab-pane` which is activated now.
const l=document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight),d=parseInt(window.getComputedStyle(o.querySelector(".active")).height,10);if(
// Reset the height of `tab-content` and see the animation.
o.style.height=d+c+s+"px",
// Change the height of `tab-content` may cause scrollbar show / disappear, which may result in the change of the `tab-pane`'s height
setTimeout(()=>{if(document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)!==l){o.style.transition="height 0.3s linear";
// After the animation, we need reset the height of `tab-content` again.
const e=parseInt(window.getComputedStyle(o.querySelector(".active")).height,10);o.style.height=e+c+s+"px"}
// Remove all the inline styles, and let the height be adaptive again.
setTimeout(()=>{o.style.transition="",o.style.height=""},250)},1e3),!CONFIG.stickytabs)return;const u=n.parentNode.getBoundingClientRect().top+window.scrollY+10;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:u})})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag(){
// Get responsive height passed from iframe.
window.addEventListener("message",({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){const t=e.split(":")[1],n=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(n,10)+5+"px"}},!1)},registerActiveMenuItem(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))})},registerLangSelect(){document.querySelectorAll(".lang-select").forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),
// Disable Pjax to force refresh translation of menu item
window.location.href=t.dataset.href})})},registerSidebarTOC(){this.sections=[...document.querySelectorAll(".post-toc:not(.placeholder-toc) li a.nav-link")].map(e=>{const t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));
// TOC item animation navigate.
return e.addEventListener("click",n=>{n.preventDefault();const o=t.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o,complete:()=>{history.pushState(null,document.title,e.href)}})}),t}),this.updateActiveNav()},registerPostReward(){const e=document.querySelector(".reward-container button");e&&e.addEventListener("click",()=>{document.querySelector(".post-reward").classList.toggle("active")})},activateNavByIndex(e){const t=document.querySelector(".post-toc:not(.placeholder-toc) .nav");if(!t)return;const n=t.querySelectorAll(".nav-item"),o=n[e];if(!o||o.classList.contains("active-current"))return;const i=n[n.length-1].offsetHeight;t.querySelectorAll(".active").forEach(e=>{e.classList.remove("active","active-current")}),o.classList.add("active","active-current");let r=o.querySelector(".nav-child")||o.parentElement,c=0;for(;t.contains(r);)r.classList.contains("nav-item")?r.classList.add("active"):(// .nav-child or .nav
// scrollHeight isn't reliable for transitioning child items.
// The last nav-item in a list has a margin-bottom of 5px.
c+=i*r.childElementCount+5,r.style.setProperty("--height",`${c}px`)),r=r.parentElement;
// Scrolling to center active TOC element if TOC content is taller then viewport.
const s=document.querySelector("Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme?".sidebar-panel-container":".sidebar");document.querySelector(".sidebar-toc-active")&&window.anime({targets:s,duration:200,easing:"linear",scrollTop:s.scrollTop-s.offsetHeight/2+o.getBoundingClientRect().top-s.getBoundingClientRect().top})},updateSidebarPosition(){if(window.innerWidth<1200||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)return;
// Expand sidebar on post detail page by default, when post has a toc.
const e=document.querySelector(".post-toc:not(.placeholder-toc)");let t=CONFIG.page.sidebar;"boolean"!=typeof t&&(
// There's no definition sidebar in the page front-matter.
t="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&e),t&&window.dispatchEvent(new Event("sidebar:show"))},activateSidebarPanel(e){const t=document.querySelector(".sidebar-inner"),n=["sidebar-toc-active","sidebar-overview-active"];if(t.classList.contains(n[e]))return;const o=t.querySelector(".sidebar-panel-container"),i=o.firstElementChild,r=o.lastElementChild;let c=i.scrollHeight;
// For TOC activation, try to use the animated TOC height
if(0===e){const e=i.querySelector(".nav");e&&(c=parseInt(e.style.getPropertyValue("--height"),10))}const s=[c,r.scrollHeight];o.style.setProperty("--inactive-panel-height",`${s[1-e]}px`),o.style.setProperty("--active-panel-height",`${s[e]}px`),t.classList.replace(n[1-e],n[e])},updateFooterPosition(){function e(){const e=document.querySelector(".footer"),t=document.querySelector(".main").offsetHeight+e.offsetHeight;e.classList.toggle("footer-fixed",t<=window.innerHeight)}"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme&&(e(),window.addEventListener("resize",e),window.addEventListener("scroll",e,{passive:!0}))},
/**
   * Sets the CSS variable '--dialog-scrollgutter' to the specified gap value.
   * If no gap is provided, it calculates the gap as the difference between
   * the window's inner width and the document body's client width.
   *
   * @param {string} [gap] - The gap value to be set. If not provided, the
   *                         default gap is calculated automatically.
   */
setGutter(e){document.body.style.setProperty("--dialog-scrollgutter",e||window.innerWidth-document.body.clientWidth+"px")},getScript(e,t={},n){if("function"==typeof t)return this.getScript(e,{condition:n}).then(t);const{condition:o=!1,attributes:{id:i="",defer:r=!1,crossOrigin:c="",dataset:s={},...a}={},parentNode:l=null}=t,d=t.async??!1;return new Promise((t,n)=>{if(o)t();else{const o=document.createElement("script");if(i&&(o.id=i),c&&(o.crossOrigin=c),o.async=d,o.defer=r,Object.assign(o.dataset,s),Object.entries(a).forEach(([e,t])=>{o.setAttribute(e,String(t))}),o.onload=t,o.onerror=n,"object"==typeof e){const{url:t,integrity:n}=e;o.src=t,n&&(o.integrity=n,o.crossOrigin="anonymous")}else o.src=e;(l||document.head).appendChild(o)}})},loadComments(e,t){return t?this.loadComments(e).then(t):new Promise(t=>{const n=document.querySelector(e);if(!CONFIG.comments.lazyload||!n)return void t();new IntersectionObserver((e,n)=>{e[0].isIntersecting&&(t(),n.disconnect())}).observe(n)})},debounce(e,t){let n;return function(...o){const i=this;clearTimeout(n),n=setTimeout(()=>e.apply(i,o),t)}}};