import css from "../app.css";

/* 输入框 */
const input_value = document.getElementById("input");
const inputWrap = document.getElementById("ks");
const seIcon = document.getElementsByClassName("icon-div")[0];
const url = ["https://www.baidu.com/s?wd=", 'https://cn.bing.com/search?q=', 'https://www.google.com/search?q='];

/* 默认是百度 */
let whichUrl = 0;

/* 输入框聚焦 */
function inputFocus() {
  input_value.focus()
  inputWrap.style.boxShadow = `0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)`
}

/* 页面聚焦事件 */
window.onfocus = function () {
  inputFocus()
}

/* 地址重定向 */
function sear() {
  let value = input_value.value.trim()
  if (!input_value.value) return;
  location.href = encodeURI(url[whichUrl] + value)
}

/* 输入框的回车搜索和esc清除 */
input_value.addEventListener("keydown", function (e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 13:
      sear();
      break;
    case 27:
      input_value.value = "";
      break;
  }
})

/* 页面回车搜索esc去掉菜单 */
document.addEventListener("keydown", function (e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 13:
      sear();
      break;
    case 27:
      cancelMenu()
      break;
  }
  cancelMenu()
  inputFocus()
})


/* 搜索图标点击事件 */
seIcon.addEventListener("click", function () {
  if (input_value.value.trim() == '') return;
  sear()
})


/* 输入框聚焦离开事件 */
input_value.addEventListener("focus", function () {
  inputWrap.style.boxShadow = `0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)`
})

input_value.addEventListener("blur", () => {
  inputWrap.style.boxShadow = `0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)`
})


/* 搜索引擎选择功能 */

/* 从localStorage中读取数据 */
let data = localStorage.getItem("whichUrl")

/* 没有默认百度,有就设置为whichUrl */
if (data == null) {
  localStorage.setItem("whichUrl", 0)
} else {
  whichUrl = data
}

const menu = document.getElementsByClassName("contextMenu")[0];
const body = document.getElementsByTagName("body")[0];

menu.addEventListener('click', function (e) {
  e = e || window.event;
  /* 阻止冒泡 */
  e.cancelBubble ? e.cancelBubble = true : e.stopPropagation()

  /* 菜单的三个孩子 */
  let whichChild = menu.children;
  let len = whichChild.length;

  for (let i = 0; i < len; i++) {
    if (e.target == whichChild[i]) {
      whichUrl = i;
      localStorage.setItem("whichUrl", i)
    }
  }
  /* 单击完菜单消失,输入框聚焦 */
  menu.style.display = "none"
  inputFocus()
})

/* 页面右击菜单 */
document.addEventListener("contextmenu", function (e) {
  e = e || window.event;
  e.returnValue = false;
  e.preventDefault();
  if (e.target != body) {
    cancelMenu()
    return
  }
  /* 获取鼠标位置 */
  let x = e.clientX;
  let y = e.clientY;
  menu.style.cssText = `left: ${x}px; top: ${y}px; display: block`;

  /* 点击页面取消菜单 */
  body.onclick = cancelMenu;

  /* 页面离开取消菜单 */
  window.onblur = cancelMenu;

})

/* 取消右击菜单 */
function cancelMenu() {
  menu.style.display = `none`
}