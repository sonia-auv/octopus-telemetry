
var GUAGE_FOREGROUND = "#FFFFFF";
var GUAGE_BACKGROUND = "#191921";

export function BottomRightPanel(ctx, location, data) {
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
		var text = "Velocity"
		var textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + 80, this.loc.y + 15)
		this.ctx.strokeStyle = GUAGE_BACKGROUND;
		this.ctx.strokeRect(this.loc.x, this.loc.y, this.loc.width, this.loc.height);

		var offset = 12
		text = "Roll"
		textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth/2 + 15, this.loc.y + 45 + offset)

		// Draw box and number for velocity x
		this.ctx.font = 20 + "px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle"; 
		this.ctx.fillStyle = GUAGE_BACKGROUND;
		this.ctx.strokeStyle = GUAGE_FOREGROUND;
		var boxHeight = 26;
		var boxWidth = 80;
		this.ctx.fillRect(this.loc.x + 80, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.strokeRect(this.loc.x + 80, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.textAlign = "center";
		var value = this.data.velRoll
		this.ctx.fillText(value , this.loc.x + 120, this.loc.y + 45 + offset)

		offset = offset + 40
		// Draw text
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.font = 20 + "px Arial"
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		text = "Pitch"
		textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth/2 + 15, this.loc.y + 45 + offset)

		// Draw box and number for velocity x
		this.ctx.font = 20 + "px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle"; 
		this.ctx.fillStyle = GUAGE_BACKGROUND;
		this.ctx.strokeStyle = GUAGE_FOREGROUND;
		boxHeight = 26;
		boxWidth = 80;
		this.ctx.fillRect(this.loc.x + 80, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.strokeRect(this.loc.x + 80, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.textAlign = "center";
		value = this.data.velPitch
		this.ctx.fillText(value , this.loc.x + 120, this.loc.y + 45 + offset)

		offset = offset + 40
		// Draw text
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.font = 20 + "px Arial"
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		text = "Yaw"
		textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth/2 + 15, this.loc.y + 45 + offset)

		// Draw box and number for velocity x
		this.ctx.font = 20 + "px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle"; 
		this.ctx.fillStyle = GUAGE_BACKGROUND;
		this.ctx.strokeStyle = GUAGE_FOREGROUND;
		boxHeight = 26;
		boxWidth = 80;
		this.ctx.fillRect(this.loc.x + 80, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.strokeRect(this.loc.x + 80, this.loc.y + offset + 30, boxWidth, boxHeight);
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.textAlign = "center";
		value = this.data.velYaw
		this.ctx.fillText(value , this.loc.x + 120, this.loc.y + 45 + offset)

		this.ctx.restore();



	}
	return this;
}