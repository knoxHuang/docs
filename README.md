

## Troubleshooting


 ### `[Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND'`

 Unknown reason for causing this issue. Reinstall local hexo with `no-optional` param to fix it:

 ```bash
 npm install hexo --no-optional
 ```

 参考 https://github.com/hexojs/hexo/issues/1055