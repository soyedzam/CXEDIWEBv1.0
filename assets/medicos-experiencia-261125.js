/* CXE medical experience: visible by default, isolated and dependency-free. */
(()=>{const root=document.querySelector('#cx-health');if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');const connection=navigator.connection;const lite=connection?.saveData||/^(slow-2g|2g|3g)$/.test(connection?.effectiveType||'')||(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2);if(lite)root.dataset.lite='';
const active=new Set();let observer;const cancel=()=>{observer?.disconnect();for(const a of active)a.cancel();active.clear();};reduced.addEventListener('change',e=>{if(e.matches)cancel();});if(reduced.matches||lite||!Element.prototype.animate||!window.IntersectionObserver)return;
const animate=(el,frames,opts={})=>{if(reduced.matches||document.hidden)return;const a=el.animate(frames,{duration:700,easing:'cubic-bezier(.22,1,.36,1)',...opts});active.add(a);a.finished.catch(()=>{}).finally(()=>active.delete(a));};
// Keep the headline and its photograph fully readable throughout the entrance.
const hero=root.querySelector('.cx-hero-copy');if(hero)animate(hero,[{transform:'translateY(12px)'},{transform:'translateY(0)'}],{duration:900});
const glow=root.querySelector('.cx-hero');if(glow)animate(glow,[{opacity:.25,transform:'translateX(-18px)'},{opacity:.8,transform:'translateX(0)'}],{pseudoElement:'::after',duration:900});
observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target;observer.unobserve(el);animate(el,[{transform:'translateY(18px)'},{transform:'translateY(0)'}],{delay:Number(el.dataset.cxStagger||0)});}},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
for(const group of root.querySelectorAll('.cx-feature-grid,.cx-pricing-grid'))[...group.children].forEach((el,i)=>{el.dataset.cxStagger=String(Math.min(i*80,160));observer.observe(el);});
for(const el of root.querySelectorAll('.cx-problem .cx-split,.cx-experience-panel,.cx-conversation .cx-split,.cx-short-pact,.cx-diagnostic-grid'))observer.observe(el);
document.addEventListener('visibilitychange',()=>{if(document.hidden)for(const a of active)a.finish();});
})();
