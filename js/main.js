
class Paintbrush {
  constructor() {
    this.$root = document.getElementById('root');
    this.$input = document.getElementById('input');
    this.$value = document.getElementById('value');
    this.$btn = document.getElementById('btn');
    this.$back = document.getElementById('back');

    this.COLOR_ARRAY = ["#FF0000", "#FF9900", "#FFCC00", "#00FF00", "#0000FF", "#000066", "#663399", "#000000"];
    this.CANVAS_BACKGROUND_COLOR = '#ffffff';

    this.isRender = false;
    this.flag = false;
    this.brushSize = 10;

    this.init();
  }

  init() {
    this.$value.textContent = this.$input.value;
    this.brushSize = this.$input.value;
    this.setCanvas();
    this.createColorTable();
    this.eventHandler();
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
    this.ctx.arc(offsetX, offsetY, this.brushSize, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  eventHandler() {
    this.canvas.addEventListener('mousemove', this.render);
    this.canvas.addEventListener('mouseup', this.canvasMouseupEvent);
    this.canvas.addEventListener('mousedown', this.canvasMouseupEvent);
    this.canvas.addEventListener('mousedown', this.canvasMouseupEvent);
    this.$input.addEventListener('mousedown', this.setFlagReversal);
    this.$input.addEventListener('mouseup', this.setFlagReversal);
    this.$input.addEventListener('mousemove', this.movingRangeChange);
    this.$input.addEventListener('click', this.clickRangeChange);
    this.$btn.addEventListener('click', this.canvasClear);
    this.$back.addEventListener('click', this.setBackgroundColorReversal);
  }

  setFlagReversal = () => {
    this.flag = !this.flag;
  }

  canvasMouseupEvent = (e) => {
    this.isRender = !this.isRender;
    this.render(e);
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

  canvasClear = () => {
    const { width } = this.ctx.canvas;
    const { height } = this.ctx.canvas;
    this.ctx.fillStyle = this.CANVAS_BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, width, height);
    this.setDefaultColor();
  }


  movingRangeChange = (e) => {
    if (!this.flag) return;
    const { currentTarget } = e;
    const { value } = currentTarget;
    this.$value.textContent = value;
    this.brushSize = value;
  }
  clickRangeChange = (e) => {
    if (this.flag) return;
    const { currentTarget } = e;
    const { value } = currentTarget;
    this.$value.textContent = value;
    this.brushSize = value;
  }

  setDefaultColor() {
    this.CANVAS_BACKGROUND_COLOR === '#ffffff'
      ? this.ctx.fillStyle = '#000000'
      : this.ctx.fillStyle = '#ffffff';
  }
  setBackgroundColorReversal = () => {
    const { width } = this.ctx.canvas;
    const { height } = this.ctx.canvas;

    this.CANVAS_BACKGROUND_COLOR === '#ffffff'
      ? this.CANVAS_BACKGROUND_COLOR = '#000000'
      : this.CANVAS_BACKGROUND_COLOR = '#ffffff'

    this.ctx.fillStyle = this.CANVAS_BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, width, height);
    this.setDefaultColor();
  }

}

new Paintbrush();

