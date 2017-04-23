### 20170423 

* 跑不起来，存个档，唯一的看点就只有数据结构的重构。PlanList Mock的数据结构先保持原样放到了Store(reducer)中，在组件里改变（Pages/PlanList/index.js），目的是将数据结构与组件的逻辑结构统一。最开始是有错误的，在sencond render的时候（回退时，这个场景我之前写Demo的时候没有遇到过，有点慌。笔记见：[LazyManagerDocs][]）会报warning，但解决了。

* 第一个真的Production的项目吧，整体的目录结构其实不怎么好，我不能上传其他的（因为不是我写的嘛）。
虽然我知道大型项目要按照View分，但不管你按什么分类都要有Containers和Components呀。
    * containers
        * Pages(import components from components/pages/XXX.jsx)
        * Layouts
        * App.jsx
        * XXX.jsx(reusable Containers)
    * components
        * Pages
        * Layouts
        * XXX.jsx(reusable Components)

*整理了一下我觉得合理的目录结构，觉得还是公司里的项目不够大吧。*

* Java 和 Clojure 我视图下载了两周，想知道上海网速最快的咖啡厅，餐厅，Lounge。






[LazyManagerDocs]:https://github.com/AnnabellGhost/NoteAndDucument/blob/master/Note_20170403.md