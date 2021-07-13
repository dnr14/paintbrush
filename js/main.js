class Paintbrush {
  constructor() {
    this.$root = document.getElementById('root');

    this.v = 10;
    this.COLOR_ARRAY = ["#FF0000", "#FF9900", "#FFCC00", "#00FF00", "#0000FF", "#000066", "#663399", "#000000"];
    this.isRender = false;
    this.init();
  }

  init() {
    this.setCanvas();
    this.eventHandler();
    this.createColorTable();
  }

  setCanvas() {
    const styleObj = {
      boxShadow: `2px 2px 10px rgba(0, 0, 0, .5)`
    }

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        this.ctx.canvas.style[key] = styleObj[key];
      }
    }
    this.setCanvasWidth(500);
    this.setCanvasHeight(500);
    this.$root.appendChild(this.canvas);
  }

  setCanvasWidth(_width) {
    this.ctx.canvas.width = _width;
  }

  setCanvasHeight(_height) {
    this.ctx.canvas.height = _height;
  }
  setCanvasFillStyle(_color) {
    this.ctx.fillStyle = _color;
  }


  render = (e) => {
    if (!this.isRender) return;
    const { offsetX, offsetY } = e;
    this.ctx.beginPath();
    this.ctx.arc(offsetX, offsetY, this.v, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  eventHandler() {
    this.canvas.addEventListener('mousemove', this.optimizeAnimation(this.render));
    this.canvas.addEventListener('mouseup', this.canvasMouseupEvent);
    this.canvas.addEventListener('mousedown', this.canvasMouseupEvent);
    document.getElementById('input').addEventListener('mouseup', (e) => {
      const { currentTarget } = e;
      const { value } = currentTarget;
      this.v = value;
      document.getElementById('value').textContent = value;
    });
    // this.canvas.addEventListener('mousedown', this.canvasMouseupEvent);
  }

  canvasMouseupEvent = (e) => {
    this.isRender = !this.isRender;
    this.render(e);
  }

  // 1초에 최대 60번 실행
  // 60 프레임
  optimizeAnimation = (callback) => {
    let ticking = false;
    return (e) => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          callback(e);
          ticking = false;
        });
      }
    };
  }

  createColorTable() {
    const spanStyleObj = {
      display: `inline-block`,
      borderRadius: `50%`,
      boxShadow: `2px 2px 10px rgba(0, 0, 0, .5)`,
      width: `70px`,
      height: `70px`,
      textAlign: `left`,
      lineHeight: `70px`,
      color: `#fff`,
    }
    const liStyleObj = {
      marginTop: `${10}px`,
      display: `inline-block`,
      padding: `0 5px`,
      cursor: `pointer`,
    };

    const ul = document.createElement('ul');

    this.COLOR_ARRAY.forEach((color, idx) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      li.dataset.tableidx = idx;
      span.style.backgroundColor = color;
      span.textContent = color

      for (const key in liStyleObj) li.style[key] = liStyleObj[key];
      for (const key in spanStyleObj) span.style[key] = spanStyleObj[key];

      li.addEventListener('click', this.colorChange);
      li.appendChild(span);
      ul.appendChild(li);
    });

    this.$root.appendChild(ul);
  }

  colorChange = (e) => {
    const { currentTarget } = e;
    const { tableidx } = currentTarget.dataset;
    const color = this.COLOR_ARRAY[tableidx];
    this.setCanvasFillStyle(color);
  }

  clear = () => {
    const { width } = this.ctx.canvas;
    const { height } = this.ctx.canvas;
    this.ctx.fillStyle = `#fff`;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.fillStyle = `#000`;
  }
  /*
   블랙 배경에 흰색 선
   붓 크기 결정
   캔버스 크기 결정
   지우개


  */

}

new Paintbrush();

