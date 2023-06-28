// 如果是宿主环境, 添加类名
if (window.microApp) {
  const rootDom = document.getElementById("app");
  rootDom.classList.add("CYBERCLOUD-IN-PLATFORM");
}
