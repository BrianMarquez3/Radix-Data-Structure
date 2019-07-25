///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*******************************************RADIX - ANIMATEDLABEL.JS**************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*inicializa las letras*/

function AnimatedObject()
{
	this.init();
}

AnimatedObject.prototype.init  = function()
{
	this.backgroundColor = "#FFFFFF";
	this.foregroundColor = "#000000";
	this.highlighted = false;
	this.objectID = -1;
	this.layer = 0;
	this.addedToScene = true;
	this.label = "";
	this.labelColor = "#000000";
	this.alpha = 1.0;
	this.x = 0;
	this.y = 0;
	this.minHeightDiff = 3;
	this.range = 5;
        this.highlightIndex = -1;
        this.highlightIndexDirty = true;
}

AnimatedObject.prototype.alwaysOnTop = false;
/*color de fondo del circulo*/
AnimatedObject.prototype.setBackgroundColor = function(newColor)//siempre en la cima
{
	this.backgroundColor = newColor;
}

AnimatedObject.prototype.setForegroundColor = function(newColor) //establecer primer plano
{
	this.foregroundColor = newColor;
}

AnimatedObject.prototype.setNull = function() //establecer primer plano
{
	
}

AnimatedObject.prototype.getNull = function()//obtener alta luz
{
	return false;
}

AnimatedObject.prototype.setAlpha = function(newAlpha) // OPTENER ANCHURA
{
	this.alpha = newAlpha;
}

AnimatedObject.prototype.getAlpha = function() // obetener Altura
{
	return this.alpha;
}

AnimatedObject.prototype.setForegroundColor = function(newColor)
{
	this.foregroundColor = newColor;
	this.labelColor = newColor;
}


AnimatedObject.prototype.getHighlight = function()
{
	return this.highlighted;
}

AnimatedObject.prototype.getWidth = function()
{
	
	return 0;
}

AnimatedObject.prototype.getHeight = function()
{

	return 0;
}

AnimatedObject.prototype.setHighlight = function(value)
{
	this.highlighted = value;
}

AnimatedObject.prototype.centerX = function()
{
	return this.x;
}

AnimatedObject.prototype.setWidth = function(newWidth)
{
}



AnimatedObject.prototype.centerY = function()
{
	return this.y;
}


AnimatedObject.prototype.getAlignLeftPos = function(otherObject)//obtener Alineacion a la izquierda
{
    return [otherObject.right()+ this.getWidth() / 2, otherObject.centerY()];
}

AnimatedObject.prototype.getAlignRightPos = function(otherObject) //obtener Alineacion a la derecha
{
	
    return [otherObject.left() - this.getWidth() / 2, otherObject.centerY()];
}

AnimatedObject.prototype.getAlignTopPos = function(otherObject)//obtener Alinear arriba
{

    return [otherObject.centerX(), otherObject.top() - this.getHeight() / 2];
}
AnimatedObject.prototype.getAlignBottomPos = function(otherObject) //obtener Alineacion abajo
{
    return [otherObject.centerX(), otherObject.bottom() + this.getHeight() / 2];
}


AnimatedObject.prototype.alignLeft = function(otherObject)
{

	this.y = otherObject.centerY();
	this.x = otherObject.right() + this.getWidth() / 2;	
}

AnimatedObject.prototype.alignRight = function(otherObject)
{

	this.y = otherObject.centerY();
	this.x = otherObject.left() - this.getWidth() / 2;	
}


AnimatedObject.prototype.alignTop = function(otherObject)
{
	this.x = otherObject.centerX();
	this.y = otherObject.top() - this.getHeight() / 2;	
	
}


AnimatedObject.prototype.alignBottom = function(otherObject)
{
	this.x = otherObject.centerX();
	this.y = otherObject.bottom() + this.getHeight() / 2;		
	
}
	
		
AnimatedObject.prototype.getClosestCardinalPoint = function(fromX, fromY)//obtener el punto cardinal más cercano
{
	var xDelta;
	var yDelta;
	var xPos;
	var yPos;
			
	if (fromX < this.left())
	{
		xDelta = this.left() - fromX;
		xPos = this.left();
 	}
	else if (fromX > this.right())
	{
		xDelta = fromX - this.right();
		xPos = this.right();
    }
	else
	{
		xDelta = 0;
		xPos = this.centerX();
	}
	
	if (fromY < this.top())
	{
		yDelta = this.top() - fromY;
		yPos = this.top();
	}
	else if (fromY > this.bottom())
	{
		yDelta = fromY - this.bottom();
		yPos = this.bottom();
    }
	else
	{
		yDelta = 0;
		yPos = this.centerY();
	}
			
	if (yDelta > xDelta)
	{
		xPos = this.centerX();
	}
	else 
	{
		yPos  = this.centerY();
	}
	
	return [xPos, yPos];
}
		
		
AnimatedObject.prototype.centered = function()//centrar
{
	return false;
}


AnimatedObject.prototype.pulseHighlight = function(frameNum) //pulso luz alta
{			
	if (this.highlighted)
	{
				var frameMod = frameNum / 7.0;
				var delta  = Math.abs((frameMod) % (2 * this.range  - 2) - this.range + 1)
				this.highlightDiff =  delta + this.minHeightDiff;
	}
			
}
		
AnimatedObject.prototype.getTailPointerAttachPos = function(fromX, fromY, anchorPoint) //obtener el puntero de cola adjuntar
{
	return [this.x, this.y];
}
		
		
AnimatedObject.prototype.getHeadPointerAttachPos = function(fromX, fromY) //obtener cabeza puntero adjuntar
{
	return [this.x, this.y];
}
		
		
AnimatedObject.prototype.identifier = function()
{
	return this.objectID;
}

AnimatedObject.prototype.getText = function(index)
{
	return this.label;
}
		
AnimatedObject.prototype.getTextColor = function(textIndex)
{			
	return this.labelColor
}
		
AnimatedObject.prototype.setTextColor = function(color, textIndex)
{
		this.labelColor = color;
}
		
AnimatedObject.prototype.setText = function(newText, textIndex)
{
	this.label = newText;
}

AnimatedObject.prototype.setHighlightIndex = function(hlIndex)
{
   this.highlightIndex = hlIndex;
   this.highlightIndexDirty = true;
}


AnimatedObject.prototype.getHighlightIndex = function()
{
   return this.highlightIndex;
}
