浅拷贝 {...obj} 或 Object.assign({},要拷贝的对象)
深拷贝 JSON.parse(JSON.stringify(要拷贝的对象)) 递归的写法 直接写递归如果对象中存在循环引用的问题 会导致栈溢出 解决的办法就是对象只要拷贝了就缓存起来 下次只要是对象的拷贝就先去缓存中看看有没有，如果有直接返回

rbac：基于角色权限控制
