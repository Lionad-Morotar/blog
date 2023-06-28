export default function actived(params, next) {
  console.log("执行 actived 生命周期");
  console.log("页面传递参数为:", params);
  console.log("调用 next 函数继续执行弹框展示");
  next();
}
