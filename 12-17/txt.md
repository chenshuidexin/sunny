## onstorage事件
>兄弟页面进行触发：同一个浏览器、同一个域名、不同的tab
>>>>cookie 前端用基本上就是为了本地缓存，后端用是为了下次操作的时候把记录发送给后端
## localStorage
>专门为前端准备的本地存储
- 生命周期:(跟域名而走)  =>  只要不删除，就永远留着  =>  据说有体积是5M,而且未来还会增加
```
增：
localStorage.setItem(key,val)
删：
localStorage.removeItem(key)
查：
localStorage.getItem(key)
清除：
localStorage.clear()
不能用解构赋值
```
## sessionStorage
- 都是本地存储
- 默认生命周期就是关闭浏览器就会死亡
- setItem  getItem  removeItem  clear
- 不同点：
- 不能设置生命周期
- 不能使用onstroage事件
## BOM
>



















## 服务器时间
>使用服务器时间安全可靠，使用本地时间可以让人随意改变

>如果在使用服务器时间的时候，发现设置的时间是1970，直接在后面*1000，因为服务器时间是按照秒计算的。