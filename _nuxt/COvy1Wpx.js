import{k as I,c as _,e as f,ah as L,d as Y,aQ as E,aS as D,r as w,o as S,f as t,i as M,w as C,C as p,n as X,aT as A,t as g,g as N,F as W,af as U,q as $}from"./BJyi3eM_.js";const P=["Android","iPhone","Windows Phone","iPad","iPod"],O=P.some(e=>navigator!=null&&navigator.userAgent?navigator.userAgent.indexOf(e)!==-1:!1),v={touchstart:"onMouseDown",mousedown:"onMouseDown",touchend:"onMouseUp",mouseup:"onMouseUp",touchmove:"onMouseMove",mousemove:"onMouseMove",touchcancel:"onMouseUp",wheel:"onMouseWheel",mousewheel:"onMouseWheel",mouseenter:"onMouseEnter",mouseleave:"onMouseLeave"},x=["hover","hoverOut","tap","swipeUp","swipeDown"],B={name:"GestureCmpt",props:{...x.reduce((e,s)=>(e[s]=Function,e),{}),hoverTime:{type:[Number,String],default:100},enableMouse:{type:Boolean,default:!0},enableMouseWheel:{type:Boolean,default:!0},judgeConfig:{type:Object,default:()=>({tapTimeInterval:300,tapOffsetThresholdSquared:25,swipeOffsetThreshold:80})},freezeTime:{type:[Number,String],default:1e3/30},eventInvoke:{type:Function,default:()=>{}}},data(){return{touchstartTime:0,touchendTime:0,touchstartCoord:{},touchendCoord:{},wheelOffset:0,mouseEnterTime:null,mouseLeaveTime:null,hoverTick:null,lastTouchendTime:0,lastTouchstartTime:0,lastTouchstartCoord:{},lastTouchendCoord:{},lastWheelOffset:0,shouldInit:null,ele:null,events:{listens:[]}}},computed:{timeInterval(){return this.touchendTime-this.touchstartTime},pageXOffset(){return this.touchendCoord.pageX-this.touchstartCoord.pageX},pageXOffsetAbs(){return Math.abs(this.pageXOffset)},pageYOffset(){return this.touchendCoord.pageY-this.touchstartCoord.pageY},pageYOffsetAbs(){return Math.abs(this.pageYOffset)},lastTimeInterval(){return this.lastTouchendTime-this.lastTouchstartTime},lastPageXOffset(){return this.touchendCoord.pageX-this.touchstartCoord.pageX},lastPageYOffset(){return this.touchendCoord.pageY-this.touchstartCoord.pageY},deltaTime(){return this.touchendTime-this.lastTouchstartTim},mouseHoverTime(){return this.mouseLeaveTime-this.mouseEnterTime}},mounted(){this.shouldInit=Object.keys(this.$props).find(e=>x.includes(e)&&this[e]),this.shouldInit&&(this.calcEventsName(),this.ele=this.$refs.gesture,this.events.listens.map(e=>{this.ele.addEventListener(e,this[v[e]])}))},beforeUnmount(){this.shouldInit&&this.events.listens.map(e=>{this.ele.removeEventListener(e,this[v[e]])})},methods:{onMouseEnter(e){!this.mouseEnterTime&&!this.mouseLeaveTime&&this.recordEnter(e),this.eventInvoke(e)},recordEnter(e){this.mouseEnterTime=e.timeStamp,this.hoverTick=setTimeout(()=>{this.recordLeave({timeStamp:+new Date+1/0})},this.hoverTime)},onMouseLeave(e){this.recordLeave(e)},recordLeave(e){this.mouseEnterTime&&!this.mouseLeaveTime&&(this.mouseLeaveTime=e.timeStamp),this.calcGestures(),this.hoverTick&&clearTimeout(this.hoverTick)},onMouseDown(e){this.onRecordMove(e),this.eventInvoke(e)},onRecordMove(e){this.recordDown(e),this.triggerMove()},recordDown(e){this.lastTouchstartTime=this.touchstartTime,this.touchstartTime=e.timeStamp;const s=e.touches?e.touches[0]:e;this.lastTouchstartCoord=this.touchstartCoord,this.touchstartCoord={pageX:s.pageX,pageY:s.pageY}},triggerMove(){this.events.moves.map(e=>{this.ele.addEventListener(e,this[v[e]])})},onMouseMove(e){this.eventInvoke(e)},onMouseWheel(e){this.lastWheelOffset=this.wheelOffset;const s=e.wheelDelta&&e.deltaY?e.wheelDelta*-1:event.deltaY;this.wheelOffset=s,this.calcGestures(),this.eventInvoke(e)},onMouseUp(e){this.recordUp(e),this.calcGestures(),this.unTriggerMove(),this.eventInvoke(e)},recordUp(e){this.lastTouchendTime=this.touchendTime,this.touchendTime=e.timeStamp;const s=e.changedTouches?e.changedTouches[0]:e;this.lastTouchendCoord=this.touchendCoord,this.touchendCoord={pageX:s.pageX,pageY:s.pageY}},unTriggerMove(){this.events.moves.map(e=>{this.ele.removeEventListener(e,this[v[e]])})},calcGestures:function(){let e=0;return function(){const s=+Date.now();if(s-e<+this.freezeTime)return;e=s;const{tapTimeInterval:h,tapOffsetThresholdSquared:i,swipeOffsetThreshold:r}=this.judgeConfig,d={hover:()=>this.mouseHoverTime>=+this.hoverTime,hoverOut:()=>!0,tap:()=>this.timeInterval<h&&this.pageXOffset**2<i,swipeUp:()=>{const l=this.timeInterval<h&&this.pageYOffsetAbs>this.pageXOffsetAbs&&this.pageYOffset>r,u=this.enableMouse&&this.wheelOffset<0;return l||u},swipeDown:()=>{const l=this.timeInterval<h&&this.pageYOffsetAbs>this.pageXOffsetAbs&&this.pageYOffset<r,u=this.enableMouse&&this.wheelOffset>0;return l||u}},m=x.find(l=>this[l]&&d[l]&&d[l]()&&(()=>this[l]()));m&&this[m](),this.reset()}}(),reset(){this.touchstartTime=null,this.touchendTime=null,this.touchstartCoord={},this.touchendCoord={},this.wheelOffset=0,this.mouseEnterTime=null,this.mouseLeaveTime=null,this.lastTouchendTime=null,this.lastTouchstartTime=null,this.lastTouchstartCoord={},this.lastTouchendCoord={},this.lastWheelOffset=0},calcEventsName(){const e=[...O?["touchstart","touchend","touchcancel"]:this.enableMouse?["mousedown","mouseup","mouseenter","mouseleave"]:[],...this.enableMouseWheel?["onwheel"in document?"wheel":"mousewheel"]:[]],s=[...O?["touchmove"]:[],...this.enableMouse?["mousemove"]:[]];this.events={listens:e,moves:s}}}},G={ref:"gesture"};function H(e,s,h,i,r,d){return _(),f("div",G,[L(e.$slots,"default")],512)}const R=I(B,[["render",H]]),j={class:"parallax__layer parallax__layer__0"},q=["src"],z={class:"parallax__layer parallax__layer__1"},F=["src"],V={class:"parallax__layer parallax__layer__2"},Q=["src"],J={class:"parallax__layer parallax__layer__3"},K=["src"],Z={class:"parallax__layer parallax__layer__4"},ee=["src"],te={class:"parallax__layer parallax__layer__5"},se=["src"],ae={class:"parallax__layer parallax__layer__6"},oe=["src"],le={class:"wrapper wrapper-detail"},ie={class:"card"},ne={class:"bio"},re={class:"head"},he={class:"info"},ue={class:"wrapper wrapper-brief"},ce={class:"page-title-con"},de={class:"page-side-content"},pe=["textContent"],me={class:"article-list-content"},ge=["href","textContent"],ve=Y({__name:"index",async setup(e){let s,h;const{data:i}=([s,h]=E(()=>A("index",()=>$("/").findOne())),s=await s,h(),s);D({title:i.value.title,ogTitle:i.value.title,description:i.value.description,ogDescription:i.value.description});const r=w(),d=["brief","detail"],m=w(d[0]),l=function(){return function(a){if(+Date.now()-0<500)return;const c=["up","down"].findIndex(k=>k===a);m.value=d[c];const b=[0,u.value][c];r.value.scrollTo?r.value.scrollTo(0,b):r.value.scrollTop=b}}(),u=w();S(()=>{setTimeout(()=>{const n=document.querySelector(".parallax");u.value=n.scrollHeight-n.clientHeight})});function T(n){(n.type==="touchmove"||n.type==="mousemove")&&(n.preventDefault(),n.stopPropagation())}const o={parallax_0:{sort:0,delay:100*6,value:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_0.png",done:!1,cb:()=>o.parallax_0.done=!0},parallax_1:{sort:1,delay:100*5,value:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_1.png",done:!1,cb:()=>o.parallax_1.done=!0},parallax_2:{sort:2,delay:100*4,value:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_2.png",done:!1,cb:()=>o.parallax_2.done=!0},parallax_3:{sort:3,delay:100*3,value:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_3.png",done:!1,cb:()=>o.parallax_3.done=!0},parallax_4:{sort:4,delay:100*2,value:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_4.png",done:!1,cb:()=>o.parallax_4.done=!0},parallax_5:{sort:5,delay:100*1,value:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_5.png",done:!1,cb:()=>o.parallax_5.done=!0},parallax_6:{sort:6,delay:100*0,value:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/homepage/layer_6.png",done:!1,cb:()=>o.parallax_6.done=!0}};return(n,a)=>{const y=R;return _(),f("div",{class:X(["home-page",p(m)])},[t("div",{ref_key:"parallaxRef",ref:r,class:"parallax"},[t("div",j,[t("img",{src:o.parallax_0.value,alt:"云朵背景图片",class:"cloud animation",draggable:"false"},null,8,q)]),t("div",z,[t("img",{src:o.parallax_1.value,alt:"山岳背景图片",draggable:"false"},null,8,F)]),t("div",V,[t("img",{src:o.parallax_2.value,alt:"山岳背景图片",draggable:"false"},null,8,Q)]),t("div",J,[t("img",{src:o.parallax_3.value,alt:"山岳背景图片",draggable:"false"},null,8,K)]),t("div",Z,[t("img",{src:o.parallax_4.value,alt:"山岳背景图片",draggable:"false"},null,8,ee)]),t("div",te,[t("img",{src:o.parallax_5.value,alt:"山岳背景图片",draggable:"false"},null,8,se)]),t("div",ae,[t("img",{src:o.parallax_6.value,alt:"山岳背景图片",draggable:"false"},null,8,oe)]),a[0]||(a[0]=t("div",{class:"parallax__cover"},null,-1))],512),M(y,{"swipe-up":()=>p(l)("up"),"freeze-time":"300","event-invoke":T},{default:C(()=>[t("div",le,[a[3]||(a[3]=t("div",{class:"avatar"},[t("img",{src:"https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/avatar.gif",alt:"Lionad's Avatar",draggable:"false"})],-1)),t("div",ie,[t("div",ne,[t("div",re,[t("span",null,g(p(i).title),1)]),t("div",he,[t("span",null,g(p(i).info),1)]),a[1]||(a[1]=t("div",{class:"description"},[N(" 前端偏甜工程师 | 兴趣泛滥 | 逃离地球 | "),t("del",null,[t("a",{href:"/flows/long-night-dream.html",style:{color:"inherit"}},"午夜吉他恶魔")])],-1))]),a[2]||(a[2]=t("div",{class:"buttons"},[t("div",{class:"into-article"},[t("a",{id:"into-article",href:"/articles"},"进入博客")])],-1))])])]),_:1},8,["swipe-up"]),M(y,{"swipe-down":()=>p(l)("down"),"freeze-time":"300","event-invoke":T},{default:C(()=>[t("div",ue,[t("div",ce,[a[4]||(a[4]=t("div",{class:"page-title"}," Lionad's Blog ",-1)),a[5]||(a[5]=t("div",{class:"page-side-title"}," Newest Posts ",-1)),t("div",de,[(_(!0),f(W,null,U(p(i).recommends,c=>(_(),f("p",{key:c.to,class:"article-list"},[t("span",{class:"article-list-label",textContent:g(c.category+"：")},null,8,pe),t("span",me,[t("a",{href:c.to,textContent:g(c.label)},null,8,ge)])]))),128))]),a[6]||(a[6]=t("div",{class:"page-tip"}," 向下滑动 ",-1))])])]),_:1},8,["swipe-down"])],2)}}}),fe=I(ve,[["__scopeId","data-v-b8b4d30a"]]);export{fe as default};