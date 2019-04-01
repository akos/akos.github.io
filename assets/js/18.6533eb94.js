(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{176:function(e,t,a){"use strict";a.r(t);var l=a(18),r=Object(l.a)({},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("接口层(Controller)，承载了定义接口的角色，通过对服务(Service)的组合，封装出具体的业务接口。")]),e._v(" "),a("h2",{attrs:{id:"如何编写controller"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何编写controller","aria-hidden":"true"}},[e._v("#")]),e._v(" 如何编写Controller")]),e._v(" "),a("p",[e._v("我们首先定义一个接口，如:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("module.exports = {\n    async HelloController(ctx) {\n        // 业务处理\n    }\n}\n")])])]),a("p",[e._v("此时这个方法就是一个接口，然后我们需要在接口定义处理的功能接口。")]),e._v(" "),a("p",[e._v("如我们定义一个返回'hello world'")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("module.exports = {\n    async HelloController(ctx) {\n      ctx.body('hello world');\n    }\n}\n")])])]),a("p",[e._v("如需要根据传参进行区分处理，如Router层定义GET接口/hello，传入参数name（路由配置请参考Router层介绍）")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("GET /hello 参数name\nmodule.exports = {\n    async HelloController(ctx) {\n     const name = ctx.request.query.name//参考中间件bodyParsePath\n      ctx.body(`hello ${name}`);\n    }\n}\n")])])]),a("p",[e._v("如参数name为akos，则返回hello akos")]),e._v(" "),a("h2",{attrs:{id:"如何结合service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何结合service","aria-hidden":"true"}},[e._v("#")]),e._v(" 如何结合Service")])])},[],!1,null,null,null);r.options.__file="controller.md";t.default=r.exports}}]);