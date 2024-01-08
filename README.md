# vue-version-check

`基于 vue-router 4 + `

被动检验静态资源版本。

客户端正在进行操作过程中若遇到发版，由于静态资源的缺失，或者文件名的调整更新（hash）,可能会带来页面操作无响应的问题。

> https://rollupjs.org/configuration-options/#output-assetfilenames
> https://webpack.js.org/configuration/output/#outputfilename


本工具用于监听静态资源获取异常，并基于此事件进行版本更新提示，完成页面刷新。

```javascript
// 由于本工具是用来检测【后续版本】变化的，因此无需在项目加载之前调用
// App.vue
onBeforeMount(() => {
  useVersionCheck({
    beforeReload: () =>
      showConfirmDialogLocal({
        title: '更新提示',
        message: '新版本已经准备好，点击确认刷新页面！',
        showCancelButton: false
      }).then(() => true)
  })
})
```