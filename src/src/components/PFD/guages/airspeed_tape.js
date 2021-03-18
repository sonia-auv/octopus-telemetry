
import * as elements from '../elements.js'

var GUAGE_FOREGROUND = "#FFFFFF";

export function AirspeedTape(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function (data) {
		this.data = data;
	}

	this.draw = function () {
		//       location, 		fontSize, leftAlign, bigTicks,   
		elements.drawTape(this.ctx, this.loc, 20, false, 100,
			//  smallTicks, negative, scale, value,           bugValue
			0.5, true, 50, this.data.airspeed, this.data.airspeedBug);

		this.ctx.save();
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.font = 25 + "px Arial"
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		var text = "HSPEED"
		var textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth / 2 - 10, this.loc.y - 20)
		this.ctx.restore();
	}
	return this;
}