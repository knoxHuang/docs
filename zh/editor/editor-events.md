# Editor Events

## API

### EditorApp.on ( name, fn )

注册消息

### EditorApp.off ( name, [fn] )

注销消息

### EditorApp.fire ( name, [params] )

触发消息

## Events

### assetMoved

 - detail
     - src: the real path of the source file
     - dest: the real path of the dest file
