(window.webpackJsonp=window.webpackJsonp||[]).push([[314],{418:function(t,e,s){},625:function(t,e,s){"use strict";s(418)},669:function(t,e,s){"use strict";s.r(e);s(15);var i={name:"task-slice-cmpt",components:{calc:{mounted(){const t=[...Array(2e3)].map(t=>~~(2e3*Math.random()));t.slice().sort((t,e)=>t-e)},render:t=>t("span")}},data:()=>({updateMethod:2,fps:0,list:Array.apply(null,{length:400}).map((t,e)=>e),stopChangeBase:!1,sliceBase:10,sliceBaseProtect:10,sliceUpdateRec:[]}),mounted(){const t=window.setInterval(()=>{const t=Array.apply(null,{length:400}).map((t,e)=>Math.floor(360*Math.random()));this.updateList(t)},600);this.$once("hook:beforeDestroy",()=>{window.clearInterval(t)}),this.updateList(Array.apply(null,{length:400}).map((t,e)=>Math.floor(360*Math.random())))},methods:{updateList(t){switch(this.updateMethod){case 1:console.time(),this.list=t,this.$nextTick(()=>{console.timeEnd()});break;case 2:this.sliceUpdate(t)}},sliceUpdate(t){const e=String(Math.random()).slice(-6),s={id:e,run:!0};this.sliceUpdateRec.length&&(this.sliceUpdateRec[this.sliceUpdateRec.length-1].run=!1),this.sliceUpdateRec.push(s),this.sliceBase=40,this.sliceBaseProtect=40;const i=()=>{this.stopChangeBase||(this.fps>15?this.inc():this.dec());const a=t.slice(0,this.sliceBase),c=400-(t=t.slice(this.sliceBase)).length-a.length;this.list.splice(c,a.length,...a),t.length&&s.run?setTimeout(i,1e3/180):console.timeEnd(e)};console.time(e),i()},inc(){this.sliceBase*=2},dec(){this.sliceBase>this.sliceBaseProtect&&(this.sliceBase=Math.floor(this.sliceBase/2))},updateFPS(t){this.fps=t},useMethod(t){this.updateMethod!==t?this.updateMethod=t:this.updateMethod=null}}},a=(s(625),s(0)),c=Object(a.a)(i,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"task-slice-cmpt"},[e("div",{staticClass:"circle-con"},[e("div",{staticClass:"fps-container"},[e("FPS",{on:{onFPS:t.updateFPS}})],1),t._v(" "),t._l(t.list,(function(t){return e("div",{staticClass:"circle",style:{transform:`rotate(${t}deg)`}},[e("calc",{key:t})],1)}))],2),t._v(" "),e("div",{staticClass:"btns-con"},[e("button",{class:1===t.updateMethod?"active":"",on:{click:()=>t.useMethod(1)}},[t._v(t._s(1===t.updateMethod?"Using: ":"")+" 全量更新")]),t._v(" "),e("button",{class:2===t.updateMethod?"active":"",staticStyle:{"margin-left":"1em"},on:{click:()=>t.useMethod(2)}},[t._v(t._s(2===t.updateMethod?"Using: ":"")+" 任务切片更新")])])])}),[],!1,null,"c2a42792",null);e.default=c.exports}}]);