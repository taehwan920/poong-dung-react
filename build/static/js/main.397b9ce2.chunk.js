(this["webpackJsonppoong-dung-react"]=this["webpackJsonppoong-dung-react"]||[]).push([[0],{33:function(e,t,a){e.exports=a(62)},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(30),l=a.n(i),o=a(15),c=a(10),s=a(2),d=a(3),m=a(5),u=a(4),h=a(12),f=a.n(h),p=a(16),v=a(14),S=a.n(v),y=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"bg-drop"},r.a.createElement("i",{className:"fas fa-tint"}))}}]),a}(r.a.Component),b=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={time:0,temperature:0,isLoading:!1,errorOccured:!1},e.getTemperature=Object(p.a)(f.a.mark((function t(){var a,n,r,i;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"http://localhost:8080/db/1/1",t.next=3,S.a.get("http://localhost:8080/db/1/1");case 3:a=t.sent,n=a.data[0],r=n.temperature,i=n.time,r&&i?e.setState({time:i,temperature:r,isLoading:!0}):e.setState({errorOccured:!0});case 8:case"end":return t.stop()}}),t)}))),e}return Object(d.a)(a,[{key:"renderRedirect",value:function(){return r.a.createElement(c.a,{to:"/error"})}},{key:"componentDidMount",value:function(){this.getTemperature()}},{key:"render",value:function(){var e=this.state.temperature,t=this.state.time;return r.a.createElement("article",{className:"temp"},this.state.errorOccured?this.renderRedirect():this.state.isLoading?[r.a.createElement("span",{className:"temp__now"},"\uc9c0 \uae08 \ud55c \uac15 \uc740..."),r.a.createElement("span",{className:"temp__temp"},e,"\u2103"),r.a.createElement("div",{className:"temp__toStatistics"},r.a.createElement("a",{href:"/statistics",className:"statistics__link"},"\ud1b5\uacc4 \ubcf4\uae30")),r.a.createElement("div",{className:"temp__standard"},"\uc624\ub298 ",t<10?"0".concat(t):t,"\uc2dc, \uc911\ub791\ucc9c \uae30\uc900"),r.a.createElement(y,null)]:"Loading...")}}]),a}(r.a.Component),X=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"home__bg"})}}]),a}(r.a.Component),E=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("footer",{className:"home__footer"},r.a.createElement("a",{target:"blank",href:"https://github.com/taehwan920/poong-dung-react"},r.a.createElement("i",{className:"fab fa-github"})))}}]),a}(r.a.Component),k=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("main",{className:"home"},r.a.createElement(b,null),r.a.createElement(X,null),r.a.createElement(E,null))}}]),a}(r.a.Component),x=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={errorOccurred:!1},e.Standard={canvasHeight:500,frameStartX:100,frameEndX:900,frameStartY:125,frameEndY:425,frameIntervalY:60,frameLineWidth:2,frameStrokeStyle:"rgba(255, 255, 255, 0.5)",textFillStyle:"rgba(255, 255, 255, 1)",dailyColor:"#C5F895",monthlyColor:"#9972AE",colorLineWidth:3,tickEndY:430,tickStartY:420,tickStartX:200,tickIntervalX:87.5,tickEndX:812.5},e.DrawGraph=function(){var t=Object(p.a)(f.a.mark((function t(a){var n,r,i,l,o,c,s,d,m,u,h,p,v,y,b,X,E,k,x,g,Y,O;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n={endX:e.Standard.tickEndX,intervalX:e.Standard.tickIntervalX,intervalY:e.Standard.frameIntervalY,startY:e.Standard.frameStartY,stdY:e.Standard.frameEndY-e.Standard.frameStartY},"http://localhost:8080/db/1/8",t.next=5,S.a.get("http://localhost:8080/db/1/8");case 5:for(r=t.sent,i=r.data,l=i.map((function(e){return e.temperature})),o=[],c=0;c<l.length;c++)s=e.tempCheck(l[c],c),d=n.endX-n.intervalX*c,m=Number((n.intervalY*(25-s)/5+n.startY).toFixed(1)),0===c&&(d=n.endX),e.drawPoint(a,d,m,!0),o.push({X:d,Y:m});return e.drawLine(a,o,!0),"http://localhost:8080/db/125/132",t.next=15,S.a.get("http://localhost:8080/db/125/132");case 15:for(u=t.sent,h=u.data,p=h.map((function(e){return e.temperature})),v=[],y=0;y<p.length;y++)b=e.tempCheck(p[y],y),X=n.endX-n.intervalX*y,E=Number((n.intervalY*(25-b)/5+n.startY).toFixed(1)),0===y&&(X=n.endX),e.drawPoint(a,X,E,!1),v.push({X:X,Y:E});e.drawLine(a,v,!1),o.reverse(),l.reverse(),v.reverse(),p.reverse(),k=document.querySelector("#statistics"),x=document.querySelectorAll(".sta-temp"),g=document.querySelector(".sta-box1"),Y=document.querySelector(".sta-box2"),k&&(O={0:[e.Standard.frameStartX,o[0].X],1:[o[0].X,o[1].X],2:[o[1].X,o[2].X],3:[o[2].X,o[3].X],4:[o[3].X,o[4].X],5:[o[4].X,o[5].X],6:[o[5].X,o[6].X],7:[o[6].X,e.Standard.frameEndX]},a.save(),k.addEventListener("mousemove",(function(e){var t=e.offsetX;for(var a in O)if(t>O[a][0]&&t<=O[a][1]){console.log(t);var n=Number(a);x.forEach((function(e){e.classList.add("sta-visualize")})),g.style.setProperty("top","".concat(o[n].Y-42.5,"px")),g.style.setProperty("left","".concat(o[n].X-85,"px")),g.innerHTML="".concat(l[a],"\u2103"),Y.style.setProperty("top","".concat(v[n].Y-42.5,"px")),Y.style.setProperty("left","".concat(v[n].X-85,"px")),Y.innerHTML="".concat(p[a],"\u2103")}})),k.addEventListener("mouseleave",(function(){x.forEach((function(e){e.classList.remove("sta-visualize")}))}))),t.next=37;break;case 34:t.prev=34,t.t0=t.catch(0),e.setState({errorOccurred:!0});case 37:case"end":return t.stop()}}),t,null,[[0,34]])})));return function(e){return t.apply(this,arguments)}}(),e}return Object(d.a)(a,[{key:"renderRedirect",value:function(){return r.a.createElement(c.a,{to:"/error"})}},{key:"AxisX",value:function(e){for(var t={startX:this.Standard.frameStartX,endX:this.Standard.frameEndX,startY:this.Standard.frameStartY,endY:this.Standard.frameEndY,intervalY:this.Standard.frameIntervalY},a=["0\u2103","5\u2103","10\u2103","15\u2103","20\u2103","25\u2103"],n=t.endY,r=0;n>=t.startY;n-=t.intervalY,r++)e.beginPath(),e.moveTo(t.startX,n),e.lineTo(t.endX,n),e.lineWidth=this.Standard.frameLineWidth,e.strokeStyle=this.Standard.frameStrokeStyle,e.stroke(),e.closePath(),e.font="15.5px sans-serif",e.textAlign="end",e.textBaseline="middle",e.fillStyle=this.Standard.textFillStyle,e.fillText(a[r],t.startX-10,n)}},{key:"Title",value:function(e){e.font="32px sans-serif",e.textAlign="center",e.fillStyle=this.Standard.textFillStyle,e.fillText("\ud55c\uac15 \uc218\uc628 \ud1b5\uacc4 \uadf8\ub798\ud504",500,58)}},{key:"LineColor",value:function(e){var t={dailyColor:this.Standard.dailyColor,monthlyColor:this.Standard.monthlyColor,textX:940,StartX:800,EndX:840,lineWidth:this.Standard.colorLineWidth,positionY1:30,positionY2:60};e.font="12px sans-serif",e.textAlign="end",e.textBaseline="middle",e.fillStyle=this.Standard.textFillStyle,e.fillText("\uc77c\uc77c \ubcc0\ub3d9 \uc218\uc628",t.textX,t.positionY1),e.fillText("\uc804\uc6d4 \ubcc0\ub3d9 \uc218\uc628",t.textX,t.positionY2),e.beginPath(),e.moveTo(t.StartX,t.positionY1),e.lineTo(t.EndX,t.positionY1),e.lineWidth=t.lineWidth,e.strokeStyle=t.dailyColor,e.stroke(),e.beginPath(),e.moveTo(t.StartX,t.positionY2),e.lineTo(t.EndX,t.positionY2),e.lineWidth=t.lineWidth,e.strokeStyle=t.monthlyColor,e.stroke()}},{key:"TickAndParams",value:function(e){for(var t={startX:this.Standard.tickStartX,endX:this.Standard.tickEndX,intervalX:this.Standard.tickIntervalX,startY:this.Standard.tickStartY,endY:this.Standard.tickEndY},a=t.startX,n=t.startX,r=48;n<=t.endX;n+=t.intervalX,r-=6)e.beginPath(),e.moveTo(n,t.endY),e.lineTo(n,t.startY),e.lineWidth=this.Standard.frameLineWidth,e.strokeStyle=this.Standard.frameStrokeStyle,e.stroke(),n!==a?(e.font="15.5px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillStyle=this.Standard.textFillStyle,e.fillText("".concat(r,"\uc2dc\uac04 \uc804"),n-t.intervalX,t.endY+20)):(e.font="15.5px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillStyle=this.Standard.textFillStyle,e.fillText("\uc9c0\uae08",t.endX,t.endY+20))}},{key:"tempCheck",value:function(e,t){if(99.9!==e)return e;e[t-1]?e[t].temperature=e[t-1].temperature:e[t].temperature=e[t+1].temperature}},{key:"drawPoint",value:function(e,t,a,n){e.beginPath(),e.arc(t,a,6,a-5,Math.PI,!0),e.fillStyle=n?this.Standard.dailyColor:this.Standard.monthlyColor,e.fill(),e.closePath()}},{key:"drawLine",value:function(e,t,a){for(var n=t[0],r=1;r<t.length;r++)e.beginPath(),e.moveTo(n.X,n.Y),n=t[r],e.lineTo(n.X,n.Y),e.lineWidth=4,e.strokeStyle=a?this.Standard.dailyColor:this.Standard.monthlyColor,e.stroke(),e.closePath()}},{key:"componentDidMount",value:function(){var e=document.querySelector("#statistics");if(e){var t=e.getContext("2d");e.width=1e3,e.height=500,this.DrawGraph(t),this.Title(t),this.LineColor(t),this.AxisX(t),this.TickAndParams(t)}}},{key:"render",value:function(){return r.a.createElement("div",{className:"sta-tempBox"},this.state.errorOccurred?this.renderRedirect():[r.a.createElement("canvas",{id:"statistics"}),r.a.createElement("div",{className:"sta-box1 sta-temp"},"d"),r.a.createElement("div",{className:"sta-box2 sta-temp"},"d")])}}]),a}(r.a.Component),g=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("main",{className:"temp"},r.a.createElement(x,null),r.a.createElement("div",{className:"temp__toStatistics"},r.a.createElement("a",{href:"/",className:"statistics__link"},"\ud648\uc73c\ub85c")),r.a.createElement(y,null))}}]),a}(r.a.Component),Y=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("main",{className:"home"},r.a.createElement(g,null),r.a.createElement(X,null),r.a.createElement(E,null))}}]),a}(r.a.Component),O=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("center",{className:"home"},r.a.createElement("div",{className:"temp"},r.a.createElement("span",{className:"error-message"},"\uc218\uc628 \ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."),r.a.createElement("div",{className:"temp__toStatistics"},r.a.createElement("a",{href:"/",className:"statistics__link"},"\ud648\uc73c\ub85c"))),r.a.createElement(X,null),r.a.createElement(E,null),r.a.createElement(y,null))}}]),a}(r.a.Component),j=function(){return r.a.createElement(o.a,null,r.a.createElement(c.b,{exact:!0,path:"/",component:k}),r.a.createElement(c.b,{exact:!0,path:"/statistics",component:Y}),r.a.createElement(c.b,{exact:!0,path:"/error",component:O}))};a(61),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.397b9ce2.chunk.js.map