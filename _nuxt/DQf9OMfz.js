import{l as C,d as v,aZ as S,N as $,o as L,b as r,c as l,aR as f,t as u,aj as h,f as m,e as y,F as z,a7 as A,J as D}from"./DYwEU_Jw.js";const E=async e=>{const n=e.match(/[^\\/]*$/)[0];return await fetch(`http://faas.lionad.art/getmeta?name=${n}`).then(i=>i.text()).then(i=>+i)},q=async e=>{const n=s=>s.replace(/<!--[^-]*-->/gim,"").replace(/<script[^>]*>/gim," <!-- ").replace(/<\/script[\s]*>/gim," --> ").replace(/<!--[^-]*-->/gim,"").replace(/(<a\s+[^>]*)href=/gim,"$1");return await fetch(e).then(s=>s.text()).then(s=>n(s))},M="linkpage fullscreen",k=".linkpage",N=v({props:{type:{type:String,default:"h5"},to:{type:String,default:""},source:{type:String,default:""},label:{type:String,default:""}},setup(e){const n=S(),s=$({loading:!1,slotContent:""}),i=async t=>{if(t.preventDefault(),t.stopPropagation(),console.log(e),e.to){s.loading=!0;try{await E(e.to)<1e5?await this.display():e.source?window.open(e.source):alert("资源体积过大，暂不予展示，敬请谅解")}finally{s.loading=!1}}else window.open(e.source)},g=async()=>{const t=await q(e.to),o=document.createElement("iframe");o.setAttribute("frameborder","0"),o.setAttribute("class",M),o.setAttribute("srcdoc",t),o.setAttribute("style","width: 100vw; height: 100vh; z-index: 999"),document.body.append(o);const a=document.querySelector(k),d=a.shadowRoot||a.document||a,p=({keyCode:b})=>{b===27&&o&&o.remove()};document.addEventListener("keydown",p),d&&d.addEventListener("keydown",p);const w=()=>{o&&o.remove(),p&&(document.removeEventListener("keydown",p),d&&d.addEventListener("keydown",p))};await A(),c(),D(w)},c=()=>{const t=document.querySelector(k),o=t.shadowRoot||t.document||t;(o?[...o.querySelectorAll("a")]:[]).map(d=>d.removeAttribute("href"))};return L(()=>{const t=n.default,o=a=>a.toLowerCase().replace(/\s+/g,"-");t&&(s.slotContent=o(t.text||""))}),{props:e,showpage:i,display:g,disableInnerLink:c}}}),B=["id","href"],F=["textContent"],R={key:1},T=["id","href"],H=["textContent"],V={key:2,style:{display:"content"}},j=["id","href"],I=["textContent"];function J(e,n,s,i,g,c){return r(),l(z,null,[e.props.type?m("",!0):(r(),l("a",{key:0,id:e.slotContent,href:e.to,rel:"noopener noreferrer",target:"_blank",onClick:n[0]||(n[0]=f((...t)=>e.showpage&&e.showpage(...t),["prevent","stop"]))},[e.props.label?(r(),l("span",{key:0,textContent:u(e.props.label)},null,8,F)):h(e.$slots,"default",{key:1})],8,B)),e.props.type==="blockquote"?(r(),l("blockquote",R,[y("p",null,[y("a",{id:e.slotContent,href:e.to,rel:"noopener noreferrer",target:"_blank",onClick:n[1]||(n[1]=f((...t)=>e.showpage&&e.showpage(...t),["prevent","stop"]))},[e.props.label?(r(),l("span",{key:0,textContent:u(e.props.label)},null,8,H)):h(e.$slots,"default",{key:1})],8,T)])])):m("",!0),e.props.type==="h5"?(r(),l("h5",V,[y("a",{id:e.slotContent,href:e.to,rel:"noopener noreferrer",target:"_blank",onClick:n[2]||(n[2]=f((...t)=>e.showpage&&e.showpage(...t),["prevent","stop"]))},[e.props.label?(r(),l("span",{key:0,textContent:u(e.props.label)},null,8,I)):h(e.$slots,"default",{key:1})],8,j)])):m("",!0)],64)}const P=C(N,[["render",J]]);export{P as default};