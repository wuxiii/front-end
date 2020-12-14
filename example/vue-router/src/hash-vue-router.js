// console.dir(Vue);
let _Vue = null;
export default class VueRouter {
  // let refreshHash
  static install(Vue) {
    //1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //2 把Vue的构造函数记录在全局
    _Vue = Vue;
    //3 把创建Vue的实例传入的router对象注入到Vue实例
    // _Vue.prototype.$router = this.$options.router
    _Vue.mixin({
      beforeCreate() {
        console.log('beforeCreate', window.location.hash);
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    this.routeMap = {};
    // observable
    this.data = _Vue.observable({
      current: window.location.hash.split('#')[1] || '/',
    });
    this.init();
    console.log('constructor', window.location.hash);
  }
  init() {
    this.createRouteMap();
    this.initComponent(_Vue);
    this.initEvent();
  }
  createRouteMap() {
    //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
  initComponent(Vue) {
    Vue.component('router-link', {
      props: {
        to: String,
      },
      render(h) {
        return h(
          'a',
          {
            attrs: {
              href: `#${this.to}`,
            },
            on: {
              click: this.clickhander,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickhander() {
          this.$router.data.current = this.to;
        },
      },
      // template:"<a :href='to'><slot></slot><>"
    });
    const self = this;
    Vue.component('router-view', {
      render(h) {
        // self.data.current
        console.log('router-view', self.data.current);
        const cm = self.routeMap[self.data.current];
        return h(cm);
      },
    });
  }
  initEvent() {
    //
    window.addEventListener('hashchange', () => {
      console.log('hashchange', window.location.hash);
      this.data.current = window.location.hash.split('#')[1];
    });
  }
}
