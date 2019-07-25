///////////////////////////////////////////////////////////////////////////////////////////////////////////
/**********************************************RADIX - ALGOTITHM.JS***********************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function addControlToAlgorithmBar(type, name) {
	
	var element = document.createElement("input"); // se crea la Entradas
	
    element.setAttribute("type", type); //tipo
    element.setAttribute("value", name); //valor

	var tableEntry = document.createElement("td"); // espaciadores
	
	tableEntry.appendChild(element); //inicializa
	
    var controlBar = document.getElementById("AlgorithmSpecificControls"); //controles Argoritmo.
	
    controlBar.appendChild(tableEntry); // añadir Hijo
	return element; // retorna elemento
	
}


function Algorithm() //funcion algorith
{
	
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/****************************************RADIX - INICIALIZA EL ARBOL*************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

Algorithm.prototype.init = function(am, w, h) // funcion Inicializacion
{ // importantes para el funcionamiento del programa
	this.animationManager = am; //delara variables

	this.canvasWidth = w; //..
	this.canvasHeight = h; //..
	
	this.actionHistory = []; //..
	this.recordAnimation = true; //..
	this.commands = [] //..
}
	
Algorithm.prototype.implementAction = function(funct, val) // INICIALIZACION
{
	// INicilaicaion de la Animacion
	//
	var nxt = [funct, val];	 		
	this.actionHistory.push(nxt);
	var retVal = funct(val);
	this.animationManager.StartNewAnimation(retVal); // inicializar animacion
	//
}
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/**************************************muestra si es F O V************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

Algorithm.prototype.isAllDigits = function(str)
{
	for (var i = str.length - 1; i >= 0; i--) // se declarta Var i con longitud que sea mejor igual a 0 qu evaya dismuyendo
	{
		if (str.charAt(i) < "0" || str.charAt(i) > "9") //..
		{
			return false;
		}
	}
	return true; 
}
		
function controlKey()
{
/**/
}
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/****************************CONTROL DE LA TECLA ENTRER Y TAMAÑO DE LO CASILLEROS*************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ceptacion de los caracteres en Ingreso y compatibilidad en Navegador

Algorithm.prototype.returnSubmit = function(field, funct, maxsize, intOnly) // volver a enviar
{

	if (maxsize != undefined) // sin campo
	{
	    field.size = maxsize;  //aumentar el espacio
	}
	return function(event)
	{
		//
		var keyASCII = 0;
		if(window.event) // Google Chrome
		{
			keyASCII = event.keyCode
		}
		//
		else if (event.which) //Mozila Firefox
		{
			keyASCII = event.which
		} 
		//
		if (keyASCII == 13 && funct !== null)
		{
			funct();
		}
                else if (keyASCII == 190 || keyASCII == 59 || keyASCII == 173 || keyASCII == 189)
		{ 
			return false;	
		//    
		}
		else if ((maxsize != undefined && field.value.length >= maxsize) ||
				 intOnly && (keyASCII < 48 || keyASCII > 57))
		{
			if (!controlKey(keyASCII))
				return false;
		}
		
	}
	
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*****************************************************CMD**********************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

Algorithm.prototype.cmd = function() // fincion CMD
{
	if (this.recordAnimation)  //registro de animacion
	{
		var command = arguments[0]; /// se le asigna a arguments los comandos
		for(i = 1; i < arguments.length; i++)
		{
			command = command + "<;>" + String(arguments[i]); // muestra mensajes
		}
		this.commands.push(command); // empuja el comando
	}
	
}
