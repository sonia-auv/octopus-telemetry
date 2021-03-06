
import * as elements from '../elements.js'

var GUAGE_FOREGROUND = "#FFFFFF";
var GUAGE_BACKGROUND = "#191921";

export function AltimeterTicker(ctx, location, data)
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
		this.drawAltitimeterDigits(this.data.altitude);
	}

	this.drawAltitimeterDigits = function(altitude)
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

		ctx.moveTo(x, y);
		ctx.lineTo(x + wid - arrowSize, y);
		ctx.lineTo(x + wid, y + hei / 2);
		ctx.lineTo(x + wid - arrowSize, y + hei);
		ctx.lineTo(x, y + hei);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
  	
  		// Data to print
	  	var tensList = []
		var i = 0
	  	for (i = 0; i < 10; i++)
	  	{
	  		tensList[i] = i + "0"
	  	}

	  	var onesList = []
	  	for (i = 0; i < 10; i++)
	  	{
	  		onesList[i] = i + ""
	  	}  

	  	if (altitude < 0)
	  	{
	  		altitude = -altitude;
	  	}

		altitude = Math.round(altitude * 10) / 10

  		var tens = altitude*10-Math.trunc(altitude)*10
  		var hundreds = Math.trunc(altitude)

	  	// Draw tens digit place
  		var loc = {}
  		var boxWidth = (wid - arrowSize)
  		loc.x = x + boxWidth * (3 / 4)
  		loc.y = y
  		loc.height = hei
  		loc.width = boxWidth / 4
  		elements.drawTickerDigit(this.ctx, onesList, tens, 1.0, 0, loc, 42);

  		// Draw hundreds digit place
  		loc.x = x + boxWidth * (2 / 4)
  		elements.drawTickerDigit(this.ctx, onesList, hundreds, 1.0, 0, loc, 42);
/*
  		// Draw thousands digit place
  		loc.x = x + boxWidth * (1 / 4)
  		elements.drawTickerDigit(this.ctx, onesList, thousands, 0.05, 20, loc, 55);

  		// Draw ten thousands digit place
  		loc.x = x
  		onesList[0] = ""
  		elements.drawTickerDigit(this.ctx, onesList, thenThousands, 0.001, 20, loc, 55);*/

		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.moveTo(x+105, y+52);
		this.ctx.lineTo(x+107, y+52);
		this.ctx.closePath();
		this.ctx.stroke();
	}
	return this;
}