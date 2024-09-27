/*! For license information please see 821.fdfef4f3.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkfarmersure=self.webpackChunkfarmersure||[]).push([[821],{1691:function(t,e,n){n.d(e,{GX:function(){return l},l_:function(){return c},tN:function(){return a}});var r,u,s,i=n(168),o=n(6444),a=o.ZP.form(r||(r=(0,i.Z)(["\n  display: grid;\n  gap: 10px;\n  margin-top: 50px;\n  @media (min-width: 768px) {\n    width: 300px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n"]))),c=o.ZP.input(u||(u=(0,i.Z)(["\n  padding-left: 15px;\n"]))),l=o.ZP.button(s||(s=(0,i.Z)([""])))},2821:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});var r=n(9439),u=n(2791),s=n(7689),i=n(3418),o=n(7554),a=n(1691),c=n(184),l=function(){var t=(0,u.useState)(""),e=(0,r.Z)(t,2),n=e[0],l=e[1],f=(0,u.useState)(""),h=(0,r.Z)(f,2),p=h[0],v=h[1],d=(0,s.s0)(),m=(0,i.D)(o.z2,{onSuccess:function(){d("/home")},onError:function(t){alert(t.message)}}).mutate;return(0,c.jsxs)(a.tN,{onSubmit:function(t){t.preventDefault();try{m({email:n,password:p}),d("/home"),l(""),v("")}catch(e){alert("Invalid user!")}},children:[(0,c.jsx)(a.l_,{placeholder:"e-mail",name:"email",value:n,type:"email",onChange:function(t){return l(t.target.value)}}),(0,c.jsx)(a.l_,{placeholder:"password",name:"password",value:p,type:"password",onChange:function(t){return v(t.target.value)}}),(0,c.jsx)(a.GX,{type:"submit",children:"Register"})]})},f=function(){return(0,c.jsxs)("div",{children:[(0,c.jsx)("title",{children:"Registration"}),(0,c.jsx)(l,{})]})}},7554:function(t,e,n){n.d(e,{Ib:function(){return a},ni:function(){return c},z2:function(){return o}});var r=n(4165),u=n(5861),s=n(7593),i=(0,s.v0)(),o=function(){var t=(0,u.Z)((0,r.Z)().mark((function t(e){var n,u;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=e.email,u=e.password,t.next=4,(0,s.Xb)(i,n,u).then((function(t){var e=t.user;localStorage.setItem("user",JSON.stringify(e))}));case 4:return t.abrupt("return",!0);case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),new Error(t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),a=function(){var t=(0,u.Z)((0,r.Z)().mark((function t(){var e;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=new s.hJ,t.next=4,(0,s.rh)(i,e).then((function(t){var e=t.user;localStorage.setItem("user",JSON.stringify(e))}));case 4:return t.abrupt("return",!0);case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),new Error(t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),c=function(){var t=(0,u.Z)((0,r.Z)().mark((function t(){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,s.w7)(i);case 3:return localStorage.removeItem("user"),t.abrupt("return",!0);case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),new Error(t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}()},1561:function(t,e,n){var r=n(2791);var u="function"===typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t===1/e)||t!==t&&e!==e},s=r.useState,i=r.useEffect,o=r.useLayoutEffect,a=r.useDebugValue;function c(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!u(t,n)}catch(r){return!0}}var l="undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement?function(t,e){return e()}:function(t,e){var n=e(),r=s({inst:{value:n,getSnapshot:e}}),u=r[0].inst,l=r[1];return o((function(){u.value=n,u.getSnapshot=e,c(u)&&l({inst:u})}),[t,n,e]),i((function(){return c(u)&&l({inst:u}),t((function(){c(u)&&l({inst:u})}))}),[t]),a(n),n};e.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:l},8860:function(t,e,n){t.exports=n(1561)},3418:function(t,e,n){n.d(e,{D:function(){return y}});var r=n(1413),u=n(9439),s=n(2791),i=n(7413),o=n(3734),a=n(5671),c=n(3144),l=n(136),f=n(7277),h=n(9054),p=n(9538),v=function(t){(0,l.Z)(n,t);var e=(0,f.Z)(n);function n(t,r){var u;return(0,a.Z)(this,n),(u=e.call(this)).client=t,u.setOptions(r),u.bindMethods(),u.updateResult(),u}return(0,c.Z)(n,[{key:"bindMethods",value:function(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}},{key:"setOptions",value:function(t){var e,n=this.options;this.options=this.client.defaultMutationOptions(t),(0,o.VS)(n,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(e=this.currentMutation)||e.setOptions(this.options)}},{key:"onUnsubscribe",value:function(){var t;this.listeners.length||(null==(t=this.currentMutation)||t.removeObserver(this))}},{key:"onMutationUpdate",value:function(t){this.updateResult();var e={listeners:!0};"success"===t.type?e.onSuccess=!0:"error"===t.type&&(e.onError=!0),this.notify(e)}},{key:"getCurrentResult",value:function(){return this.currentResult}},{key:"reset",value:function(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}},{key:"mutate",value:function(t,e){return this.mutateOptions=e,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,(0,r.Z)((0,r.Z)({},this.options),{},{variables:"undefined"!==typeof t?t:this.options.variables})),this.currentMutation.addObserver(this),this.currentMutation.execute()}},{key:"updateResult",value:function(){var t=this.currentMutation?this.currentMutation.state:(0,h.R)(),e=(0,r.Z)((0,r.Z)({},t),{},{isLoading:"loading"===t.status,isSuccess:"success"===t.status,isError:"error"===t.status,isIdle:"idle"===t.status,mutate:this.mutate,reset:this.reset});this.currentResult=e}},{key:"notify",value:function(t){var e=this;p.V.batch((function(){var n,r,u,s;if(e.mutateOptions&&e.hasListeners())if(t.onSuccess)null==(n=(r=e.mutateOptions).onSuccess)||n.call(r,e.currentResult.data,e.currentResult.variables,e.currentResult.context),null==(u=(s=e.mutateOptions).onSettled)||u.call(s,e.currentResult.data,null,e.currentResult.variables,e.currentResult.context);else if(t.onError){var i,o,a,c;null==(i=(o=e.mutateOptions).onError)||i.call(o,e.currentResult.error,e.currentResult.variables,e.currentResult.context),null==(a=(c=e.mutateOptions).onSettled)||a.call(c,void 0,e.currentResult.error,e.currentResult.variables,e.currentResult.context)}t.listeners&&e.listeners.forEach((function(t){t(e.currentResult)}))}))}}]),n}(n(5511).l),d=n(6403),m=n(9608);function y(t,e,n){var a=(0,o.lV)(t,e,n),c=(0,d.NL)({context:a.context}),l=s.useState((function(){return new v(c,a)})),f=(0,u.Z)(l,1)[0];s.useEffect((function(){f.setOptions(a)}),[f,a]);var h=(0,i.$)(s.useCallback((function(t){return f.subscribe(p.V.batchCalls(t))}),[f]),(function(){return f.getCurrentResult()}),(function(){return f.getCurrentResult()})),y=s.useCallback((function(t,e){f.mutate(t,e).catch(b)}),[f]);if(h.error&&(0,m.L)(f.options.useErrorBoundary,[h.error]))throw h.error;return(0,r.Z)((0,r.Z)({},h),{},{mutate:y,mutateAsync:h.mutate})}function b(){}},7413:function(t,e,n){n.d(e,{$:function(){return r}});var r=n(8860).useSyncExternalStore},9608:function(t,e,n){n.d(e,{L:function(){return u}});var r=n(3433);function u(t,e){return"function"===typeof t?t.apply(void 0,(0,r.Z)(e)):!!t}}}]);
//# sourceMappingURL=821.fdfef4f3.chunk.js.map