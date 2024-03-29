如果你这个 ajax 数据只有当前组件才有用，还是写在组件中，和之前黑马头条一样写法
如果你这个 ajax 数据很多地方都要使用，最好写在 actions 中

把所有写在 actions 也可以

项目安装依赖有点旧

1. 在这个项目中 图片引的时候 前面加一个~
2. 深度选择器 只能 ::v-deep -> :deep(选择器)

ajax 出问题

1. 看载荷 payload

http://127.0.0.1:9528/%20abc/api/sys/login

100 个页面 用户登录会自己的角色 根据角色对 100 个页面进行筛选 得到一个当前这个用户能看到的页面组合 展示出来
权限

有些时候 写一个 demo

1. 数据写死 做一个小 demo 确定官方效果文档你理解了 效果

每个 ajax 都要做的事情可以放在拦截器中

200 成功
201 创建成功
401 没有权限

当我们在进入后台页面的时候，先把路由表获取到 this.$router.options.routes 然后进行 v-for 遍历 hidden 属性如果是 true 直接隐藏 v-if 来实现
每个在侧边栏显示的是路由表 都会有一个 meta 元信息，里面有 title,icon 分别设置标题和图标

要学会调试

1. 单行调试一行一行 console.log

- console.log(1) 还要打印变量的值 undefined

2. 只要是 ajax 看载荷 和 响应回来的数据 传的参数载荷效果出不来 把线上的写好看它载荷
3. 把报错去百度
4. 报错一堆英语去翻译

```js
.catch((err) => {
          console.log(err);
          this.$message.error("abc");
        });
```

数据驱动 数据变了 视图没有变

1. 加 v-if
2. 加 nextTick
3. 把代码写在定时器里面

刚开始的时候数据没有，但是子组件已经初始化了，这个时候 props 写的是 required:true,然后刚开始的时候传进去的是 undefined

动态路由：有的用户能看到的页面多，有的用户能看到的页面少
因为他们的权限不一样
管理员可以看到所有的页面
普通用户只能看几个页面

有些页面路由规则是后期加上去的

有些页面所有的人都可以看的，有些页面只有有对应权限才可以看

<!-- 静态路由表 -->

const constantRoutes = [
{path:'/login',component:}
]

<!-- 动态路由表 -->

const asyncRoutes = []

配套视频

1. 拆分 先考虑一个点 考虑太多写不出来
2. 类比 不要看成新东西 类似的

el-table 中数据不能直接用,需要转换一下数据格式有两种方式可以实现

1. 作用域插槽
2. formatter

聘用形式 在很多页面中都有这个数据

客户端第一次访问服务器 资源需要去服务器下载下来，因为本地没有缓存 除了资源下下来 还有一些响应头存到本地
expire,cache-control 强缓存 只要没有过期 不会和服务器打交道
last-modified,etag 会和服务器进行协商，看本地旧的资源能不能继续用 请求头 if-modified-since if-none-match 304 200

前端权限控制怎么做（动态路由怎么实现）

什么是前端权限控制：权限控制要实现的效果是拥有不同角色的账号登录之后看到的菜单和能访问的页面是不一样的，说白了就是路由是动态加载的(addRoutes)，菜单是动态渲染的(v-for)

路由权限（决定了当前用户能看哪些页面）

1. 本质就是利用了一个 addRoutes 这个 api 来实现的
2. 具体思路
3. 前端维护了两份路由表，一份是静态路由表，一块是动态路由表，默认路由实例挂载的只有静态路由表
4. 用户登录成功之后，会得到一份菜单的数组，我们根据这个菜单数组对动态路由表进行筛选(filter)，路由实例通过 addRoutes 把这个加进去，类似数组合并

菜单权限（决定了当前用户左侧侧边栏有哪些导航）

1. 在 vuex 里面定义一个 permission.js 模块，把筛选之后路由表放到 state 中，这样 SideBar.vue 侧边栏组件就可以通过 getter 拿到这个数据，然后通过 v-for 遍历

面试官可能还会继续问 按钮级别的权限控制（打开知乎，这个文章是你写的，底部会有一个删除和编辑，不是你写，没有这二个按钮）

实现的思路：

1. 用户登录成功之后，会得到一份权限点的数组(points),创建一个全局的混入 mixin,在里面定义一个方法 checkPermission，获取到 vuex 中的 points，和当前页面中这个按钮进行判断，看这个按钮需要权限点是不是在这个 points 里面，如果不是就 disabled

```js
// vuex/getters.js
points: (state) => state.user.userInfo.roles.points; //权限点数组 登录成功之后在userInfo中拿到的

//这是一个混入mixin
export default {
  methods: {
    // 提供一个权限点，看是不是在数组中，返回值是布尔值
    checkPermission(point) {
      return !this.$store.getters.points.includes(point);
    },
  },
};

// main.js 注册全局混入
import mixins from "./mixins";
Vue.mixin(mixins);
```

