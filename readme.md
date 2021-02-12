- 开发阶段：
    - 以vue作为开发框架 y
    - 基本的webpack结构
   
        ```shell
        webpack
        ├── babel.config.json  
        ├── dist
        │   ├── css
        │   ├── js
        │   └── template.html
        ├── docs
        │   └── project_directory.md
        ├── jest.config.ts
        ├── jsconfig.json
        ├── package-lock.json
        ├── package.json
        ├── readme.md
        ├── src
        │   ├── components
        │   │   ├── index.js
        │   │   └── input.vue
        │   └── index.js
        ├── test
        │   ├── input.test.js
        │   └── input.test.js.back
        ├── webpack.config.js
        └── yarn.lock
        ```

    - 支持css y
    - 支持.vue单文件开发 y
    - 自定义组件开发 y
    - 单元测试：
        - 以jest作为测试框架 y
        - 如果要整合到webpack里面，可以考虑使用jest-webpack
        - 如果是单独使用，则可以使用jest自己配置 y
        - vue测试，类似vue-loader的解析，需要用vue官方的测试框架：vue单文件开发，有自己的测试框架：https://vue-test-utils.vuejs.org/installation/#using-vue-test-utils-with-jest-recommended
        - 测试环节要整合到webpack里面
    - source-map
    - 预览：
        - 页面模板内容 y
        - 外部脚本、样式引入 y
        - 资源时间戳
        - 服务器预览 y
        - 模块热替换

- 生产阶段：
    - 引入babel，兼容到IE9浏览器
    - 压缩
    - 混淆
    - 公共代码抽取
    - tree-shaking

- 发布阶段
    - 文档说明
    - npm发布
    

- jest文档用法
    - wrapper
        - vm：拿到vue的实例
        - element：拿到根节点
        - options：
            - attachedToDocument：判断组件是否挂在到文档上
            - selector
        - attributes()：返回根节点的dom属性
        - classes()：返回所有的类名
        - contains()：废弃的api，不考虑
        - destory()：销毁组件
        - emited()：读取已经被触发的自定义事件集合
        - exist()：判断某个子wrapper是否存在 eg wraper.find("div").exists()；
        - find()：通过选择符选中某个节点
        - findComponent()：返回第一个匹配的vue组件
        - html()：返回html字符串
        - get():类似find方法，不过找不到的情况下会报错
        - getComponent：类似findComponent
        - isEmpty()：不包含子节点
        - isVisible()：是否可见
        - props(): 返回vm的props
        - setChecked(): 为复选框元素，设置选中效果，并更新v-model绑定数据
        - setData()：设置vm的数据，内部是递归调用Vue.set()    
        - setMethods(): 考虑废弃
        - setProps()：更新vm的属性
        - setSelected(): 如果当前是option，则当作select的选中项，并更新v-model
        - setValue(text)：设置文本input的内容值，并更新v-model绑定数据
        - text()：返回innerText
        - trigger()：异步触发事件，可以 传递参数
    - options
        - 用于mount和shallowMount的选项
        - context: 指定组件的上下文
        - data: 指定组件的data
        - slot: 指定组件的slot
        - scopedSlot：
        - mocks：伪造一些全局数据
        - localVue：创建一个Vue的克隆，避免本地的Vue被污染
        - attachTo：把当前的dom放到某个节点内
        - propsData：挂在组件的props
        - listeners：设置组件的$listeners
        - parentComponent：指定当前的父组件
        - provide：实现provide/inject特性


- 常见问题
    - Q：怎么分开预览和构建的过程？