/**
 * 图表 - 圆环带进度条
 */
export class CircleBox {
  /**
   * 构造函数
   * @param {Object} _context
   */
  constructor(_context) {
    this.ctx = _context;
    //直径
    this.radius = uni.upx2px(58);
    //四周内填充
    this.padding = uni.upx2px(6);
    //圆环宽度
    this.lineWidth = uni.upx2px(6);
    //圆环颜色
    this.lineColor = "rgba(244, 243, 253, 1)";
    //当前百分比
    this.percent = 0;
    //进度条颜色
    this.percentLineColor = "rgba(112, 112, 112, 1)";
    //字体大小
    this.fontSize = uni.upx2px(42);
    //字段颜色
    this.fontColor = "#FB8F23";
  }

  /**
   * 绘制圆环
   */
  drawCircle() {
    //清空画面
    this.ctx.clearRect(0, 0, this.radius, this.radius);
    //计算实际半径
    let _radius = this.radius / 2 - this.padding - this.lineWidth;

    //开始绘制圆环
    this.ctx.beginPath();
    this.ctx.arc(
      this.radius / 2,
      this.radius / 2,
      _radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.stroke();

    //绘制进度条部分
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    this.ctx.arc(
      this.radius / 2,
      this.radius / 2,
      _radius,
      -(Math.PI / 2),
      Math.PI * 2 * this.percent - Math.PI / 2,
      false
    );
    this.ctx.strokeStyle = this.percentLineColor;
    this.ctx.stroke();
    //恢复之前保存的绘图上下文
    this.ctx.restore();

    //绘制文字
    // this.ctx.font = 'bold '+this.fontSize+'px sans-serif';
    // this.ctx.setFillStyle(this.fontColor);
    // this.ctx.setTextAlign('center');
    // this.ctx.fillText(parseInt((this.percent*100))+'%', this.radius/2+(this.lineWidth/2), this.radius/2+(this.lineWidth/2), this.radius);

    //绘制图形
    this.ctx.draw();
  }
}

/**
 * 图表 - 视频圆环带进度条
 */

export class VideoCircleBox {
  /**
   * 构造函数
   * @param {Object} _context
   */
  constructor(_context) {
    this.ctx = _context;
    //直径
    this.radius = uni.upx2px(102);
    //四周内填充
    this.padding = uni.upx2px(4);
    //圆环宽度
    this.lineWidth = uni.upx2px(4);
    //圆环颜色
    this.lineColor = "rgba(63, 161, 98, 1)";
    //当前百分比
    this.percent = 0;
    //进度条颜色
    this.percentLineColor = "rgba(254, 161, 100, 1)";
    //字体大小
    this.fontSize = uni.upx2px(42);
    //字段颜色
    this.fontColor = "#FB8F23";
  }

  /**
   * 绘制圆环
   */
  drawCircle() {
    //清空画面
    this.ctx.clearRect(0, 0, this.radius, this.radius);
    //计算实际半径
    let _radius = this.radius / 2 - this.padding - this.lineWidth;

    //开始绘制圆环
    this.ctx.beginPath();
    this.ctx.arc(
      this.radius / 2,
      this.radius / 2,
      _radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.stroke();

    //绘制进度条部分
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    this.ctx.arc(
      this.radius / 2,
      this.radius / 2,
      _radius,
      -(Math.PI / 2),
      Math.PI * 2 * this.percent - Math.PI / 2,
      false
    );
    this.ctx.strokeStyle = this.percentLineColor;
    this.ctx.stroke();
    //恢复之前保存的绘图上下文
    this.ctx.restore();

    //绘制文字
    // this.ctx.font = 'bold '+this.fontSize+'px sans-serif';
    // this.ctx.setFillStyle(this.fontColor);
    // this.ctx.setTextAlign('center');
    // this.ctx.fillText(parseInt((this.percent*100))+'%', this.radius/2+(this.lineWidth/2), this.radius/2+(this.lineWidth/2), this.radius);

    //绘制图形
    this.ctx.draw();
  }
}