```html
<el-button type="primary" :disabled="checkPermission('ADD-SOCIAL')"
  >添加</el-button
>
```

混入 mixin 只限于 js 这块
可以混入哪些？ data,methods,8 个钩子函数,computed，props...
一堆组件有相同的选项，就可以写混入
created5 个里面 2 个是一模一样，把这 2 个提取到 mixin 里面 好处：相同的东西只要写一次

面试官问：动态路由是怎么实现的？或者问 权限控制怎么做
权限控制分为三大块

1. 路由权限

- 要达到的效果：用户只能看到自己有权限访问的页面，如果访问不是自己能看到的页面就是 404 不同的账号能看到的页面不一样，有的能看到全部，有的只能看到部分
- 实现思路
  1. 前端路由维护了两份路由表（静态路由表，也就是所有的人都可以看到的，直接在路由实例 router 上面挂载，还有一份动态路由表要根据用户当前权限动态筛选 addRoutes 添加上去的）

2. 菜单权限

- 要达到的效果：后台左侧侧边栏导航是 v-for 动态渲染出来 有的用户能看到所有的菜单 有的只能看到部分
- 实现思路 菜单是根据当前用户自己的路由表来 v-for 动态渲染出来

3. 按钮权限

- 要达到的效果：某个页面上有新增、删除、修改按钮，不同的账号登录之后有的可以操作所有的功能，有的只能新增 （一种思路是 disabled，还有一种思路隐藏）
- 实现思路 登录成功会得到一份权限点列表，里面记录了各个页面上面的按钮能不能操作的标识，我们可以定义一个 mixin 混入，在里面定义一个方法，用于判断当前这个页面上面某个按钮的权限点是不是在权限点列表中，如果是这个按钮是启用或者显示，如果不是，这个按钮就禁用或隐藏

路由和菜单权限控制：开始 --> 登录 --> 登录成功获取当前用户权限列表 --> 根据权限列表生成完整的路由表（包含静态路由表+筛选之后的动态路由表）--> 进入带有菜单的页面,根据完整路由表动态渲染左侧菜单

按钮级别权限其实有二种思路

1. 不要背 在理解的基础上再背
2. 题目听明白 数据响应式

3. 浏览器渲染流程和优化
4. 前端权限控制（动态路由）
5. dialog 组件

浏览器的渲染过程

1. 把 html 文档解析成一棵 DOM 树
2. 把 css 文档解析成一棵 css 规则树
3. DOM 树和 CSS 规则树组成一棵 render 渲染树，然后就根据这个渲染树开始绘制页面

绘制过程会有两种情况，一种是重绘，一种是回流

重绘是和外观有关系，一般是 color,background-color
回流是和布局、尺寸、显示隐藏相关的 一般和带有 px 相关的

回流一定会重绘，重绘不一定回流

频繁的重绘和回流 尤其是回流会导致页面变慢，所以要尽量减少页面重绘和回流

优化的思路

1. 浏览器本身自己的优化 UI 渲染是异步的，它会把所有要绘制放在一个队列中，等到了一定的时间间隔才会一次性批处理绘制
2. 我们可以做的优化：我们要减少重绘和回流就是要减少对渲染树的操作，则我们可以合并多次的 DOM 和样式的修改
3. 尽量不要使用一堆的行内样式操作，而是把要操作的全部写在类 clas 中，然后直接调用这个类名
4. 在操作之前先把这块 display:none;然后把所有的操作全部做完，然后再 display:block,这样只会有两次重绘和回流
5. 使用克隆元素的技术，实现复用
6. 在写动画的时候可以用脱离文档流，避免对文档其他地方有影响
7. 使用 DocumentFragment 文档碎片（不要直接在 DOM 树上操作，而是先搞一个文档碎片，在这个文档碎片上把所有的操作全部做完，在这个文档碎片上做的任何操作不会触发重绘和回流，因为和 DOM 树没有关系，等操作全部搞定，再把这个文档碎片追加到 DOM 树上，只会导致一次重绘和回流）

```js
<script>
// 没有使用文档碎片之前的写法，会导致101次重绘和回流
  var ul = document.createElement('ul')
  document.body.append(ul)
  for(var i=0;i<100;i++){
    var li = document.createElement('li')
    li.innerHTML = i;
    ul.append(li)
  }
</script>
```

```js
<script>
// 只有一次重绘和回流
      var documentFragment = document.createDocumentFragment();
      var ul = document.createElement("ul");
      documentFragment.append(ul);
      for (var i = 0; i < 100; i++) {
        var li = document.createElement("li");
        li.innerHTML = i;
        ul.append(li);
      }
      document.body.append(documentFragment);
    </script>
```

