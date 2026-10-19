const CACHE='u39-concept-v045-bypass-20261019';
const FILES=["./", "./index.html", "./refinement.js", "./enhancement-v03.js", "./sim-v03.js", "./v04.js", "./v04.css", "./question-bank-v04.json", "./lab-bank-v04.json", "./sim-bank-v04.json", "./QA-AVALIACAO-V04.md", "./README.md", "./manifest.webmanifest", "./install-v041.js", "./install-v041.css", "./bypass-avancado-conteudo-v1.js", "./bypass-avancado-v1.js", "./bypass-avancado-v1.css", "./icons/icon-152.png", "./icons/icon-192.png", "./icons/icon-512.png", "./sources.json", "./assets/39GR0051_M.Intertravamento conversor.png", "./assets/39GR0052_MIntertravamento J -3901.png", "./assets/39GR0053_MIntertravamento B-3901.png", "./assets/39GR0054_M.png", "./assets/39GR0057_M.png", "./assets/39GR0058_MIntertravamento GV-3901.png", "./assets/39GR0068_M.png", "./assets/39GW0004_M.png", "./assets/39GW0014_M.png", "./assets/39GW0039_M.png", "./assets/39GR0008_M(1).png", "./assets/39GR0009_M(1).png", "./assets/39GR0011_M.png", "./assets/39GR0030_M.png", "./assets/39GR0031_M.png", "./assets/39GR0039_M.png", "./assets/39GR0060_M.png", "./assets/39GR0016_M.png", "./assets/39GW0010_Manti surge J-3902.png"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Priorizar HTML atualizado online, sem perder acesso offline.
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{
   if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}
   return response;
  }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));
  return;
 }
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));
});
