(window.webpackJsonp=window.webpackJsonp||[]).push([[343],{297:function(t,s,i){"use strict";i(15),i(123);class e{constructor({x:t,y:s,width:i=1,color:e=0,ctx:n}){this.x=t,this.y=s,this.width=i,this.color=e,this.lines=[],n?this.init(n):this.ctx=null}set(t){return t.hasOwnProperty("x")&&(this.x=t.x),t.hasOwnProperty("y")&&(this.y=t.y),t.hasOwnProperty("width")&&(this.width=t.width),t.hasOwnProperty("color")&&(this.color=t.color),this}init(t){return this.ctx=t,this}copy(){return new e(this).init(this.ctx)}get vertexes(){return[this]}draw(){return this.ctx.stroke(this.color),this.ctx.strokeWeight(this.width),this.ctx.point(this.x,this.y),this.lines.map(t=>{const[s,i,e,n]=t;this.ctx.stroke(n),this.ctx.strokeWeight(e),this.ctx.line(this.x,this.y,s,i)}),this}distance(t){const{x:s,y:i}=t,e=this.x-s,n=this.y-i;return this.ctx.sqrt(e**2+n**2)}lineTo(t,s=this.width,i=this.color){const{x:e,y:n}=t;return this.lines.push([e,n,s,i]),this}rotate(t,s){s||(s=t,t={x:0,y:0});const i=this.ctx,e=this.x-t.x,n=this.y-t.y,r=t.x+i.cos(s)*e-i.sin(s)*n,h=t.y+i.sin(s)*e+i.cos(s)*n;return this.set({x:r,y:h})}lerp(t,s){return new e({x:this.x+(t.x-this.x)*s,y:this.y+(t.y-this.y)*s})}}class n{constructor({x:t=0,y:s=0}={x:0,y:0}){this.ctx=Math,this.x=t,this.y=s}init(t){return this.ctx=t,this}copy(){return new n(this)}normalize(){const t=this.mag();return 0!==t&&1!==t?this.div(t):this.copy()}mag(t){return void 0!==t?this.normalize().mult(t):this.ctx.sqrt(this.x**2+this.y**2)}heading(){return this.ctx.atan2(this.y,this.x)}add({x:t,y:s}){return new n({x:this.x+t,y:this.y+s})}sub({x:t,y:s}){return new n({x:this.x-t,y:this.y-s})}mult(t){return new n({x:this.x*t,y:this.y*t})}div(t){return new n({x:this.x/t,y:this.y/t})}dot({x:t,y:s}){return this.x*t+this.y*s}cross({x:t,y:s}){return this.x*s-this.y*t}limit(t){return this.mag(this.ctx.min(this.mag(),t))}rotate(t){const s=new n;return s.x=this.ctx.cos(t)*this.x-this.ctx.sin(t)*this.y,s.y=this.ctx.sin(t)*this.x+this.ctx.cos(t)*this.y,s}perpendicular(){return new n({x:-this.y,y:this.x})}distance({x:t,y:s}){const i=this.x-t,e=this.y-s;return this.ctx.sqrt(i**2+e**2)}angleBetween({x:t,y:s}){const i=this.copy().normalize(),e=new n({x:t,y:s}).normalize();return this.ctx.acos(i.dot(e))}}class r{constructor({x:t,y:s}){this.ctx=null,this.position=new n({x:t,y:s}),this.velocity=new n,this.acceleration=new n,this.mass=1,this.maxSpeed=1}init(t){this.ctx=t}apply(t){this.acceleration=this.acceleration.add(t.div(this.mass))}update(){this.velocity=this.velocity.add(this.acceleration),this.velocity=this.velocity.limit(this.maxSpeed),this.position=this.position.add(this.velocity),this.acceleration=this.acceleration.mult(0)}draw(){this.ctx.stroke(0),this.ctx.strokeWeight(1),this.ctx.point(this.position.x,this.position.y)}}class h{constructor({start:t,end:s,width:i=1,color:n=0,ctx:r}){this.start=t instanceof e?t:new e(t),this.end=s instanceof e?s:new e(s),this.width=i,this.color=n,r?this.init(r):this.ctx=null}get length(){return this.start.distance(this.end)}get vertexes(){return[start,end]}init(t){return this.ctx=t,this.start.init(t),this.end.init(t),this}rotate(t,s){this.start.rotate(t,s),this.end.rotate(t,s)}lerp(t){return this.start.lerp(this.end,t).init(this.ctx)}intersect(t){const s=new n({x:this.end.x-this.start.x,y:this.end.y-this.start.y}),i=new n({x:t.end.x-t.start.x,y:t.end.y-t.start.y}),r=new n({x:t.start.x-this.start.x,y:t.start.y-this.start.y}),h=s.perpendicular(),c=i.perpendicular(),a=r.dot(c)/s.dot(c),o=-r.dot(h)/i.dot(h);if(a>0&&a<1&&o>0&&o<1){const t=new n({x:this.start.x,y:this.start.y}).add(s.mult(a));return new e({x:t.x,y:t.y}).init(this.ctx)}return null}perpendicular(t){const s=new n({x:t.x-this.start.x,y:t.y-this.start.y}),i=new n({x:this.end.x-this.start.x,y:this.end.y-this.start.y}),r=s.dot(i)/i.dot(i);if(r>0&&r<1){const t=new n({x:this.start.x,y:this.start.y}).add(i.mult(r));return new e({x:t.x,y:t.y}).init(this.ctxt)}return null}draw(){this.ctx.stroke(this.color),this.ctx.strokeWeight(this.width),this.ctx.line(this.start.x,this.start.y,this.end.x,this.end.y)}}class c{constructor({x:t,y:s,center:i,radius:n=1,color:r=0,fill:h=!0}={x:0,y:0}){this.ctx=null,this.center=i?i instanceof e?i:new e(i):new e({x:t,y:s}),this.radius=n,this.color=r,this.fill=h}init(t){return this.ctx=t,this.center.init(t),this}set(t){return Object.entries(t).map(([s,i])=>{t.hasOwnProperty(s)&&this.hasOwnProperty(s)&&(this[s]=i)}),this}get area(){return this.radius*this.radius*Math.PI}cross(t){const s=this.center.distance(t.center);return this.radius+t.radius>=s}include(t){const s=this.center.distance(t.center);return this.radius-t.radius>s}intersect(t){if(this.cross(t)){const s=this.center.distance(t.center),i=(this.radius**2+s**2-t.radius**2)/(2*this.radius*s),r=this.ctx.acos(i),h=new n({x:t.center.x-this.center.x,y:t.center.y-this.center.y}).mag(this.radius).rotate(r).add({x:this.center.x,y:this.center.y}),c=new n({x:t.center.x-this.center.x,y:t.center.y-this.center.y}).mag(this.radius).rotate(-r).add({x:this.center.x,y:this.center.y});return[new e(h).init(this.ctx),new e(c).init(this.ctx)]}return[]}draw(){this.fill?(this.ctx.noStroke(),this.ctx.fill(this.color)):(this.ctx.stroke(this.color),this.ctx.strokeWeight(1),this.ctx.noFill()),this.ctx.ellipse(this.center.x,this.center.y,2*this.radius,2*this.radius)}}class a{constructor({apexes:t,color:s=0,fill:i=!0,ctx:n}={apexes:[]}){this.apexes=t.map(t=>t instanceof e?t:new e(t)),this.color=s,this.fill=i,n?this.init(n):this.ctx=null}init(t){return this.ctx=t,this.apexes.map(s=>s.init(t)),this}set(t){return Object.entries(t).map(([s,i])=>{t.hasOwnProperty(s)&&this.hasOwnProperty(s)&&(this[s]=i)}),this}get vertexes(){return[...this.apexes]}get lines(){const t=new h({start:this.apexes[0],end:this.apexes[1]}),s=new h({start:this.apexes[1],end:this.apexes[2]}),i=new h({start:this.apexes[2],end:this.apexes[0]});return t.init(this.ctx),s.init(this.ctx),i.init(this.ctx),[t,s,i]}get area(){const t=this.lines.map(t=>t.length),s=t.reduce((t,s)=>t+s,0)/2;return this.ctx.sqrt(s*(s-t[0])*(s-t[1])*(s-t[2]))}get circumcenter(){const[t,s,i]=this.apexes,r=new n({x:s.x-t.x,y:s.y-t.y}),h=new n({x:i.x-s.x,y:i.y-s.y}),c=new n({x:t.x-i.x,y:t.y-i.y}),a=r.perpendicular(),o=a.mult(h.dot(c)/a.dot(c)),x=r.add(o).mult(.5).add(new n({x:t.x,y:t.y}));return new e(x).init(this.ctx)}get circumcircle(){const t=this.circumcenter,s=t.distance(this.apexes[0]);return new c({center:t,radius:s}).init(this.ctx)}lerp(t){const s=this.lines.map(s=>s.lerp(t));return new a({...this,apexes:s})}draw(){this.fill?(this.ctx.noStroke(),this.ctx.fill(this.color)):(this.ctx.stroke(this.color),this.ctx.strokeWeight(1),this.ctx.noFill());const t=this.apexes;return this.ctx.triangle(t[0].x,t[0].y,t[1].x,t[1].y,t[2].x,t[2].y),this}}class o{constructor({corners:t,color:s=0,fill:i=!0,ctx:n}={corners:[]}){this.corners=[new e({x:Math.min(t[0].x,t[1].x),y:Math.min(t[0].y,t[1].y)}),new e({x:Math.max(t[0].x,t[1].x),y:Math.max(t[0].y,t[1].y)})],this.color=s,this.fill=i,n?this.init(n):this.ctx=null}init(t){return this.ctx=t,this.corners.map(s=>s.init(t)),this}set(t){return Object.entries(t).map(([s,i])=>{t.hasOwnProperty(s)&&this.hasOwnProperty(s)&&(this[s]=i)}),this}get area(){const t=this.ctx,[s,i]=this.corners;return t.abs(s.x-i.x)*t.abs(s.y-i.y)}get vertexes(){const t=this.ctx,[s,i]=this.corners;return[s.copy(),new e({x:i.x,y:s.y}).init(t),i.copy(),new e({x:s.x,y:i.y}).init(t)]}get edges(){const t=this.ctx,[s,i,e,n]=this.vertexes;return[new h({start:s,end:i}).init(t),new h({start:i,end:e}).init(t),new h({start:e,end:n}).init(t),new h({start:n,end:s}).init(t)]}contains(t){return t.vertexes.filter(t=>{const{x:s,y:i}=t,[e,n]=this.corners;return e.x<s&&e.y<i&&s<n.x&&i<n.y}).length}containVetexes(t){return t.vertexes.filter(t=>{const{x:s,y:i}=t,[e,n]=this.corners;return e.x<s&&e.y<i&&s<n.x&&i<n.y})}intersect(t){return this.edges.reduce((s,i)=>{const e=t.edges.map(t=>t.intersect(i)).filter(t=>t);return s=s.concat(e)},[])}intersectRect(t){const s=this.ctx;let i=this.intersect(t);return i=i.concat(this.containVetexes(t)),0===i.length?null:new o({...this,corners:[{x:s.min(...i.map(t=>t.x)),y:s.min(...i.map(t=>t.y))},{x:s.max(...i.map(t=>t.x)),y:s.max(...i.map(t=>t.y))}]})}draw(){this.ctx.rectMode(this.ctx.CORNERS),this.fill?(this.ctx.noStroke(),this.ctx.fill(this.color)):(this.ctx.stroke(this.color),this.ctx.strokeWeight(1),this.ctx.noFill());const[t,s]=this.corners;return this.ctx.rect(t.x,t.y,s.x,s.y),this}}s.a={GOLDEN_RATIO:(Math.sqrt(5)-1)/2,Point:e,Vector:n,Particle:r,Attractor:class{constructor({x:t,y:s,magnitude:i=1}){this.instance=new r({x:t,y:s}),this.magnitude=i}get position(){return this.instance.position}setMagnitude(t){this.magnitude=t}force(t){return this.position.sub(t).normalize().mult(this.magnitude)}},Line:h,Circle:c,Triangle:a,Rectangle:o}},698:function(t,s,i){"use strict";i.r(s);i(15);var e=i(297);const{Point:n}=e.a;var r={data:()=>({canvasWidth:0,canvasHeight:0}),mounted(){this.canvasWidth=document.querySelector("h1").offsetWidth,this.canvasHeight=400},methods:{setup(t){t.createCanvas(this.canvasWidth,this.canvasHeight),t.background(233);const s=[];let i=500;for(;i--;){const i=t.random(t.TAU),e=Math.min(this.canvasWidth,this.canvasHeight)/2,r=t.pow(t.random(1),.5)*e;s.push(new n({x:t.cos(i)*r,y:t.sin(i)*r,width:t.random(8),color:t.random(256)}))}const e={x:this.canvasWidth/2,y:this.canvasHeight/2};t.translate(e.x,e.y),s.map(s=>s.init(t).draw());let r=0;for(;r<100;)r++,s.map(t=>t.rotate(.01).draw())}}},h=i(0),c=Object(h.a)(r,(function(){var t=this._self._c;return t("WHRatio",{attrs:{h:"400px"}},[t("ClientOnly",[t("vue-p5",{on:{setup:this.setup}})],1)],1)}),[],!1,null,null,null);s.default=c.exports}}]);