!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("uk-dnd",[],t):"object"==typeof exports?exports["uk-dnd"]=t():e["uk-dnd"]=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.default=r.a},function(e,t,n){"use strict";function r(e){a||n(2)}var o=n(8),s=n(9),a=!1,i=n(7),u=r,d=i(o.a,s.a,u,"data-v-1952df7c",null);d.options.__file="src/uk-dnd.vue",d.esModule&&Object.keys(d.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),d.options.functional&&console.error("[vue-loader] uk-dnd.vue: functional components are not supported with templates, they should use render functions."),t.a=d.exports},function(e,t,n){var r=n(3);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(5)("7afc0586",r,!1)},function(e,t,n){t=e.exports=n(4)(void 0),t.push([e.i,"\n.uk-draggable[data-v-1952df7c] {\n  position: absolute;\n  box-sizing: border-box;\n}\n.uk-draggable[data-v-1952df7c]:hover {\n  cursor: move;\n}\n",""])},function(e,t){function n(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var s=r(o);return[n].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([s]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var s=this[o][0];"number"==typeof s&&(r[s]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=c[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(s(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],o=0;o<n.parts.length;o++)a.push(s(n.parts[o]));c[n.id]={id:n.id,refs:1,parts:a}}}}function o(){var e=document.createElement("style");return e.type="text/css",f.appendChild(e),e}function s(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(v)return h;r.parentNode.removeChild(r)}if(g){var s=l++;r=p||(p=o()),t=a.bind(null,r,s,!1),n=a.bind(null,r,s,!0)}else r=o(),t=i.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function a(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=m(t,o);else{var s=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}function i(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var d=n(6),c={},f=u&&(document.head||document.getElementsByTagName("head")[0]),p=null,l=0,v=!1,h=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){v=n;var o=d(e,t);return r(o),function(t){for(var n=[],s=0;s<o.length;s++){var a=o[s],i=c[a.id];i.refs--,n.push(i)}t?(o=d(e,t),r(o)):o=[];for(var s=0;s<n.length;s++){var i=n[s];if(0===i.refs){for(var u=0;u<i.parts.length;u++)i.parts[u]();delete c[i.id]}}}};var m=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],r={},o=0;o<t.length;o++){var s=t[o],a=s[0],i=s[1],u=s[2],d=s[3],c={id:e+":"+o,css:i,media:u,sourceMap:d};r[a]?r[a].parts.push(c):n.push(r[a]={id:a,parts:[c]})}return n}},function(e,t){e.exports=function(e,t,n,r,o){var s,a=e=e||{},i=typeof e.default;"object"!==i&&"function"!==i||(s=e,a=e.default);var u="function"==typeof a?a.options:a;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns),r&&(u._scopeId=r);var d;if(o?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},u._ssrRegister=d):n&&(d=n),d){var c=u.functional,f=c?u.render:u.beforeCreate;c?u.render=function(e,t){return d.call(t),f(e,t)}:u.beforeCreate=f?[].concat(f,d):[d]}return{esModule:s,exports:a,options:u}}},function(e,t,n){"use strict";t.a={methods:{dragstart:function(e){this.$emit("dragstart")},drag:function(e){this.$emit("drag")},dragend:function(e){this.$emit("dragend")}}}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"uk-draggable",on:{mousedown:function(t){t.stopPropagation(),t.preventDefault(),e.dragstart(t)},mousemove:function(t){t.stopPropagation(),t.preventDefault(),e.drag(t)},mouseup:function(t){t.stopPropagation(),t.preventDefault(),e.dragend(t)}}},[e._t("default")],2)},o=[];r._withStripped=!0;var s={render:r,staticRenderFns:o};t.a=s}])});