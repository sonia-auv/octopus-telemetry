
import * as elements from '../elements.js'

var GUAGE_FOREGROUND = "#FFFFFF";

export function AltimeterTape(ctx, location, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data)
	{
		this.data = data;
	}

	this.draw = function()
	{
		//                location, 		    fontSize, leftAlign, bigTicks, smallTicks, negative,
		elements.drawTape(this.ctx, this.loc,      20,      true,      10,     1,         true,    
		//  scale, value,         bugValue 
			40,    this.data.altitude, this.data.altitudeBug, true);

		this.ctx.save();
		this.ctx.fillStyle = GUAGE_FOREGROUND;
		this.ctx.font = 25 + "px Arial"
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle"; 
		var text = "DEEP"
		var textWidth = ctx.measureText(text).width;
		this.ctx.fillText(text, this.loc.x + textWidth/2 + 5, this.loc.y-20)
		this.ctx.restore();


	}
	return this;
}