1. 什么是同步什么是异步
   js 是单线程，也就是一次只能做一件事情，所以，如果遇到特别耗费时间的代码，就会导致卡住（页面在转圈），所以，为了解决这个问题，js 就把代码分为两种，一种是同步代码，一种是异步代码（所谓的异步代码指的就是耗时任务，比如 ajax,定时器，触发的 DOM 事件）
2. 事件环 event loop
   - 浏览器是多线程的（浏览器可以边听音乐边看知乎）
   - js 代码是从上往下执行，遇到同步代码直接在 js 栈中执行，遇到异步的代码，比如遇到一个定时器，就把异步代码交给浏览器，让浏览器为这个定时器分配一个独立的线程专门计时，遇到 ajax 也是让浏览器分配一下线程专门发送 ajax
   - 异步代码如果到了需要触发的时机（定时器就是设定的时间到，ajax 就是数据拿回来），它们在拿回来的时候 js 引擎还在忙，它们只能去排队先进先出（类似核酸检测）
   - 当 js 执行栈把代码全部执行完的时候，它就会去 callback queue(回调函数队列)去看有没有回调函数在排队，如果有就把它拿到执行栈中去执行，回调函数里面也可能有一堆的同步异步，所以又会导致新的异步回调去排队，这样就会循环往复执行下去，我们把这个称为 event loop
3. 宏任务和微任务 定时器、ajax 这些东西需要单独开一个线程，不是 js 本身的东西（是 webapi 的东西），我们把它们称为宏任务，还有一种是 promise,async await 这些是 ecmascrpit 本身语法的东西，我们把它们称为微任务
4. 执行顺序 同步代码 -> 微任务 -> 宏任务 -> 微任务 -> 宏任务

- 笔试题让你说出代码打印结果先是谁后是谁
  - new Promise 是同步的 只有 then,catch 是异步
  - async,await --> await 后面写的相当写在 then 里面

说一下你对异步的理解

1. js 是单线程 单线程指的是一次只能做一件事情 这样设计会导致某一块代码如果特别耗时，会让浏览器直接卡住，后面代码没机会执行了，所以解决的思路是 js 把代码分为两种一种是同步代码，一种是异步代码（所谓的异步代码就是耗时性的代码）
2. js 线程遇到同步代码直接执行，遇到异步代码交给浏览器去处理，等浏览器处理好了，就把对应 callback 放到队列中去排队，然后等 js 线程空闲下去就去队列按顺序把 callback 拿进去执行，回调函数里面可能还有同步和异步，所以会导致这个过程会重复循环，我们称这个叫 event loop（事件环 loop 就是循环重复的意思）

宏任务和微任务

1. 宏任务不是 ecmascript 语法规范，是 webapi 或者浏览器提供的东西（定时器，ajax,dom 绑定的事件）
2. 微任务是 js 引擎自己的 ecmascript 本身的语法，我们学过有 Promise

执行的顺序
把同步代码看成是特殊的宏任务， 先宏后微

一. 浏览器的渲染机制以及性能优化

1. 页面初始化的时候：先把 html 解析成一棵 DOM 树 然后把 css 代码解析成一棵 CSS 规则树 然后这二棵树组合成一个 render 渲染树（描述有什么东西 样子长什么样子） 然后开始绘制页面
2. 页面在 js 代码运行还会重新再改变外观和尺寸布局，分为两种：重绘（repaint）、回流(reflow) 回流一定会重绘 重绘不一定会回流

- 回流:和尺寸布局显示隐藏有关
- 重绘：和外面有关的 color background-color

3. 性能优化

- 首先浏览器本身对 UI 渲染是优化，它会把要绘制的东西放在队列中异步渲染
- 我们程序员也可以去优化
  - 可以在操作之后把这块东西隐藏，然后做好再显示(display)
  - 不要频繁行内样式(div.style.color ,div.style) 而是用 className div.className = ''
  - 克隆元素可以复用之前的各种东西
  - 可以把要操作的东西脱离文档流(position:fixed)
  - 文档片段 (documentFragment) 先不要直接操作 DOM 树，先把所有操作在文档片段做好，再把文档片段加入到 DOM 树

2. 异步的理解，宏任务和微任务的理解以及执行顺序

工行 只有一家北京 在全国每个重要的城市搞一个支行

主服务器 + 全国搞一些节点 放代码 策略 就近优先 提供这样的服务的公司 花钱 cdn 服务

像 jquery,vue.js 这些国内还是国外公益性的公司提供免费服务

我们平时写代码有一堆的 console.log 移除所有的 console.log
