System.registerDynamic("npm:zone.js@0.5.4",["npm:zone.js@0.5.4/lib/zone"],!0,function(require,t,e){var n=this,r=n.define;return n.define=void 0,e.exports=require("npm:zone.js@0.5.4/lib/zone"),n.define=r,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/zone",["npm:zone.js@0.5.4/lib/core","npm:zone.js@0.5.4/lib/patch/browser"],!0,function(require,t,e){var n=this,r=n.define;n.define=void 0;var o=require("npm:zone.js@0.5.4/lib/core"),i=require("npm:zone.js@0.5.4/lib/patch/browser");return n.zone=new o.Zone,e.exports={Zone:o.Zone,zone:n.zone},i.apply(),n.define=r,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/core",["npm:zone.js@0.5.4/lib/patch/promise"],!0,function(require,t,e){function n(t,e){var r=arguments.length?Object.create(t):this;return r.parent=t||null,Object.keys(e||{}).forEach(function(n){var o=n.substr(1);"$"===n[0]?r[o]=e[n](t[o]||function(){}):"+"===n[0]?t[o]?r[o]=function(){var r=t[o].apply(this,arguments);return e[n].apply(this,arguments),r}:r[o]=e[n]:"-"===n[0]?t[o]?r[o]=function(){return e[n].apply(this,arguments),t[o].apply(this,arguments)}:r[o]=e[n]:r[n]="object"==typeof e[n]?JSON.parse(JSON.stringify(e[n])):e[n]}),r.$id=n.nextId++,r}var r=this,o=r.define;return r.define=void 0,n.prototype={constructor:n,fork:function(t){return this.onZoneCreated(),new n(this,t)},bind:function(t,e){if("function"!=typeof t)throw new Error("Expecting function got: "+t);e||this.enqueueTask(t);var n=this.isRootZone()?this:this.fork();return function(){return n.run(t,this,arguments)}},bindOnce:function(t){var e=this;return this.bind(function(){var n=t.apply(this,arguments);return e.dequeueTask(t),n})},isRootZone:function(){return null===this.parent},run:function(t,e,n){n=n||[];var o=r.zone;r.zone=this;try{return this.beforeTask(),t.apply(e,n)}catch(i){if(!this.onError)throw i;this.onError(i)}finally{this.afterTask(),r.zone=o}},onError:null,beforeTask:function(){},onZoneCreated:function(){},afterTask:function(){},enqueueTask:function(){},dequeueTask:function(){}},n.nextId=1,n.bindPromiseFn=require("npm:zone.js@0.5.4/lib/patch/promise").bindPromiseFn,e.exports={Zone:n},r.define=o,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/browser",["npm:zone.js@0.5.4/lib/patch/functions","npm:zone.js@0.5.4/lib/patch/promise","npm:zone.js@0.5.4/lib/patch/mutation-observer","npm:zone.js@0.5.4/lib/patch/define-property","npm:zone.js@0.5.4/lib/patch/register-element","npm:zone.js@0.5.4/lib/patch/websocket","npm:zone.js@0.5.4/lib/patch/event-target","npm:zone.js@0.5.4/lib/patch/property-descriptor","npm:zone.js@0.5.4/lib/patch/geolocation"],!0,function(require,t,e){function n(){i.patchSetClearFunction(r,["timeout","interval","immediate"]),i.patchRequestAnimationFrame(r,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame"]),i.patchFunction(r,["alert","prompt"]),l.apply(),f.apply(),s.apply(),a.patchClass("MutationObserver"),a.patchClass("WebKitMutationObserver"),u.apply(),c.apply(),p.apply()}var r=this,o=r.define;r.define=void 0;var i=require("npm:zone.js@0.5.4/lib/patch/functions"),s=require("npm:zone.js@0.5.4/lib/patch/promise"),a=require("npm:zone.js@0.5.4/lib/patch/mutation-observer"),u=require("npm:zone.js@0.5.4/lib/patch/define-property"),c=require("npm:zone.js@0.5.4/lib/patch/register-element"),l=(require("npm:zone.js@0.5.4/lib/patch/websocket"),require("npm:zone.js@0.5.4/lib/patch/event-target")),f=require("npm:zone.js@0.5.4/lib/patch/property-descriptor"),p=require("npm:zone.js@0.5.4/lib/patch/geolocation");return e.exports={apply:n},r.define=o,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/functions",["npm:zone.js@0.5.4/lib/utils"],!0,function(require,t,e){function n(t,e){e.map(function(t){return t[0].toUpperCase()+t.substr(1)}).forEach(function(e){var n="set"+e,r=t[n];if(r){var o="clear"+e,i={},a="setInterval"===n?u.bindArguments:u.bindArgumentsOnce;s.zone[n]=function(e){var n,o=e;arguments[0]=function(){return delete i[n],o.apply(this,arguments)};var s=a(arguments);return n=r.apply(t,s),i[n]=!0,n},t[n]=function(){return s.zone[n].apply(this,arguments)};var c=t[o];s.zone[o]=function(t){return i[t]&&(delete i[t],s.zone.dequeueTask()),c.apply(this,arguments)},t[o]=function(){return s.zone[o].apply(this,arguments)}}})}function r(t,e){e.forEach(function(e){var n=t[e];n&&(s.zone[e]=function(e){var r=s.zone.isRootZone()?s.zone.fork():s.zone;return e&&(arguments[0]=function(){return r.run(e,arguments)}),n.apply(t,arguments)},t[e]=function(){return s.zone[e].apply(this,arguments)})})}function o(t,e){e.forEach(function(e){var n=t[e];n&&(s.zone[e]=function(e){var r=e;arguments[0]=function(){return r.apply(this,arguments)};var o=u.bindArgumentsOnce(arguments);return n.apply(t,o)},t[e]=function(){return zone[e].apply(this,arguments)})})}function i(t,e){e.forEach(function(e){var n=t[e];s.zone[e]=function(){return n.apply(t,arguments)},t[e]=function(){return s.zone[e].apply(this,arguments)}})}var s=this,a=s.define;s.define=void 0;var u=require("npm:zone.js@0.5.4/lib/utils");return e.exports={patchSetClearFunction:n,patchSetFunction:o,patchRequestAnimationFrame:r,patchFunction:i},s.define=a,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/promise",["npm:zone.js@0.5.4/lib/utils"],!0,function(require,t,e){function n(t,e){var n=i,r=t.every(function(t){return n=n[t]});r&&e.forEach(function(t){var e=n[t];e&&(n[t]=a(e))})}function r(t){var e=t.then;t.then=function(){var n=u.bindArguments(arguments),o=e.apply(t,n);return r(o)};var n=t["catch"];return t["catch"]=function(){var e=u.bindArguments(arguments),o=n.apply(t,e);return r(o)},t}function o(){if(i.Promise){u.patchPrototype(Promise.prototype,["then","catch"]);var t=[[[],["fetch"]],[["Response","prototype"],["arrayBuffer","blob","json","text"]]];t.forEach(function(t){n(t[0],t[1])})}}var i=this,s=i.define;i.define=void 0;var a,u=require("npm:zone.js@0.5.4/lib/utils");return a=i.Promise?function(t){return function(){var e=t.apply(this,arguments);return e instanceof Promise?e:new Promise(function(t,n){e.then(t,n)})}}:function(t){return function(){return r(t.apply(this,arguments))}},e.exports={apply:o,bindPromiseFn:a},i.define=s,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/mutation-observer",[],!0,function(require,t,e){function n(t){var e=r[t];if(e){r[t]=function(t){this._o=new e(r.zone.bind(t,!0)),this._creationZone=r.zone};var n=new e(function(){});r[t].prototype.disconnect=function(){var t=this._o.disconnect.apply(this._o,arguments);return this._active&&(this._creationZone.dequeueTask(),this._active=!1),t},r[t].prototype.observe=function(){return this._active||(this._creationZone.enqueueTask(),this._active=!0),this._o.observe.apply(this._o,arguments)};var o;for(o in n)!function(e){void 0===typeof r[t].prototype&&("function"==typeof n[e]?r[t].prototype[e]=function(){return this._o[e].apply(this._o,arguments)}:Object.defineProperty(r[t].prototype,e,{set:function(t){"function"==typeof t?this._o[e]=r.zone.bind(t):this._o[e]=t},get:function(){return this._o[e]}}))}(o)}}var r=this,o=r.define;return r.define=void 0,e.exports={patchClass:n},r.define=o,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/register-element",["npm:zone.js@0.5.4/lib/patch/define-property","npm:zone.js@0.5.4/lib/utils"],!0,function(require,t,e){function n(){if(!s.isWebWorker()&&"registerElement"in r.document){var t=document.registerElement,e=["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"];document.registerElement=function(n,o){return o&&o.prototype&&e.forEach(function(t){if(o.prototype.hasOwnProperty(t)){var e=Object.getOwnPropertyDescriptor(o.prototype,t);e&&e.value?(e.value=r.zone.bind(e.value),i(o.prototype,t,e)):o.prototype[t]=r.zone.bind(o.prototype[t])}else o.prototype[t]&&(o.prototype[t]=r.zone.bind(o.prototype[t]))}),t.apply(document,[n,o])}}}var r=this,o=r.define;r.define=void 0;var i=require("npm:zone.js@0.5.4/lib/patch/define-property")._redefineProperty,s=require("npm:zone.js@0.5.4/lib/utils");return e.exports={apply:n},r.define=o,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/define-property",[],!0,function(require,t,e){function n(){Object.defineProperty=function(t,e,n){if(o(t,e))throw new TypeError("Cannot assign to read only property '"+e+"' of "+t);return"prototype"!==e&&(n=i(t,e,n)),u(t,e,n)},Object.defineProperties=function(t,e){return Object.keys(e).forEach(function(n){Object.defineProperty(t,n,e[n])}),t},Object.create=function(t,e){return"object"==typeof e&&Object.keys(e).forEach(function(n){e[n]=i(t,n,e[n])}),l(t,e)},Object.getOwnPropertyDescriptor=function(t,e){var n=c(t,e);return o(t,e)&&(n.configurable=!1),n}}function r(t,e,n){return n=i(t,e,n),u(t,e,n)}function o(t,e){return t&&t.__unconfigurables&&t.__unconfigurables[e]}function i(t,e,n){return n.configurable=!0,n.configurable||(t.__unconfigurables||u(t,"__unconfigurables",{writable:!0,value:{}}),t.__unconfigurables[e]=!0),n}var s=this,a=s.define;s.define=void 0;var u=Object.defineProperty,c=Object.getOwnPropertyDescriptor,l=Object.create;return e.exports={apply:n,_redefineProperty:r},s.define=a,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/websocket",["npm:zone.js@0.5.4/lib/utils"],!0,function(require,t,e){function n(){var t=r.WebSocket;i.patchEventTargetMethods(t.prototype),r.WebSocket=function(e,n){var r,o=arguments.length>1?new t(e,n):new t(e),s=Object.getOwnPropertyDescriptor(o,"onmessage");return s&&s.configurable===!1?(r=Object.create(o),["addEventListener","removeEventListener","send","close"].forEach(function(t){r[t]=function(){return o[t].apply(o,arguments)}})):r=o,i.patchProperties(r,["onclose","onerror","onmessage","onopen"]),r}}var r=this,o=r.define;r.define=void 0;var i=require("npm:zone.js@0.5.4/lib/utils");return e.exports={apply:n},r.define=o,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/event-target",["npm:zone.js@0.5.4/lib/utils"],!0,function(require,t,e){function n(){if(r.EventTarget)i.patchEventTargetMethods(r.EventTarget.prototype);else{var t=["ApplicationCache","EventSource","FileReader","InputMethodContext","MediaController","MessagePort","Node","Performance","SVGElementInstance","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebKitNamedFlow","Window","Worker","WorkerGlobalScope","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"];t.forEach(function(t){r[t]&&i.patchEventTargetMethods(r[t].prototype)})}}var r=this,o=r.define;r.define=void 0;var i=require("npm:zone.js@0.5.4/lib/utils");return e.exports={apply:n},r.define=o,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/geolocation",["npm:zone.js@0.5.4/lib/utils"],!0,function(require,t,e){function n(){r.navigator&&r.navigator.geolocation&&i.patchPrototype(r.navigator.geolocation,["getCurrentPosition","watchPosition"])}var r=this,o=r.define;r.define=void 0;var i=require("npm:zone.js@0.5.4/lib/utils");return e.exports={apply:n},r.define=o,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/patch/property-descriptor",["npm:zone.js@0.5.4/lib/patch/websocket","npm:zone.js@0.5.4/lib/utils"],!0,function(require,t,e){function n(){if(!u.isWebWorker()){var t="undefined"!=typeof WebSocket;if(r()){var e=c.map(function(t){return"on"+t});u.patchProperties(HTMLElement.prototype,e),u.patchProperties(XMLHttpRequest.prototype),t&&u.patchProperties(WebSocket.prototype)}else o(),u.patchClass("XMLHttpRequest"),t&&a.apply()}}function r(){if(!Object.getOwnPropertyDescriptor(HTMLElement.prototype,"onclick")&&"undefined"!=typeof Element){var t=Object.getOwnPropertyDescriptor(Element.prototype,"onclick");if(t&&!t.configurable)return!1}Object.defineProperty(HTMLElement.prototype,"onclick",{get:function(){return!0}});var e=document.createElement("div"),n=!!e.onclick;return Object.defineProperty(HTMLElement.prototype,"onclick",{}),n}function o(){c.forEach(function(t){var e="on"+t;document.addEventListener(t,function(t){for(var n,r=t.target;r;)r[e]&&!r[e]._unbound&&(n=i.zone.bind(r[e]),n._unbound=r[e],r[e]=n),r=r.parentElement},!0)})}var i=this,s=i.define;i.define=void 0;var a=require("npm:zone.js@0.5.4/lib/patch/websocket"),u=require("npm:zone.js@0.5.4/lib/utils"),c="copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror".split(" ");return e.exports={apply:n},i.define=s,e.exports}),System.registerDynamic("npm:zone.js@0.5.4/lib/utils",[],!0,function(require,t,e){function n(t){for(var e=t.length-1;e>=0;e--)"function"==typeof t[e]&&(t[e]=l.zone.bind(t[e]));return t}function r(t){for(var e=t.length-1;e>=0;e--)"function"==typeof t[e]&&(t[e]=l.zone.bindOnce(t[e]));return t}function o(t,e){e.forEach(function(e){var r=t[e];r&&(t[e]=function(){return r.apply(this,n(arguments))})})}function i(){return"undefined"==typeof document}function s(t,e){var n=Object.getOwnPropertyDescriptor(t,e)||{enumerable:!0,configurable:!0};delete n.writable,delete n.value;var r=e.substr(2),o="_"+e;n.set=function(t){this[o]&&this.removeEventListener(r,this[o]),"function"==typeof t?(this[o]=t,this.addEventListener(r,t,!1)):this[o]=null},n.get=function(){return this[o]},Object.defineProperty(t,e,n)}function a(t,e){(e||function(){var e=[];for(var n in t)e.push(n);return e}().filter(function(t){return"on"===t.substr(0,2)})).forEach(function(e){s(t,e)})}function u(t){var e=t.addEventListener;t.addEventListener=function(t,n){var r;return"[object FunctionWrapper]"!==n.toString()&&(r=n.handleEvent?function(t){return function(){t.handleEvent.apply(t,arguments)}}(n):n,n._fn=r,n._bound=n._bound||{},arguments[1]=n._bound[t]=zone.bind(r)),e.apply(this,arguments)};var n=t.removeEventListener;t.removeEventListener=function(t,e){if(e._bound&&e._bound[t]){var r=e._bound;arguments[1]=r[t],delete r[t]}var o=n.apply(this,arguments);return l.zone.dequeueTask(e._fn),o}}function c(t){var e=l[t];if(e){l[t]=function(){var t=n(arguments);switch(t.length){case 0:this._o=new e;break;case 1:this._o=new e(t[0]);break;case 2:this._o=new e(t[0],t[1]);break;case 3:this._o=new e(t[0],t[1],t[2]);break;case 4:this._o=new e(t[0],t[1],t[2],t[3]);break;default:throw new Error("what are you even doing?")}};var r,o=new e;for(r in o)!function(e){"function"==typeof o[e]?l[t].prototype[e]=function(){return this._o[e].apply(this._o,arguments)}:Object.defineProperty(l[t].prototype,e,{set:function(t){"function"==typeof t?this._o[e]=l.zone.bind(t):this._o[e]=t},get:function(){return this._o[e]}})}(r);for(r in e)"prototype"!==r&&e.hasOwnProperty(r)&&(l[t][r]=e[r])}}var l=this,f=l.define;return l.define=void 0,e.exports={bindArguments:n,bindArgumentsOnce:r,patchPrototype:o,patchProperty:s,patchProperties:a,patchEventTargetMethods:u,patchClass:c,isWebWorker:i},l.define=f,e.exports});