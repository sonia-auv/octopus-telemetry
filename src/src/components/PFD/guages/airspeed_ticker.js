
import * as elements from '../elements.js'

var GUAGE_FOREGROUND = "#FFFFFF";
var GUAGE_BACKGROUND = "#191921";

export function AirspeedTicker(ctx, location, data)
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
		this.drawAirspeedDigits(this.data.airspeed);
	}

	this.drawAirspeedDigits = function(airspeed)
	{
		var x = this.loc.x;
  		var y = this.loc.y;
  		var wid = this.loc.width;
  		var hei = this.loc.height;

  		var arrowSize = 15; 

  		var ctx = this.ctx;
  		ctx.fillStyle = GUAGE_BACKGROUND;
 		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();

		ctx.moveTo(x, y + hei / 2);
		ctx.lineTo(x + arrowSize, y);
		ctx.lineTo(x + arrowSize + wid, y);
		ctx.lineTo(x + arrowSize + wid, y + hei);
		ctx.lineTo(x + arrowSize, y + hei);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
  	
	  	var onesList = []
	  	for (var i = 0; i < 10; i++)
	  	{
	  		onesList[i] = i + ""
	  	}  

	  	if (airspeed < 0)
	  	{
			ctx.fillStyle = GUAGE_FOREGROUND;
			ctx.strokeStyle = GUAGE_FOREGROUND;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(x+25, y+43);
			ctx.lineTo(x+35, y+43);
			ctx.closePath();
			ctx.stroke();
	  		airspeed = -airspeed;
	  	}

		airspeed = airspeed.toFixed(1)

  		var ones = airspeed*10-Math.trunc(airspeed)*10;
  		var tens = Math.trunc(airspeed); 
  		var hundreds = airspeed / 100;

	  	// Draw tens digit place
  		var loc = {}
  		var boxWidth = (wid - arrowSize)
  		loc.x = x + arrowSize + (boxWidth) - 12
  		loc.y = y
  		loc.height = hei
  		loc.width = boxWidth / 3 + 5;
  		elements.drawTickerDigit(this.ctx, onesList, ones, 1.0, 0, loc, 42);

  		// Draw tens digit place
  		loc.x -= (1 / 3 * boxWidth) + 15;
  		elements.drawTickerDigit(this.ctx, onesList, tens, 1.0, 0, loc, 42);

  		// Draw hundreds digit place
  		//onesList[0] = "";
  		//loc.x -= (1 / 3 * boxWidth);
  		//elements.drawTickerDigit(this.ctx, onesList, hundreds, 0.01, 20, loc, 42);

		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+61, y+52);
		ctx.lineTo(x+63, y+52);
		ctx.closePath();
		ctx.stroke();
	}

	return this;
}
