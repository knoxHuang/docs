title: atom-shell 缓存机制
permalink: zh/reports/atom-shell-cache
---

经过测试，atom-shell 其实会自动清理图片缓存。但是清理只会发生在 DevTools 关闭时！
之前我们测试时，几乎都开着 DevTools，所以总是看到内存只增不减，不论怎么设置都没用。

测试时使用大量不同的图片同时加载，所有图片都放到 dom 里然后再从 dom 移除。
结果发现只要图片一段时间不用，并且 atom-shell 正要响应用户操作，图片就会从内存中清除。

测试代码放到了 https://github.com/jareguo/test-atom-shell-cache

另外比较重要的是，一般我们查看进程的时候都会认为内存占的最多的那个就是我们的 web，但其实 Dev tools 只要有操作，内存会比 Web 多出几倍.

## --disable-http-cache

atom-shell 在 v0.20.4 上提供了 `--disable-http-cache`, 但是 `--disable-http-cache` 
清楚 http 缓存只会在下次 GC 时才会发生, 不能解决运行时资源刷新的问题，我们需要显式更换一个新的 url 才能让 atom-shell 重新加载磁盘文件。