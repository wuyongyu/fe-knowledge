# uni 图片上传问题修复

背景：图片上传要加上 cors，于是按照文档 https://cloud.tencent.com/document/product/436/11459 修改了逻辑。完成后发现在pc端可以上传，但是移动端上传不了图片

排查：进行打印日志，发现执行到 uni.chooseImage 就不执行

查阅资料：发现掘金的一篇文档（https://juejin.cn/post/7011480562070208519）说 uni.chooseImage 不能异步执行，于是尝试调整一下异步的位置，发现移动端能正常上传图片了

解决总结：如果 uni.chooseImage 在异步函数中调用的话，会出现API不可用的情况。应该使用同步的方式调用 uni.chooseImage