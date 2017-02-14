Immutable collections for JavaScript
====================================

[![Build Status](https://travis-ci.org/facebook/immutable-js.svg?branch=master)](https://travis-ci.org/facebook/immutable-js)

[Immutable][]数据一旦被创建就无法被改变，这一特性使程序开发更简单，无需通过hack避免数据被无意改变，优化了数据存储，通过简单的逻辑查找数据。这种[Persistent][]的数据（一种数据结构，特点是修改后会保存着修改前的数据。）提供了不更新当前位置的数据，而是为新数据创建新的位置的接口。

Immutable.js 提供了诸多Persistent的数据结构，包括`List`, `Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet` and `Record`。

因为Clojure 和 Scala 的流行，[hash maps tries][] and [vector tries][]更加常用，实现了同构，减少数据的复制与缓存，提高Javascript的效率。

`Immutable` 提供了一种松散的 `Seq` 结构，允许像 `map` 和 `filter` 这样的集合不需要创建中间对象就可以实现链接。

想要了解更多，请看视频：

<a href="https://youtu.be/I7IdS-PbEgI" target="_blank" alt="Immutable Data and React"><img src="https://img.youtube.com/vi/I7IdS-PbEgI/0.jpg" /></a>

[Persistent]: http://en.wikipedia.org/wiki/Persistent_data_structure
[Immutable]: http://en.wikipedia.org/wiki/Immutable_object
[hash maps tries]: http://en.wikipedia.org/wiki/Hash_array_mapped_trie
[vector tries]: http://hypirion.com/musings/understanding-persistent-vector-pt-1


入门
---------------

NPM安装 `immutable` 。

```shell
npm install immutable 
```

在需要的模块中引入。

```javascript
var Immutable = require('immutable');
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
```

### 浏览器

在浏览器上使用 `immutable` ，下载文件 [dist/immutable.min.js](https://github.com/facebook/immutable-js/blob/master/dist/immutable.min.js)
或者使用CDN,如 [CDNJS](https://cdnjs.com/libraries/immutable)
或者 [jsDelivr](http://www.jsdelivr.com/#!immutable.js).

然后，以script标签的形式引入页面：

```html
<script src="immutable.min.js"></script>
<script>
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
</script>
```

或者使用AMD加载器（如[RequireJS](http://requirejs.org/))：

```javascript
require(['./immutable.min.js'], function (Immutable) {
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
});
```

如果你使用的是 [browserify](http://browserify.org/),  `immutable` npm 模块同样适用于浏览器。

###TypeScript

Immutable在TypeScript程序中与原生集合使用方法相同，在IDE中也享有自动填充，错误检测的特性。

只需要在使用Immutable前在js文件中加入一个相对路径。

```javascript
///<reference path='./node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require('immutable');
var map1: Immutable.Map<string, number>;
map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
```

不变性
------

程序开发的难点大多数在于跟踪变化和维持状态。而使用Immutable数据促使你关注数据是如何在程序中流动的。

追踪数据变化产生了大量的记录，降低效率的同时还有可能产生错误造成同步紊乱。由于Immutable数据是不变的，新数据一定是由上一版本数据产生的，不需要追踪数据的变化。

这种数据结构与[React][]配合良好，是[Flux][]思想的最佳助手。

当数据从上层传入，而你也只想在数据发生改变时才执行相关逻辑，如何判断相等与否呢？

Immutable集合应该被视为 *值* 来处理，而不是 *对象*。对象代表它接下来可以被改变，而值代表的是当前时间下一个特定值。这个特点是理解何时使用Immutable数据的重点。因为要将Immutable.js 的集合视为值，我们需要使用 `Immutable.is()` 函数 或者 `.equals()` 方法来判断值的相等，而不是用 `===` 操作符来判断对象引用的相等。

```javascript
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 2);
assert(map1.equals(map2) === true);
var map3 = map1.set('b', 50);
assert(map1.equals(map3) === false);
```

注意：出于性能优化的考量，当一系列操作后的结果是与操作前完全相同的集合是，`Immutable` 会返回原集合，这种情况下，允许使用 `===`来判断是否原集合完全没有变化。`===` 用在memoization（注1）里是非常有效的，因为在比较结果是否已被缓存时，可能会涉及到深度比较，效率变低，不如直接重新执行函数。而有了这一特性，配合 `===` 操作符可以直接判断引用是否相等，不需要深度比较了。当然`===`也被用在了 `Immutable.is()` 和 `.equals()`里面，以达到优化效果。

如果想要复制一个不可变的对象，你只需要新建一个指向它的引用，而不需要复制整个对象了。引用是比对象小很多，节省内存并提高了含有大量拷贝行为程序的运行速度。

```javascript
var map1 = Immutable.Map({a:1, b:2, c:3});
var clone = map1;
```




[React]: http://facebook.github.io/react/
[Flux]: http://facebook.github.io/flux/docs/overview.html

注1：将函数每次执行后的返回值缓存起来，每次执行函数前在这个缓存中查找是否有执行过的值，如果有，则直接返回该值。

JavaScript优先原则
--------------------

`immutable` 是以Clojure, Scala, Haskell等函数式编程环境为灵感设计的，它的初衷是将一些强大的概念带入JavaScript中，因此也拥有[ES6][] [Array][], [Map][], and [Set][]中相同的面向对象接口。

[ES6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

在不可变集合中，那些改变集合的方法，比如： `push`, `set`, `unshift` 和 `splice`，返回的是新的不可变集合。返回新数组的方法，比如：`slice` 和 `concat` ，会返回新的不可变集合。

```javascript
var list1 = Immutable.List.of(1, 2);
var list2 = list1.push(3, 4, 5);
var list3 = list2.unshift(0);
var list4 = list1.concat(list2, list3);
assert(list1.size === 2);
assert(list2.size === 5);
assert(list3.size === 6);
assert(list4.size === 13);
assert(list4.get(0) === 1);
```

几乎所有[Array][] ，[Map][] ，[Set][] 的方法都分别在 `Immutable.List` `Immutable.Map` `Immutable.Set`中被实现了。包括操作集合的 `forEach()`
和 `map()` 方法。

```javascript
var alpha = Immutable.Map({a:1, b:2, c:3, d:4});
alpha.map((v, k) => k.toUpperCase()).join();
// 'A,B,C,D'
```

### 接受纯JavaScript对象

`immutable`是为在JavaScript内部使用而设计的，因此当方法接收[Iterable][]对象时，就也接收原生JavaScript的数组和对象，而不会造成性能上的折损。

```javascript
var map1 = Immutable.Map({a:1, b:2, c:3, d:4});
var map2 = Immutable.Map({c:10, a:20, t:30});
var obj = {d:100, o:200, g:300};
var map3 = map1.merge(map2, obj);
// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
```

这种情况是因为 `immutable` 以Iterable的方式来处理JavaScript数组和对象的。利用这一特性，在JavaScript对象上弥补原生高阶函数较少的缺点。比如Seq求值时不对内部结果缓存造成的低效率，都可以用如下操作提高。

```javascript
var myObject = {a:1,b:2,c:3};
Immutable.Seq(myObject).map(x => x * x).toObject();
// { a: 1, b: 4, c: 9 }
```
需要注意，像这样使用JS对象构造Immutable Maps的时候，虽然Immutable Maps接受任意类型的键值，但是JS对象的成员永远是字符串类型，即使没有括在引号间。

```js
var obj = { 1: "one" };
Object.keys(obj); // [ "1" ]
obj["1"]; // "one"
obj[1];   // "one"

var map = Immutable.fromJS(obj);
map.get("1"); // "one"
map.get(1);   // undefined
```

访问JS对象会默认将key值转换为字符串，而Immutable Map 接收所有类型的key值，因此不会隐式转换key值为字符串，所以返回了undefined。

[Iterable]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols


### 转换回纯JS对象

所有`immutable` [Iterable][] 都可以通过`toArray()` 和 `toObject()`被浅层转换成JS的原生数组和对象类型，深层转换也可以通过`toJS()`来实现。并且都加入了`toJSON()`方法，允许 Immutable Iterables直接传入`JSON.stringify`方法。

```javascript
var deep = Immutable.Map({ a: 1, b: 2, c: Immutable.List.of(3, 4, 5) });
deep.toObject() // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
deep.toArray() // [ 1, 2, List [ 3, 4, 5 ] ]
deep.toJS() // { a: 1, b: 2, c: [ 3, 4, 5 ] }
JSON.stringify(deep) // '{"a":1,"b":2,"c":[3,4,5]}'
```

### 兼容ES6

[ES6][] 规范中新加入的特性，`Immutable`也有借鉴，包括[Iterators][],[Arrow Functions][], [Classes][], 和 [Modules][]。另外还包括ES6中新的集合类型[Map][] and [Set][]。为了兼容更多的浏览器，我们已经将库转译为以ES3为基础的了。

所有的示例代码都是以ES6为规范写的，如果你使用旧浏览器或者想要兼容所有浏览器，那么在执行前需要预编译为ES3规范的，这样Immutable才能正常执行。

```js
// ES6
foo.map(x => x * x);
// ES3
foo.map(function (x) { return x * x; });
```

[Iterators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol
[Arrow Functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[Classes]: http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes
[Modules]: http://www.2ality.com/2014/09/es6-modules-final.html


嵌套结构
-------

`immutable`中的集合可以是深层嵌套的树状数据结构，类似于JSON类型。

```javascript
var nested = Immutable.fromJS({a:{b:{c:[3,4,5]}}});
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
```

读取和操作这种嵌套结构的数据如`List`,`Map` 和 `OrderedMap`，可以使用：`mergeDeep`, `getIn`, `setIn`, and `updateIn`等方法。效率很高。

```javascript
var nested2 = nested.mergeDeep({a:{b:{d:6}}});
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

nested2.getIn(['a', 'b', 'd']); // 6

var nested3 = nested2.updateIn(['a', 'b', 'd'], value => value + 1);
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

var nested4 = nested3.updateIn(['a', 'b', 'c'], list => list.push(6));
// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
```

懒序列（Lazy Seq）
-----------------

`Seq` 代表一种可以高效链式调用迭代方法（如 `map` `filter`）的操作。

**Seq 是不可变的** ——一旦被创建，不能被改变，不论是追加，重新排序还是修改。Seq调用任何引起变化的方法，都会返回一个新的Seq。

**Seq 是懒惰的** ——能不做，就不做。

比如下面这段代码中Seq调用了方法后返回的Seq没有用到，所以这段代码根本不会执行：

    var oddSquares = Immutable.Seq.of(1,2,3,4,5,6,7,8)
      .filter(x => x % 2).map(x => x * x);

当Seq有用处的时候，它也只做必要的工作。在下面的代码中，没有创建内部换存数组（不使用memoization），filter方法总共执行了三次，map方法只执行了一次。

    console.log(oddSquares.get(1)); // 9

任一集合都可以通过`.toSeq()`转换为懒序列。

    var seq = Immutable.Map({a:1, b:1, c:1}).toSeq();

Seq允许链式操作，尤其是在转化成另一种固定类型（如JS对象）时：

    seq.flip().map(key => key.toUpperCase()).flip().toObject();
    // { A: 1, B: 1, C: 1 }

还有当逻辑表达式结果超出范围的情况下：

    Immutable.Range(1, Infinity)
      .skip(1000)
      .map(n => -n)
      .filter(n => n % 2 === 0)
      .take(2)
      .reduce((r, n) => r * n, 1);
    // 1006008

注意：像`Map`这样的对象总以相同的顺序被迭代，即使这个“相同顺序”并没有固定规则。

像判断数据相等那样判断集合相等
-----------------------------

`Immutable`中判断不变性数据结构的相等，方法与纯数据相同，如果有需要请进行深度地相等性判定。

```javascript
var map1 = Immutable.Map({a:1, b:1, c:1});
var map2 = Immutable.Map({a:1, b:1, c:1});
assert(map1 !== map2); // two different instances
assert(Immutable.is(map1, map2)); // have equivalent values
assert(map1.equals(map2)); // alternatively use the equals method
```

`Immutable.is()`方法判定相等的原则与[Object.is][]一样。包括在参与比较的两个对象都是不可变的，且所有键值对都判定相等的情况。

[Object.is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is


批量突变
---------

> 如果一棵树倒在树林里，有没有声音？
>
> 如果一个纯函数为了返回一个不可变的值而改变了某个局部数据，
> 这样做可以吗？
>
> — Rich Hickey, Clojure

通过突变的方式产生不可变的结果往往会造成系统开销增大，降低运行效率。如果在得到返回值之前需要突变一系列的局部变量，`Immutable`提供了创建集合的临时可变副本的功能，并且会用 `withMutations`方法在运行时应用这些批量突变。事实上，这也是 `Immutable` 自身实现复杂改变的原理。

下面这个例子，构建list2的过程中只新创建了一个新的不可变列表，而不是三个。

```javascript
var list1 = Immutable.List.of(1,2,3);
var list2 = list1.withMutations(function (list) {
  list.push(4).push(5).push(6);
});
assert(list1.size === 3);
assert(list2.size === 6);
```

注意：在`withMutations`方法里，只有`set`, `push` 和 `pop`这几个方法可以直接用在[persistent data-structure][]上的，其他方法，比如`map`, `filter`, `sort`,
和 `splice` 永远返回新的不可变对象，绝不会改变可变集合。
（没太看明白这里，不过了解persistent data-structure是非常必要的）

[persistent data-structure](https://en.wikipedia.org/wiki/Persistent_data_structure)


文档
-------

[文档](http://facebook.github.io/immutable-js/docs/) 你应该看的，不要逃避。

Docs are automatically generated from [Immutable.d.ts](https://github.com/facebook/immutable-js/blob/master/type-definitions/Immutable.d.ts).
Please contribute!

也不要错过 [Wiki](https://github.com/facebook/immutable-js/wiki) 包含相关话题。
有问题了？看这里 [issue](https://github.com/facebook/immutable-js/issues).


测试
-------

这两个 [Chai Assertion Library](http://chaijs.com/), [Chai Immutable](https://github.com/astorije/chai-immutable) 提供了Immutable相关断言以供测试



参与
------------

通过 [Github issues](https://github.com/facebook/immutable-js/issues) 提出需求.

欢迎 pull requests, 方法见 [contribute](./CONTRIBUTING.md).


更新日志
---------

改动记录在 [Github releases](https://github.com/facebook/immutable-js/releases).


感谢
------

[Phil Bagwell](https://www.youtube.com/watch?v=K2NYwP90bNs), 感谢他在 persistent data structures方面的研究贡献.

[Hugh Jackson](https://github.com/hughfdjackson/), for providing the npm package
name. If you're looking for his unsupported package, see [this repository](https://github.com/hughfdjackson/immutable).


License
-------

`Immutable` is [BSD-licensed](https://github.com/facebook/immutable-js/blob/master/LICENSE). We also provide an additional [patent grant](https://github.com/facebook/immutable-js/blob/master/PATENTS).
