(window.webpackJsonp=window.webpackJsonp||[]).push([[303],{407:function(t,e,s){},614:function(t,e,s){"use strict";s(407)},651:function(t,e,s){"use strict";s.r(e);var r={props:{process:String,property:String,value:Array,src:String,compare:!1,layouts:{default:()=>["left","right"]}},data:()=>({methods:[]}),computed:{calcMethods(){if(0===this.methods.length)return[];const t=document.createElement("div");return this.methods.map(e=>{let s,r;e instanceof Object?(s=e.value,r=e.title):(s=e,r=e),t.style.setProperty(this.property,s);return{title:r,value:s,isSupport:t.style[this.property]===s}})}},mounted(){this.methods=this.value}},i=(s(614),s(0)),a=Object(i.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"image-render-cmpt",class:t.process},[t.compare?e("Compare",{ref:"compare"},[t._l(t.calcMethods,(function(s,r){return[e("div",{staticClass:"container",style:{imageRendering:s.value},attrs:{slot:t.layouts[r]},slot:t.layouts[r]},[e("div",{staticClass:"title"},[t._v(t._s(s.title)+t._s(s.isSupport?"":" : Not Support"))]),t._v(" "),e("img",{attrs:{loading:"lazy",src:t.src}})])]}))],2):t._l(t.calcMethods,(function(s,r){return[e("div",{staticClass:"container",style:{imageRendering:s.value}},[e("div",{staticClass:"title"},[t._v(t._s(s.title)+t._s(s.isSupport?"":" : Not Support"))]),t._v(" "),e("img",{attrs:{loading:"lazy",src:t.src}})])]}))],2)}),[],!1,null,"3128a7b5",null);e.default=a.exports}}]);