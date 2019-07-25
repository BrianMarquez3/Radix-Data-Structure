///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*******************************************RADIX - ANIMATEDLABEL.JS***************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function AnimatedLabel(id, val, center, initialWidth)
{
	this.centering = center;
	this.label = val;
	this.highlighted = false;
	this.objectID = id;
	this.alpha = 1.0;
	this.addedToScene = true;
	this.labelColor = "#000000";
	this.textWidth = 0;
	if (initialWidth != undefined)
	{
		this.textWidth = initialWidth;
	}

        this.leftWidth = -1;
        this.centerWidth = -1;
        this.highlightIndex = -1;
}

AnimatedLabel.prototype = new AnimatedObject();
AnimatedLabel.prototype.constructor = AnimatedLabel;

AnimatedLabel.prototype.alwaysOnTop = true;


AnimatedLabel.prototype.centered = function() // funcion para centrar
{
	return this.centering;
}


AnimatedLabel.prototype.draw = function(ctx) //funcion para dibujar
{
	if (!this.addedToScene)
	{
		return;
	}
	
	ctx.globalAlpha = this.alpha;
	ctx.font = '10px sans-serif';

        var startingXForHighlight = this.x; //a partir de X para resaltar

        if (this.highlightIndex >= this.label.length)
        {
             this.highlightIndex = -1;
        }
        if (this.highlightIndexDirty && this.highlightIndex != -1)
        {
              this.leftWidth = ctx.measureText(this.label.substring(0,this.highlightIndex)).width;
              this.centerWidth = ctx.measureText(this.label.substring(this.highlightIndex, this.highlightIndex+1)).width;
	      this.highlightIndexDirty = false;
        }
	
	if (this.centering)
	{
                if (this.highlightIndex != -1)
                {
		    startingXForHighlight = this.x - this.width / 2;
                    ctx.textAlign = 'left';//izquerda
                    ctx.textBaseline   = 'middle'; //medio
                }
                else
                {
      		    ctx.textAlign = 'center';//centro
                    ctx.textBaseline   = 'middle';//medio
                }
	}
	else
	{
		ctx.textAlign = 'left';//izquierda
		ctx.textBaseline   = 'top'; //parte superior
	}
	if (this.highlighted)
	{
	    ctx.strokeStyle = "#ffaaaa";
	    ctx.fillStyle = "#ff0000";
		ctx.lineWidth = this.highlightDiff;
		ctx.strokeText(this.label, this.x, this.y);		
	}
	ctx.strokeStyle = this.labelColor;
	ctx.fillStyle = this.labelColor;
	ctx.lineWidth = 1;
	strList = this.label.split("\n");
	if (strList.length == 1)
	{
                if (this.highlightIndex == -1)
                {
                    ctx.fillText(this.label, this.x, this.y); // funcion para llenar con texto
                }
                else
                {
                    var leftStr = this.label.substring(0, this.highlightIndex);
                    var highlightStr = this.label.substring(this.highlightIndex, this.highlightIndex + 1)
                    var rightStr = this.label.substring(this.highlightIndex + 1)
                    ctx.fillText(leftStr, startingXForHighlight, this.y)
 	            ctx.strokeStyle = "#FF0000";
	            ctx.fillStyle = "#FF0000";
                    ctx.fillText(highlightStr, startingXForHighlight + this.leftWidth, this.y)


	            ctx.strokeStyle = this.labelColor;
	            ctx.fillStyle = this.labelColor;
                    ctx.fillText(rightStr, startingXForHighlight + this.leftWidth + this.centerWidth, this.y)


                }
	}
	else
	{
		var offset = (this.centering)?  (1.0 - strList.length) / 2.0 : 0;
		for (var i = 0; i < strList.length; i++)
		{
			ctx.fillText(strList[i], this.x, this.y + offset + i * 12);
		}		
	}
	ctx.closePath();// cerrar camino
}

//obtener alineacion izquierda
AnimatedLabel.prototype.getAlignLeftPos = function(otherObject)// funcion Objetos
{
    if (this.centering)
    {
	return [otherObject.left() - this.textWidth / 2, this.y = otherObject.centerY()];
    }
    else
    {
	return [otherObject.left() - this.textWidth, otherObject.centerY() - 5];
    }
}

AnimatedLabel.prototype.alignLeft = function(otherObject)//funcion alinear a la derecha
{
	if (this.centering)
	{
		this.y = otherObject.centerY();
		this.x = otherObject.left() - this.textWidth / 2;
	}
	else
	{
		this.y = otherObject.centerY() - 5;
		this.x = otherObject.left() - this.textWidth;
	}
}

AnimatedLabel.prototype.alignRight = function(otherObject)//funcion alinear a la izquierda
{
	if (this.centering)
	{
		this.y = otherObject.centerY();
		this.x = otherObject.right() + this.textWidth / 2;
	}
	else
	{
		this.y = otherObject.centerY() - 5;
		this.x = otherObject.right();
	}
}
AnimatedLabel.prototype.getAlignRightPos = function(otherObject)//obtener alineacion derecha
{
    if (this.centering)
    {
	return [otherObject.right() + this.textWidth / 2, otherObject.centerY()];
    }
    else
    {
	return [otherObject.right(), otherObject.centerY() - 5];
    }
}


