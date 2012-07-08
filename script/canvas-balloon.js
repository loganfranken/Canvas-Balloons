/**
 * @namespace Core namespace
 */ 
var CANVASBALLOON = {};

// Constants
CANVASBALLOON.KAPPA = (4 * (Math.sqrt(2) - 1))/3;
CANVASBALLOON.WIDTH_FACTOR = 0.0333;
CANVASBALLOON.HEIGHT_FACTOR = 0.4;
CANVASBALLOON.TIE_WIDTH_FACTOR = 0.12;
CANVASBALLOON.TIE_HEIGHT_FACTOR = 0.10;
CANVASBALLOON.TIE_CURVE_FACTOR = 0.13;
CANVASBALLOON.GRADIENT_FACTOR = 0.3;
CANVASBALLOON.GRADIENT_CIRCLE_RADIUS = 3;

/**
 * Creates a new Balloon
 * @class	Represents a balloon displayed on a HTML5 canvas
 * @param	{String}	canvasElementID		Unique ID of the canvas element displaying the balloon
 * @param	{Number}	centerX				X-coordinate of the balloon's center
 * @param	{Number}	centerY				Y-coordinate of the balloon's center
 * @param	{Number}	radius				Radius of the balloon
 * @param	{String}	color				String representing the balloon's base color
 */
CANVASBALLOON.Balloon = function(canvasElementID, centerX, centerY, radius, color) {
	var canvas = document.getElementById(canvasElementID);
	
	if(!canvas.getContext)
	{
		return;
	}
	
	this.gfxContext = canvas.getContext('2d');
	this.centerX = centerX;
	this.centerY = centerY;
	this.radius = radius;
	this.baseColor = new Color(color);
	this.darkColor = (new Color(color)).darken(CANVASBALLOON.GRADIENT_FACTOR);
	this.lightColor = (new Color(color)).lighten(CANVASBALLOON.GRADIENT_FACTOR);
}

/**
 * Draws the balloon on the canvas
 */
CANVASBALLOON.Balloon.prototype.draw = function() {

	// Prepare constants
	
	var gfxContext = this.gfxContext;
	var centerX = this.centerX;
	var centerY = this.centerY;
	var radius = this.radius;
	
	var handleLength = CANVASBALLOON.KAPPA * radius;
	
	var widthDiff = (radius * CANVASBALLOON.WIDTH_FACTOR);
	var heightDiff = (radius * CANVASBALLOON.HEIGHT_FACTOR);
	
	var balloonBottomY = centerY + radius + heightDiff;
	
	// Begin balloon path
	
	gfxContext.beginPath();

	// Top Left Curve
	
	var topLeftCurveStartX = centerX - radius;
	var topLeftCurveStartY = centerY;
	
	var topLeftCurveEndX = centerX;
	var topLeftCurveEndY = centerY - radius;
	
	gfxContext.moveTo(topLeftCurveStartX, topLeftCurveStartY);
	gfxContext.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength - widthDiff,
							topLeftCurveEndX - handleLength, topLeftCurveEndY,
							topLeftCurveEndX, topLeftCurveEndY);
							
	// Top Right Curve
	
	var topRightCurveStartX = centerX;
	var topRightCurveStartY = centerY - radius;
	
	var topRightCurveEndX = centerX + radius;
	var topRightCurveEndY = centerY;
	
	gfxContext.bezierCurveTo(topRightCurveStartX + handleLength + widthDiff, topRightCurveStartY,
							topRightCurveEndX, topRightCurveEndY - handleLength,
							topRightCurveEndX, topRightCurveEndY);
										
	// Bottom Right Curve
	
	var bottomRightCurveStartX = centerX + radius;
	var bottomRightCurveStartY = centerY;
	
	var bottomRightCurveEndX = centerX;
	var bottomRightCurveEndY = balloonBottomY;
	
	gfxContext.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
							bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
							bottomRightCurveEndX, bottomRightCurveEndY);							
	
	// Bottom Left Curve
	
	var bottomLeftCurveStartX = centerX;
	var bottomLeftCurveStartY = balloonBottomY;
	
	var bottomLeftCurveEndX = centerX - radius;
	var bottomLeftCurveEndY = centerY;
	
	gfxContext.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
							bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
							bottomLeftCurveEndX, bottomLeftCurveEndY);
	
	// Create balloon gradient
	
	var gradientOffset = (radius/3);
	
	var balloonGradient =
		gfxContext.createRadialGradient(centerX + gradientOffset, centerY - gradientOffset,
										CANVASBALLOON.GRADIENT_CIRCLE_RADIUS,
										centerX, centerY, radius + heightDiff);
	balloonGradient.addColorStop(0, this.lightColor.rgbString());
	balloonGradient.addColorStop(0.7, this.darkColor.rgbString());
	
	gfxContext.fillStyle = balloonGradient;
	gfxContext.fill();
	
	// End balloon path
	
	// Create balloon tie
	
	var halfTieWidth = (radius * CANVASBALLOON.TIE_WIDTH_FACTOR)/2;
	var tieHeight = (radius * CANVASBALLOON.TIE_HEIGHT_FACTOR);
	var tieCurveHeight = (radius * CANVASBALLOON.TIE_CURVE_FACTOR);
	
	gfxContext.beginPath();
	gfxContext.moveTo(centerX - 1, balloonBottomY);
	gfxContext.lineTo(centerX - halfTieWidth, balloonBottomY + tieHeight);
	gfxContext.quadraticCurveTo(centerX, balloonBottomY + tieCurveHeight,
								centerX + halfTieWidth, balloonBottomY + tieHeight);
	gfxContext.lineTo(centerX + 1, balloonBottomY);
	gfxContext.fill();
}

// Launch the Balloon when the DOM is ready
window.addEventListener('load', function () {

	var balloon1 = new CANVASBALLOON.Balloon('canvas', 250, 250, 80, 'rgb(229, 45, 45)');
	balloon1.draw();
	
	var balloon2 = new CANVASBALLOON.Balloon('canvas', 400, 400, 60, 'rgb(45, 137, 229)');
	balloon2.draw();
	
	var balloon3 = new CANVASBALLOON.Balloon('canvas', 120, 340, 50, 'rgb(113, 229, 45)');
	balloon3.draw();
	
	var balloon4 = new CANVASBALLOON.Balloon('canvas', 420, 120, 50, 'rgb(174, 0, 255)');
	balloon4.draw();
	
}, false);