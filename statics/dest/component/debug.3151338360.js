!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;"undefined"!=typeof window?r=window:"undefined"!=typeof global?r=global:"undefined"!=typeof self&&(r=self),r.debug=e()}}(function(){return function e(r,n,o){function t(a,c){if(!n[a]){if(!r[a]){var u="function"==typeof require&&require;if(!c&&u)return u(a,!0);if(s)return s(a,!0);var i=new Error("Cannot find module '"+a+"'");throw i.code="MODULE_NOT_FOUND",i}var l=n[a]={exports:{}};r[a][0].call(l.exports,function(e){var n=r[a][1][e];return t(n?n:e)},l,l.exports,e,r,n,o)}return n[a].exports}for(var s="function"==typeof require&&require,a=0;a<o.length;a++)t(o[a]);return t}({1:[function(e,r,n){function o(){return n.colors[l++%n.colors.length]}function t(e){function r(){}function t(){var e=t,r=+new Date,s=r-(i||r);e.diff=s,e.prev=i,e.curr=r,i=r,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=o());var a=Array.prototype.slice.call(arguments);a[0]=n.coerce(a[0]),"string"!=typeof a[0]&&(a=["%o"].concat(a));var c=0;a[0]=a[0].replace(/%([a-z%])/g,function(r,o){if("%%"===r)return r;c++;var t=n.formatters[o];if("function"==typeof t){var s=a[c];r=t.call(e,s),a.splice(c,1),c--}return r}),"function"==typeof n.formatArgs&&(a=n.formatArgs.apply(e,a));var u=t.log||n.log||console.log.bind(console);u.apply(e,a)}r.enabled=!1,t.enabled=!0;var s=n.enabled(e)?t:r;return s.namespace=e,s}function s(e){n.save(e);for(var r=(e||"").split(/[\s,]+/),o=r.length,t=0;o>t;t++)r[t]&&(e=r[t].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function a(){n.enable("")}function c(e){var r,o;for(r=0,o=n.skips.length;o>r;r++)if(n.skips[r].test(e))return!1;for(r=0,o=n.names.length;o>r;r++)if(n.names[r].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}n=r.exports=t,n.coerce=u,n.disable=a,n.enable=s,n.enabled=c,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var i,l=0},{ms:2}],2:[function(e,r){function n(e){var r=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);if(r){var n=parseFloat(r[1]),o=(r[2]||"ms").toLowerCase();switch(o){case"years":case"year":case"y":return n*l;case"days":case"day":case"d":return n*i;case"hours":case"hour":case"h":return n*u;case"minutes":case"minute":case"m":return n*c;case"seconds":case"second":case"s":return n*a;case"ms":return n}}}function o(e){return e>=i?Math.round(e/i)+"d":e>=u?Math.round(e/u)+"h":e>=c?Math.round(e/c)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function t(e){return s(e,i,"day")||s(e,u,"hour")||s(e,c,"minute")||s(e,a,"second")||e+" ms"}function s(e,r,n){return r>e?void 0:1.5*r>e?Math.floor(e/r)+" "+n:Math.ceil(e/r)+" "+n+"s"}var a=1e3,c=60*a,u=60*c,i=24*u,l=365.25*i;r.exports=function(e,r){return r=r||{},"string"==typeof e?n(e):r["long"]?t(e):o(e)}},{}],3:[function(e,r,n){function o(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function t(){var e=arguments,r=this.useColors;if(e[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+e[0]+(r?"%c ":" ")+"+"+n.humanize(this.diff),!r)return e;var o="color: "+this.color;e=[e[0],o,"color: inherit"].concat(Array.prototype.slice.call(e,1));var t=0,s=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(t++,"%c"===e&&(s=t))}),e.splice(s,0,o),e}function s(){return"object"==typeof console&&"function"==typeof console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(e){try{null==e?localStorage.removeItem("debug"):localStorage.debug=e}catch(r){}}function c(){var e;try{e=localStorage.debug}catch(r){}return e}n=r.exports=e("./debug"),n.log=s,n.formatArgs=t,n.save=a,n.load=c,n.useColors=o,n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(c())},{"./debug":1}]},{},[3])(3)});