AnimatedLabel.prototype.alignTop = function(otherObject)//Alienar Arriba
{
	if (this.centering)
	{
		this.y = otherObject.top() - 5;
		this.x = otherObject.centerX();
	}
	else
	{
		this.y = otherObject.top() - 10;
		this.x = otherObject.centerX() -this.textWidth / 2;
	}
}


AnimatedLabel.prototype.getAlignTopPos = function(otherObject)//obtener Alineacion Superior
{
	if (this.centering)
	{
		return [otherObject.centerX(), otherObject.top() - 5];
	}
	else
	{
	    return [otherObject.centerX() -this.textWidth / 2, otherObject.top() - 10];
	}
}


AnimatedLabel.prototype.alignBottom = function(otherObject)// Alinear el Boton
{
	if (this.centering)
	{
		this.y = otherObject.bottom() + 5;
		this.x = otherObject.centerX();
	}
	else
	{
		this.y = otherObject.bottom();
		this.x = otherObject.centerX() - this.textWidth / 2;
	}
}


AnimatedLabel.prototype.getAlignBottomPos = function(otherObject) //obtener Alineacion abajo
{
	if (this.centering)
	{
	    return [otherObject.centerX(),  otherObject.bottom() + 5];
	}
	else
	{
	    return [otherObject.centerX() - this.textWidth / 2,  otherObject.bottom()];
	}
}



AnimatedLabel.prototype.getWidth = function()// obtener ancho
{
	return this.textWidth;
}

AnimatedLabel.prototype.getHeight = function()//obtener altura
{
	return 10;  
}


AnimatedLabel.prototype.setHighlight = function(value) // establecer luz alta
{
	this.highlighted = value;
}
		
AnimatedLabel.prototype.createUndoDelete = function() //Crear Deshacer Eliminar
{
	return new UndoDeleteLabel(this.objectID, this.label, this.x, this.y, this.centering, this.labelColor, this.layer, this.highlightIndex);
}
		
		
AnimatedLabel.prototype.centerX = function() //Centro X
{
	if (this.centering)
	{
		return this.x;
	}
	else 
	{
		return this.x + this.textWidth; 
	}
	
}
	   
AnimatedLabel.prototype.centerY = function() //centro Y
{
	if (this.centering)
	{
		return this.y;
	}
	else 
	{
		return this.y + 5;  
	}
   
}
	   
AnimatedLabel.prototype.top = function() //Arriba   
{
	   if (this.centering)
	   {
		   return  this.y - 5; 
	   }
	   else 
	   {
			return this.y;   
	   }
}


AnimatedLabel.prototype.bottom = function() //Boton
{
   if (this.centering)
   {
	   return  this.y + 5; 
   }
   else 
   {
	   return  this.y + 10; 
   }
}
	   
	   
AnimatedLabel.prototype.right = function() // Derecha
{
   if (this.centering)
   {
	   return  this.x + this.textWidth / 2; 
   }
   else
   {
	   return  this.x + this.textWidth; 
   }
}


AnimatedLabel.prototype.left = function() //Izquierda
{
   if (this.centering)
   {
	   return this. x - this.textWidth / 2;
   }
   else
   {
	   return  this.x; 
   }
}


AnimatedLabel.prototype.setHighlightIndex = function(hlIndex)  //establecer Índice de Resaltado
{
    if (this.label.indexOf("\n") == -1 && this.label.length > hlIndex)
    {
         this.highlightIndex = hlIndex;
         this.highlightIndexDirty = true;
    }
    else
    {
         this.highlightIndex = -1;

    }
}


 AnimatedLabel.prototype.getTailPointerAttachPos = function(fromX, fromY, anchorPoint) //obtener el puntero de cola adjuntar
 {			 
	return this.getClosestCardinalPoint(fromX, fromY); 
 }

AnimatedLabel.prototype.getHeadPointerAttachPos = function (fromX, fromY) 
{
	return this.getClosestCardinalPoint(fromX, fromY);			
}

AnimatedLabel.prototype.setText = function(newText, textIndex, initialWidth)
{
	this.label = newText;
	if (initialWidth != undefined)
	{
		this.textWidth = initialWidth;
	}
}



function UndoDeleteLabel(id, lab, x, y, centered, color, l, hli)//Deshacer Eliminar Etiqueta
{
	this.objectID = id;
	this.posX = x;
	this.posY = y;
	this.nodeLabel = lab;
	this.labCentered = centered;
	this.labelColor = color;
	this.layer = l;
        this.highlightIndex = hli;
        this.dirty = true;
}

UndoDeleteLabel.prototype = new UndoBlock();
UndoDeleteLabel.prototype.constructor = UndoDeleteLabel;

UndoDeleteLabel.prototype.undoInitialStep = function(world)//deshacer el paso inicial
{
	world.addLabelObject(this.objectID, this.nodeLabel, this.labCentered);
	world.setNodePosition(this.objectID, this.posX, this.posY);
	world.setForegroundColor(this.objectID, this.labelColor);
	world.setLayer(this.objectID, this.layer);
}

