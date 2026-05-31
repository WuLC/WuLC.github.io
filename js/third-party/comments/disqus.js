/* global NexT, CONFIG, DISQUS */
document.addEventListener("page:loaded",async()=>{CONFIG.disqus.count&&(window.DISQUSWIDGETS?window.DISQUSWIDGETS.getCount({reset:!0}):
// Defer loading until the whole page loading is completed
NexT.utils.getScript(`https://${CONFIG.disqus.shortname}.disqus.com/count.js`,{attributes:{id:"dsq-count-scr",defer:!0}})),CONFIG.page.comments&&(
// `disqus_config` should be a global variable
// See https://help.disqus.com/en/articles/1717084-javascript-configuration-variables
window.disqus_config=function(){this.page.url=CONFIG.page.permalink,this.page.identifier=CONFIG.page.path,this.page.title=CONFIG.page.title,"disqus"!==CONFIG.disqus.i18n.disqus&&(this.language=CONFIG.disqus.i18n.disqus)},await NexT.utils.loadComments("#disqus_thread"),window.DISQUS?DISQUS.reset({reload:!0,config:window.disqus_config}):NexT.utils.getScript(`https://${CONFIG.disqus.shortname}.disqus.com/embed.js`,{attributes:{dataset:{timestamp:""+ +new Date}}}))});