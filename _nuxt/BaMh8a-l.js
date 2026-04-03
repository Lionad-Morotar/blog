import{g as U,s as q,a as V,b as Z,q as j,p as H,_ as o,l as w,c as J,C as K,G as Q,I as X,d as Y,y as ee,D as te}from"./B7ziOCWR.js";import{p as ae}from"./DiIA_bCv.js";import{p as re}from"./ClKqpwZ8.js";import"./Dla2HLJw.js";import{a as G}from"./BqkB4Exa.js";import{o as ie}from"./CmKTTxBW.js";import{p as oe}from"./CDP0c-fb.js";import"./Da5p65sD.js";import"./B6pSGtcJ.js";import"./BKyUJesY.js";import"./CbwjOpE9.js";import"./DRIuyzH_.js";import"./DurbLaub.js";import"./DAp9Uvns.js";import"./BDIF7x-s.js";import"./CE1G-McA.js";import"./Gi6I4Gst.js";var se=te.pie,D={sections:new Map,showData:!1},g=D.sections,C=D.showData,le=structuredClone(se),ne=o(()=>structuredClone(le),"getConfig"),ce=o(()=>{g=new Map,C=D.showData,ee()},"clear"),pe=o(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);g.has(e)||(g.set(e,a),w.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),de=o(()=>g,"getSections"),ge=o(e=>{C=e},"setShowData"),me=o(()=>C,"getShowData"),W={getConfig:ne,clear:ce,setDiagramTitle:H,getDiagramTitle:j,setAccTitle:Z,getAccTitle:V,setAccDescription:q,getAccDescription:U,addSection:pe,getSections:de,setShowData:ge,getShowData:me},ue=o((e,a)=>{ae(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),fe={parse:o(async e=>{const a=await re("pie",e);w.debug(a),ue(a,W)},"parse")},he=o(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=he,Se=o(e=>{const a=[...e.values()].reduce((r,s)=>r+s,0),$=[...e.entries()].map(([r,s])=>({label:r,value:s})).filter(r=>r.value/a*100>=1).sort((r,s)=>s.value-r.value);return oe().value(r=>r.value)($)},"createPieArcs"),xe=o((e,a,$,y)=>{w.debug(`rendering pie chart
`+e);const r=y.db,s=J(),T=K(r.getConfig(),s.pie),A=40,l=18,p=4,c=450,m=c,u=Q(a),n=u.append("g");n.attr("transform","translate("+m/2+","+c/2+")");const{themeVariables:i}=s;let[b]=X(i.pieOuterStrokeWidth);b??=2;const _=T.textPosition,d=Math.min(m,c)/2-A,I=G().innerRadius(0).outerRadius(d),M=G().innerRadius(d*_).outerRadius(d*_);n.append("circle").attr("cx",0).attr("cy",0).attr("r",d+b/2).attr("class","pieOuterCircle");const f=r.getSections(),O=Se(f),P=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let h=0;f.forEach(t=>{h+=t});const E=O.filter(t=>(t.data.value/h*100).toFixed(0)!=="0"),v=ie(P);n.selectAll("mySlices").data(E).enter().append("path").attr("d",I).attr("fill",t=>v(t.data.label)).attr("class","pieCircle"),n.selectAll("mySlices").data(E).enter().append("text").text(t=>(t.data.value/h*100).toFixed(0)+"%").attr("transform",t=>"translate("+M.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),n.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const k=[...f.entries()].map(([t,x])=>({label:t,value:x})),S=n.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(t,x)=>{const F=l+p,L=F*k.length/2,N=12*l,B=x*F-L;return"translate("+N+","+B+")"});S.append("rect").attr("width",l).attr("height",l).style("fill",t=>v(t.label)).style("stroke",t=>v(t.label)),S.append("text").attr("x",l+p).attr("y",l-p).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);const R=Math.max(...S.selectAll("text").nodes().map(t=>t?.getBoundingClientRect().width??0)),z=m+A+l+p+R;u.attr("viewBox",`0 0 ${z} ${c}`),Y(u,c,z,T.useMaxWidth)},"draw"),we={draw:xe},Pe={parser:fe,db:W,renderer:we,styles:ve};export{Pe as diagram};
