
import * as elements from '../elements.js'

var GUAGE_FOREGROUND = "#FFFFFF";
var GUAGE_BACKGROUND = "#191921";

export function BottomLeftPanel(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function (data) {
		this.data = data;
	}

	this.draw = function () {

		this.ctx.save();

		// Draw text
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.font = 20 + "px Arial"
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		var text = "Velocity Y"
		var textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth / 2, this.loc.y - 16)

		// Draw box and number for velocity x
		this.ctx.font = 20 + "px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle"; 
		this.ctx.fillStyle = GUAGE_BACKGROUND;
		this.ctx.strokeStyle = GUAGE_FOREGROUND;
		var boxHeight = 26;
		var boxWidth = 80;
		this.ctx.fillRect(this.loc.x, this.loc.y, boxWidth, boxHeight);
		this.ctx.strokeRect(this.loc.x, this.loc.y, boxWidth, boxHeight);
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.textAlign = "center";
		var value = this.data.velY
		this.ctx.fillText(value , this.loc.x + 40, this.loc.y + 15)


		var text = "Position"
		var textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + 80, this.loc.y + 55)
		this.ctx.strokeStyle = GUAGE_BACKGROUND;
		this.ctx.strokeRect(this.loc.x, this.loc.y + 40, this.loc.width, this.loc.height);

		var offset = 50
		// Draw text
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.font = 20 + "px Arial"
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		var text = "X"
		var textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth/2 + 15, this.loc.y + 45 + offset)

		// Draw box and number for velocity x
		this.ctx.font = 20 + "px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle"; 
		this.ctx.fillStyle = GUAGE_BACKGROUND;
		this.ctx.strokeStyle = GUAGE_FOREGROUND;
		var boxHeight = 26;
		var boxWidth = 80;
		this.ctx.fillRect(this.loc.x + 40, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.strokeRect(this.loc.x + 40, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.textAlign = "center";
		var value = this.data.posX
		this.ctx.fillText(value , this.loc.x + 80, this.loc.y + 45 + offset)

		offset = offset + 40
		// Draw text
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.font = 20 + "px Arial"
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		var text = "Y"
		var textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth/2 + 15, this.loc.y + 45 + offset)

		// Draw box and number for velocity x
		this.ctx.font = 20 + "px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle"; 
		this.ctx.fillStyle = GUAGE_BACKGROUND;
		this.ctx.strokeStyle = GUAGE_FOREGROUND;
		var boxHeight = 26;
		var boxWidth = 80;
		this.ctx.fillRect(this.loc.x + 40, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.strokeRect(this.loc.x + 40, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.textAlign = "center";
		var value = this.data.posY
		this.ctx.fillText(value , this.loc.x + 80, this.loc.y + 45 + offset)

		this.ctx.restore();



	}
	return this;
}