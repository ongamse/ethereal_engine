(window.webpackJsonp=window.webpackJsonp||[]).push([[1149],{1218:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(7),i=(n(0),n(1348)),c={id:"redux_app_actions.setviewportaction",title:"Interface: SetViewportAction",sidebar_label:"SetViewportAction",custom_edit_url:null,hide_title:!0},o={unversionedId:"docs-client/interfaces/redux_app_actions.setviewportaction",id:"docs-client/interfaces/redux_app_actions.setviewportaction",isDocsHomePage:!1,title:"Interface: SetViewportAction",description:"Interface: SetViewportAction",source:"@site/docs/docs-client/interfaces/redux_app_actions.setviewportaction.md",slug:"/docs-client/interfaces/redux_app_actions.setviewportaction",permalink:"/build/docs/docs-client/interfaces/redux_app_actions.setviewportaction",editUrl:null,version:"current",sidebar_label:"SetViewportAction",sidebar:"sidebar",previous:{title:"Interface: AppOnBoardingStepAction",permalink:"/build/docs/docs-client/interfaces/redux_app_actions.apponboardingstepaction"},next:{title:"Interface: AddConnectionProcessingAction",permalink:"/build/docs/docs-client/interfaces/redux_auth_actions.addconnectionprocessingaction"}},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Properties",id:"properties",children:[{value:"type",id:"type",children:[]},{value:"viewportSize",id:"viewportsize",children:[]}]}],b={toc:p};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"interface-setviewportaction"},"Interface: SetViewportAction"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"/build/docs/docs-client/modules/redux_app_actions"},"redux/app/actions"),".SetViewportAction"),Object(i.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("em",{parentName:"p"},"Action")),Object(i.b)("p",{parentName:"li"},"\u21b3 ",Object(i.b)("strong",{parentName:"p"},"SetViewportAction")))),Object(i.b)("h2",{id:"properties"},"Properties"),Object(i.b)("h3",{id:"type"},"type"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"type"),": ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("p",null,"Inherited from: void"),Object(i.b)("p",null,"Defined in: ",Object(i.b)("a",{parentName:"p",href:"https://github.com/xr3ngine/xr3ngine/blob/66a84a950/packages/client-core/redux/app/actions.ts#L14"},"packages/client-core/redux/app/actions.ts:14")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"viewportsize"},"viewportSize"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"viewportSize"),": ",Object(i.b)("em",{parentName:"p"},"object")),Object(i.b)("h4",{id:"type-declaration"},"Type declaration:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:"left"},"Name"),Object(i.b)("th",{parentName:"tr",align:"left"},"Type"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},Object(i.b)("inlineCode",{parentName:"td"},"height")),Object(i.b)("td",{parentName:"tr",align:"left"},Object(i.b)("em",{parentName:"td"},"number"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},Object(i.b)("inlineCode",{parentName:"td"},"width")),Object(i.b)("td",{parentName:"tr",align:"left"},Object(i.b)("em",{parentName:"td"},"number"))))),Object(i.b)("p",null,"Defined in: ",Object(i.b)("a",{parentName:"p",href:"https://github.com/xr3ngine/xr3ngine/blob/66a84a950/packages/client-core/redux/app/actions.ts#L23"},"packages/client-core/redux/app/actions.ts:23")))}l.isMDXComponent=!0},1348:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),l=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=l(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,b=p(e,["components","mdxType","originalType","parentName"]),s=l(n),u=r,f=s["".concat(c,".").concat(u)]||s[u]||d[u]||i;return n?a.a.createElement(f,o(o({ref:t},b),{},{components:n})):a.a.createElement(f,o({ref:t},b))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,c=new Array(i);c[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var b=2;b<i;b++)c[b]=n[b];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);