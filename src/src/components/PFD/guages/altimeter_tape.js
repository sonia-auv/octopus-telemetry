
import * as elements from '../elements.js'

var GUAGE_FOREGROUND = "#FFFFFF";
var GUAGE_BACKGROUND = "#191921";

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
		//       location, 		fontSize, leftAlign, bigTicks, smallTicks, negative,
		elements.drawTape(this.ctx, this.loc,      20,      true,      1000,     100,         true,    
		//  scale, value,         bugValue 
			40,    this.data.altitude, this.data.altitudeBug);
	}
	return this;
}