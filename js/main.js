
var leonus = {
  //显示菜单
  showMenu() {
    document.getElementById("body").classList.add("show-menu");
  },
  hideMenu() {
    document.getElementById("body").classList.remove("show-menu");
  },
  throttle(fn, time = 200) {
    let pre = 0;
    let timeout = 0;
    return function (...args) {
      const now = Date.now();
      if (now - pre > time) {
        pre = now;
        fn.apply(this, args);
      } else {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null;
        }
        timeout = setTimeout(() => {
          pre = now;
          fn.apply(this, args);
        }, time);
      }
    }
  },
  //跳转到id
  scrollTo(id) {
    let target = document.getElementById(id);
    if (!target) return;
    let targetPosition = target.offsetTop - 43;
    // let targetPosition = target.offsetTop;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startPosition, distance, 600);
      window.scrollTo(0, run);
      if (timeElapsed < 600) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  },
  scrollToTop() {
    const duration = 600;
    const startPosition = window.pageYOffset;
    const distance = -window.pageYOffset;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, scrollY);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}

// 添加视差效果
new simpleParallax(document.getElementsByClassName('banner-pic-img'), {
  orientation: 'up',
  scale: 1.2,
  delay: 2,
  transition: 'cubic-bezier(0,0,0,1)',
  maxTransition: 50,
  overflow: true
});
// 添加菜单点击事件
document.getElementById("nav-menu").addEventListener('click', () => { if (document.getElementById("body").classList.contains('show-menu')) leonus.hideMenu(); else leonus.showMenu(); }, false)

document.querySelector('.menu-list').onclick = () => { leonus.hideMenu(); }

//阻止菜单滚动
document.querySelector('.menu-list').addEventListener('wheel', (e) => { e.preventDefault() })
document.body.onscroll = leonus.throttle(() => {
  let scroll = document.documentElement.scrollTop || window.pageYOffset
  if (scroll > 500) document.getElementById('go-top').classList.add('show')
  else document.getElementById('go-top').classList.remove('show')
})

var notyf = new Notyf({
  duration: 2000,
  types: [
    {
      type: 'qq',
      background: '#333333',
      icon: {
        className: 'iconfont icon-qq-line',
        tagName: 'span',
        color: 'white'
      }
    },
    {
      type: 'wechat',
      background: '#333333',
      icon: {
        className: 'iconfont icon-weixin',
        tagName: 'span',
        color: 'white'
      }
    }
  ]
});
new ClipboardJS(".qq-btn", { text: function () { return '1418045110' } }).on('success', () => { notyf.open({ type: 'qq', message: 'QQ号已复制到剪切板' }) })
new ClipboardJS(".wx-btn", { text: function () { return 'NotBoundException' } }).on('success', () => { notyf.open({ type: 'wechat', message: '微信号已复制到剪切板' }) })