///////////////////////////////////////////////////////////////////////////////////////////////////////////
/************************************************** RADIXTREE.JS***********************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

RadixTree.NODE_WIDTH = 60;
/**************************************Colores del los Circulos*******************************************/
RadixTree.LINK_COLOR = "#000000";
RadixTree.HIGHLIGHT_CIRCLE_COLOR = "#000000"; // color de circulo
RadixTree.FOREGROUND_COLOR = "#000000"//colores
RadixTree.BACKGROUND_COLOR = "#b3b6b7";//colores
RadixTree.PRINT_COLOR = RadixTree.FOREGROUND_COLOR; //  color de imprecion
RadixTree.FALSE_COLOR = "#FFFFFF"// color si es falso
RadixTree.WIDTH_DELTA  = 50;
RadixTree.HEIGHT_DELTA = 80;
RadixTree.STARTING_Y = 80;
RadixTree.LeftMargin = 300;
RadixTree.NEW_NODE_Y = 100

RadixTree.FIRST_PRINT_POS_X  = 50;
RadixTree.PRINT_VERTICAL_GAP  = 20;
RadixTree.PRINT_HORIZONTAL_GAP = 50;
    
/********************************************************************************************************/

function RadixTree(am, w, h)
{
	this.init(am, w, h);//inicializacion de las Variable
}
//
RadixTree.prototype = new Algorithm();
RadixTree.prototype.constructor = RadixTree;//Contructor Radix
RadixTree.superclass = Algorithm.prototype;
//
RadixTree.prototype.init = function(am, w, h)
{
        //Mensaje enviado a la parte Inferior con amimacion
	var sc = RadixTree.superclass;//SUperClsase Radix
	this.startingX =  w / 2;
	this.first_print_pos_y  = h - 2 * RadixTree.PRINT_VERTICAL_GAP;
	this.print_max  = w - 10;

	var fn = sc.init;// inicializacion
	fn.call(this,am);// ingreo de string
	this.addControls();//agregcion de controles
	this.nextIndex = 0;//Indice
	this.commands = [];
	this.cmd("CreateLabel", 0, "", 20, 10, 0);//ESPACIO DE MARGEN DEL GRAFICO
	this.cmd("CreateLabel", 1, "", 20, 10, 0);//ESPACIO DE MARGEN DEL GRAFICO
	this.cmd("CreateLabel", 2, "", 20, 30, 0);//ESPACIO DE MARGEN DEL GRAFICO
	this.nextIndex = 3;
	this.animationManager.StartNewAnimation(this.commands);//Inicilizacion comando de Animcion
	this.animationManager.skipForward(); // animacion  
	this.animationManager.clearHistory(); // animacion  
}


/**********************************************************************************************************/
//INGRESO DE BARISA PALABRAS Y PRTICION DE NODO
RadixTree.prototype.findIndexDifference = function(s1, s2, id, wordIndex) 
{
    var index = 0; //raz vacia

    while  (index < s1.length && index < s2.length)  // hace la sepacion de letras en el nodo
    //nodo raiz si es menor que l longitud S1 y con S2
    
    {
            //
          this.cmd("SetHighlightIndex", 1, index); //comandos cmd , altura del Indice
          this.cmd("SetHighlightIndex", id, index);//comandos cmd, parametro Id
	  this.cmd("Step");//
          this.cmd("SetHighlightIndex", 1, -1);// altura de la Riz parametro 1
          this.cmd("SetHighlightIndex", id, -1);
            //

         if (s1.charAt(index) == s2.charAt(index))
         {
             index++; // va aumentando la Raiz
         }
	 else
         {
               break; // sin accion
         }
    }
    return index; // giro a al Indice
}

/***********************************************BOTONES*************************************************/
RadixTree.prototype.addControls =  function()
{
	this.insertField = addControlToAlgorithmBar("Text", "");
	this.insertField.onkeypress = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), 12,false);
	this.insertButton = addControlToAlgorithmBar("Button", "Insertar");
	this.insertButton.onclick = this.insertCallback.bind(this);
	this.deleteField = addControlToAlgorithmBar("Text", "");
	this.deleteField.onkeydown = this.returnSubmit(this.deleteField,  this.deleteCallback.bind(this), 12);
	this.deleteButton = addControlToAlgorithmBar("Button", "Borrar");
	this.deleteButton.onclick = this.deleteCallback.bind(this);
	this.findField = addControlToAlgorithmBar;
	this.findField.onkeydown = this.returnSubmit(this.findField,  this.findCallback.bind(this), 12);
	this.findButton = addControlToAlgorithmBar;
	this.findButton.onclick = this.findCallback.bind(this);
	this.printButton = addControlToAlgorithmBar("Button", "Mostrar");
	this.printButton.onclick = this.printCallback.bind(this);
}
//

RadixTree.prototype.reset = function() //Funcion Reset
{
	this.nextIndex = 3;
	this.root = null; //m resetea desde la Raiz Null
}

/**************************************INSERCION DE LLAMADA*********************************************/
//Insertar
RadixTree.prototype.insertCallback = function(event)
{
	var insertedValue = this.insertField.value.toUpperCase() //declara variable
        insertedValue = insertedValue.replace(/[^a-z]/gi,''); //insert tipo de variable string

	if (insertedValue != "")
	{
		this.insertField.value = "";
		this.implementAction(this.add.bind(this), insertedValue); //enlaza con la Animacion
	}
}

//Borrar
RadixTree.prototype.deleteCallback = function(event) // borrado de llamada
{
	var deletedValue = this.deleteField.value.toUpperCase(); // a Mayusculas
        deletedValue = deletedValue.replace(/[^a-z]/gi,''); //borrado de la palabra reemplazar
	if (deletedValue != "") //espacio para la letras
	{
		this.deleteField.value = "";
		this.implementAction(this.deleteElement.bind(this),deletedValue);// enlazar		
	}
}

//Mostrar
RadixTree.prototype.printCallback = function(event)
{
	this.implementAction(this.printTree.bind(this),""); // enlazar ña animacion y muestra el Arbol						
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*********************************************** MOSTRAR**************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Nota: This en Rdix : esta determinado 

RadixTree.prototype.printTree = function(unused)//no usado Radx
{

	this.commands = [];//Comando Consola
    
	if (this.root != null)//si el arbol no esta vacio
	{
		this.highlightID = this.nextIndex++; //Id va en Aumento de la Raiz
	        this.printLabel1 = this.nextIndex++; //Etiqueta..
	        this.printLabel2 = this.nextIndex++; //Etiqueta..
		var firstLabel = this.nextIndex++; //..
	        this.cmd("CreateLabel", firstLabel, "Salida: ", RadixTree.FIRST_PRINT_POS_X, this.first_print_pos_y);// crea etique ta en el Arbol en el Lienzo X Y y
		this.cmd("CreateHighlightCircle", this.highlightID, RadixTree.HIGHLIGHT_CIRCLE_COLOR, this.root.x, this.root.y); //cREA CIRCULO de Color 
                this.cmd("SetWidth", this.highlightID, RadixTree.NODE_WIDTH); //Establecer ancho
                this.cmd("CreateLabel", this.printLabel1, "                                                                                Mostrando cadena actual: ", 20, 10, 0);
                // mensaje centrado
	        this.cmd("CreateLabel", this.printLabel2, "", 20, 10, 0);// Espacio en el lienzo
	        this.cmd("AlignRight", this.printLabel2, this.printLabel1);// Alinear a la derecha
		this.xPosOfNextLabel = RadixTree.FIRST_PRINT_POS_X;//
		this.yPosOfNextLabel = this.first_print_pos_y;//
		this.printTreeRec(this.root, "");// Mostrar Arbol

		this.cmd("Delete",  this.highlightID); //Comandos
		this.cmd("Delete",  this.printLabel1); //..
		this.cmd("Delete",  this.printLabel2); //..
		this.cmd("Step")// paso
                
                // mensaje que se muesta , es actualizado contrantemente
		for (var i = firstLabel; i < this.nextIndex; i++)
		{
			this.cmd("Delete", i); //Mensaje de Borrado
		}
		this.nextIndex = this.highlightID; //..
	}
	return this.commands; 

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*********************************************** IMPRIMIR*************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

RadixTree.prototype.printTreeRec = function(tree, stringSoFar) // Funcion Imprimir Arbol, Mostrar arbol
{
        if (tree.wordRemainder != "") 
        {
           //Muestra l Palabras en la parte inferior con Animacion
            stringSoFar = stringSoFar + tree.wordRemainder;
            var nextLabelID = this.nextIndex++;
            this.cmd("CreateLabel", nextLabelID, tree.wordRemainder, tree.x, tree.y, 0);
            this.cmd("MoveToAlignRight", nextLabelID, this.printLabel2);
            this.cmd("Step");
            this.cmd("Delete", nextLabelID);
            this.nextIndex--;
            this.cmd("SetText", this.printLabel2, stringSoFar);
        }  

    if (tree.isword) // el arbol tiene palabras
    {
        var nextLabelID = this.nextIndex++; // declaracion
        // espacio en el lienzo
        this.cmd("CreateLabel", nextLabelID, stringSoFar + "  ", 20, 10, 0); // espacio en el lienzo
        //color del prmer plano
        /**/
        this.cmd("SetForegroundColor", nextLabelID, RadixTree.PRINT_COLOR); 
	this.cmd("AlignRight", nextLabelID, this.printLabel1, RadixTree.PRINT_COLOR); 
        this.cmd("MoveToAlignRight", nextLabelID, nextLabelID - 1);
        /**/
	this.cmd("Step");//paso
        

	this.xPosOfNextLabel +=  RadixTree.PRINT_HORIZONTAL_GAP // declaracion de variable
	if (this.xPosOfNextLabel > this.print_max) // si la posicion es mayor 
	{
		this.xPosOfNextLabel = RadixTree.FIRST_PRINT_POS_X;  // Muestra en Horizontal
		this.yPosOfNextLabel += RadixTree.PRINT_VERTICAL_GAP; //muesta en vertical
	}
	

    }
    for (var i = 0; i < 26; i++) // mientras i ste en 0 y menos 26
    {
	if (tree.children[i] != null) //si el arbol tienes HIjos no esta en NUll
	{
         //se hace el recorrido     
	this.cmd("Move", this.highlightID, tree.children[i].x, tree.children[i].y); //movimiento
	this.cmd("Step"); //paso
	this.printTreeRec(tree.children[i], stringSoFar);// muetra en pantalla las cadenas de letras
	this.cmd("Move", this.highlightID, tree.x, tree.y);//Movimento Y
	this.cmd("SetText", this.printLabel2, stringSoFar);//Conjuto de Letras
	this.cmd("Step");//paso
	    
	}
	
    }
}

RadixTree.prototype.findCallback = function(event)
{

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*********************************************** BUSQUEDA*************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//letra celestre "Parametros"
RadixTree.prototype.findElement = function(findValue) // funcion Encontrar Elemento
{
        this.commands = [];// comando consola
        
	this.cmd("SetText", 0, "Buscando: ");// mensage
	this.cmd("SetText", 1, findValue);// encontrar valor
        this.cmd("AlignRight", 1, 0);//alinear a la derecha
        this.cmd("Step");//paso
        this.highlightID = this.nextIndex++; //Ingremento al ID
	
        //encontrar
	var res = this.doFind(this.root, findValue);//se define Res
        if (res) // Si es Igual  Res
        {
   	    this.cmd("SetText", 0, "String " + findValue + " Se Encontro");
        }
        else
        {
   	    this.cmd("SetText", 0, "String " + findValue + " No se Encontro");
        }
        this.cmd("SetText", 1, ""); // comando consola
        this.cmd("SetText", 2, ""); // comando consola
              
	
	return this.commands; // retorna
}

//encontrar
RadixTree.prototype.doFind = function(tree, value) // valores
{
    if (tree == null)
    {
         this.cmd("SetText", 2, "El Arbol esta Vacio"); //  mwnsge que el arbol est vacio
         this.cmd("step"); // fin de l tare, paso
         return null;// no retorna nada
    }

/***/
   this.cmd("SetHighlight", tree.graphicID , 1); // animacion
   var remain = tree.wordRemainder // se le asigna permanicer
   var indexDifference = this.findIndexDifference(value, remain, tree.graphicID, 0);// encontrr diferencia en l raiz
/***/

    if (indexDifference == remain.length)// si 
    {
            this.cmd("Step");//paso

            if (value.length > indexDifference)// si la longitud es mayor que diferencia del Indice
            { 
                this.cmd("Step");//paso
                this.cmd("SetHighlight", tree.graphicID , 0);// comndo de mostrar el id arbol, animacion
		this.cmd("SetText", 1, value.substring(indexDifference));// envio de texto subcdena

                var index = value.charCodeAt(indexDifference) - "A".charCodeAt(0);// valores string
		var noChild = tree.children[index] == null;


		if (noChild) // si no hay Hijos
                {
                        //mensage en pantalla
 		      this.cmd("SetText", 2, "Nodo '" +value.charAt(indexDifference) +  "'\n No esta el Arbol.");
                      this.cmd("Step");//paso
                      return null;// retorna nada
                 
                }  else { //de lo contrario


		this.cmd("CreateHighlightCircle", this.highlightID, RadixTree.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
                this.cmd("SetWidth", this.highlightID, RadixTree.NODE_WIDTH);//establecer ancho

		this.cmd("Step")// paso
   	        this.cmd("Move", this.highlightID, tree.children[index].x, tree.children[index].y);//ejecto de movimiento al hijo X O Y
		this.cmd("Step")// paso

		this.cmd("Delete",  this.highlightID);// borrado 

                }
	
                return  this.doFind(tree.children[index], value.substring(indexDifference));//retornar las palabra 
            }

            this.cmd("Step"); //paso
            this.cmd("SetText", 2, "")//espacio para mostrar las letras
           
            // comproba si esta en el arbol
            if (tree.isword) // si hay plabras
            {
                this.cmd("SetText", 2, "Node is \"True\", Esta el Arbol")// se encuentra en el arbol
                this.cmd("Step");//paso
                this.cmd("SetText", 2, "")//texto
                this.cmd("SetHighlight", tree.graphicID , 0);
                return tree;

            }
            else // de lo contrario
            {
                this.cmd("SetText", 2, "Node is \"False\", No esta en el Arbol")// no esta el arbol
                this.cmd("Step");//..
                this.cmd("SetText", 2, "")//..
                this.cmd("SetHighlight", tree.graphicID , 0);
                return null;

            }
    }
    else // de lo contrario
    {
          this.cmd("Step");//paso
          this.cmd("SetHighlight", tree.graphicID , 0);// mostrar el Arbol
          this.cmd("SetText", 2, "")// enviar texto
          return null;// no retorna nada

        
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*************************************************BORRAR**************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

RadixTree.prototype.deleteElement = function(deletedValue) // funcon borrado , funcion mas declaracion de una varible palabra
{
	this.commands = []; // inicio de comandos
	this.cmd("SetText", 0, "Borrando: ");// mensage de borrando
	this.cmd("SetText", 1, deletedValue); // variables
        this.cmd("AlignRight", 1, 0); //linaer a l derecha
     
        //la sentencia var por lo general declara varibles
        var node = this.doFind(this.root, deletedValue);

        if (node == null) //  si no es igual a que no existe nada
        {
	    this.cmd("SetText", 2, "No esta en el Arbol");// muestra mensaje
            this.cmd("Step");// paso
	    this.cmd("SetText", 0, "");// envio de mensaje
	    this.cmd("SetText", 1, "");// envio de mensaje
	    this.cmd("SetText", 2, "");// envio de mensaje
        }
        else // de lo contrario
        {
	    node.isword = false;// si es hay palabras
            this.cmd("Step");//paso
	    this.cmd("SetBackgroundColor", node.graphicID, RadixTree.FALSE_COLOR);//se unica en el NOdo falso de color
            this.cmd("Step");//
	    this.cleanupAfterDelete(node)//
	    this.cmd("SetText", 0, "");//mensajes salida
	    this.cmd("SetText", 1, "");//mensajes salida
	    this.cmd("SetText", 2, "");//mensajes salida
        }
	return this.commands;	// retorna 					
}



/**************************************************************************************/
//nodo//
RadixTree.prototype.numChildren = function(tree)// numero de hijos
{
    if (tree == null)// si el arvol es igual a null retorna 0
    {
        return 0;// retorna
    }
    var children = 0 //declara variable
    for (var i = 0; i < 26; i++)// lo que haces es hacer un recorrido con I jasta que sea menor que 26  
    {
        if (tree.children[i] != null)// si es diferente a NUll
        {
            children++; // continua aumento
        }
    }
    return children;// retorna nodos hijo

}


/*************************************************************************************/
//limpiar depsues de borrar//
RadixTree.prototype.cleanupAfterDelete = function(tree) //funcion de limpiar
{
    var children = this.numChildren(tree)// se declara hijos y arbol

    if (children == 0 && !tree.isword)
    //si el arbol es igual a 0 y si el arbol no tiene palabras
    {
   	 this.cmd("SetHighlight" ,tree.graphicID , 1);//mostrar el arbol
         this.cmd("Step");//Comando paso
   	 this.cmd("SetHighlight", tree.graphicID , 0);//mostar el arbol
         if (tree.parent != null) //si es diferernte a null
         {
              var index = 0 //declaramos variable
              while (tree.parent.children[index] != tree) //diferente al arbol
              {
                  index++; // AUMENTO
              }
              this.cmd("Disconnect", tree.parent.graphicID, tree.graphicID);// efecto disconect
       	      this.cmd("Delete", tree.graphicID , 0);// efecto de borrado en cadera
              tree.parent.children[index] = null;//la raiz asigna null
              this.cleanupAfterDelete(tree.parent);// limpiar
         }
         else // de lo contrario
         {
       	      this.cmd("Delete", tree.graphicID , 0);// borrar el nodod raiz
              this.root = null;// raiz null
         }
    }
}


/*********************************************************************************************/
 // redimencionar//

RadixTree.prototype.resizeTree = function()// funcion redimencionar
{
	this.resizeWidths(this.root); //redimencionar 
	if (this.root != null) //  si la raiz es diferente a Null
	{
	        var startingPoint = this.root.width / 2 + 1 + RadixTree.LeftMargin;//pisicion de los nodos en el lienzo
		this.setNewPositions(this.root, startingPoint, RadixTree.STARTING_Y);
		this.animateNewPositions(this.root); // amimacion en posicinanmiento de los nodos
		this.cmd("Step");//paso
	}
	
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/************************************************INSERCION*************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

RadixTree.prototype.add = function(word) //funcion AGREGAR, cadenas
{
	this.commands = new Array();//cadena	
	this.cmd("SetText", 0, "Insertando; ");//enviar mensaje "Insertando"
	this.cmd("SetText", 1, word); // espacio para el mensage
        this.cmd("AlignRight", 1, 0); // alinear a la derecha
        this.cmd("Step");//paso
        this.highlightID = this.nextIndex++;//
        this.root = this.addR(word.toUpperCase(), this.root, RadixTree.LEFT_MARGIN + RadixTree.NODE_WIDTH / 2 + 1, RadixTree.STARTING_Y, 0);// mayusculas en todos los nodos
        this.resizeTree(); // redimensionar
	this.cmd("SetText", 0, "");//mensage
	this.cmd("SetText", 1, "");//mensage
       
        return this.commands; // retorna los comandos
}

//Radix Insercion
RadixTree.prototype.addR = function(s, rt, startX, startY, wordIndex) // funcion agregar  en el Arbol 
{
    if (rt == null)  //si Rt es igual A null
        {
		this.cmd("CreateCircle", this.nextIndex, s, RadixTree.NEW_NODE_X, RadixTree.NEW_NODE_Y); //creae el circulo
		this.cmd("SetForegroundColor", this.nextIndex, RadixTree.FOREGROUND_COLOR);// color
		this.cmd("SetBackgroundColor", this.nextIndex, RadixTree.BACKGROUND_COLOR);//color
                this.cmd("SetWidth", this.nextIndex, RadixTree.NODE_WIDTH);// establece el ancho
		this.cmd("Step");// paso
	        this.cmd("SetText", 2, "" ); // envio de texto
                rt = new RadixNode(s, this.nextIndex, startX, startY)// SE LE ASIGNA A RT nuevo nodo
		this.nextIndex += 1; // va en aumento
                rt.isword = true; //es verdad
               return rt; // retorna Rt
        }

	this.cmd("SetHighlight", rt.graphicID , 1);//efecto de mostrar el arbol
        var indexDifference = this.findIndexDifference(s, rt.wordRemainder, rt.graphicID, wordIndex);
                

        if (indexDifference == rt.wordRemainder.length)//si la la diferencia de Riz es igual a la palagra ancha
        {
       
            this.cmd("Step");// paso

            if (s.length > indexDifference)// si es mayor
            { 
                this.cmd("Step"); //paso
                this.cmd("SetHighlight", rt.graphicID , 0);// establecer resaltado
		this.cmd("SetText", 1, s.substring(indexDifference));// conjuto de texto

                
                var index = s.charCodeAt(indexDifference) - "A".charCodeAt(0); //caracteres de codigo
		var noChild = rt.children[index] == null;//variable de no tener hijos


		if (noChild) // cuando no hay Hijo
                {                
                      this.cmd("Step"); //paso
                 
                }  else { // de lo contrario


		this.cmd("CreateHighlightCircle", this.highlightID, RadixTree.HIGHLIGHT_CIRCLE_COLOR, rt.x, rt.y);// crear luz en el circulo 
                this.cmd("SetWidth", this.highlightID, RadixTree.NODE_WIDTH);// establecer ancho

                this.cmd("Step")//paso`
                

                this.cmd("Move", this.highlightID, rt.children[index].x, rt.children[index].y);//Movimiento a la derecha o izquierda
		this.cmd("Step")//paso

		this.cmd("Delete",  this.highlightID); //borrar luz   
                }
		
		var connect = rt.children[index] == null;// conector, hijos 
                rt.children[index] = this.addR(s.substring(indexDifference), rt.children[index], rt.x, rt.y, wordIndex+indexDifference);//hace referencia Subaccadena
		rt.children[index].parent = rt;//
                if (connect)//si hace referencia a la coneccion
		{
                    //conector
		    this.cmd("Connect", rt.graphicID, rt.children[index].graphicID, RadixTree.FOREGROUND_COLOR, 0, false, s.charAt(indexDifference));
                }
                return rt; //retorna rt
            }
            this.cmd("Step");//paso
            this.cmd("SetText", 2, "")// establecer texto

            this.cmd("SetBackgroundColor", rt.graphicID, RadixTree.BACKGROUND_COLOR);//Establecer color de fondo
            this.cmd("Step");//paso
            this.cmd("SetHighlight", rt.graphicID , 0);//Establecer resaltado

            rt.isword = true;// es verdad
            return rt; //  retorna rt 
        }

        var firstRemainder = rt.wordRemainder.substring(0, indexDifference);//primero
        var secondRemainder = rt.wordRemainder.substring(indexDifference);//Segundo

        //animaciones
        this.cmd("CreateCircle", this.nextIndex, firstRemainder,  RadixTree.NEW_NODE_X, RadixTree.NEW_NODE_Y);
	this.cmd("SetForegroundColor", this.nextIndex, RadixTree.FOREGROUND_COLOR);
 	this.cmd("SetBackgroundColor", this.nextIndex, RadixTree.FALSE_COLOR);
        this.cmd("SetWidth", this.nextIndex, RadixTree.NODE_WIDTH);
        this.cmd("Step")

        var newNode = new RadixNode(firstRemainder, this.nextIndex, 0, 0);//declaracion nuevo nodo
	this.nextIndex += 1;// es le asigna NextIndex

        newNode.wordRemainder = firstRemainder;//
        
        var index = rt.wordRemainder.charCodeAt(indexDifference) - "A".charCodeAt(0);// //caracteres de codigo
        newNode.parent = rt.parent;
        newNode.children[index] = rt;//
        if (rt.parent != null)// si parents es diferente a null
        {
	    /////////////////////////// Desconectado*////////////////////
            this.cmd("Disconnect", rt.parent.graphicID, rt.graphicID);// desconect
   	    this.cmd("Connect", rt.parent.graphicID, newNode.graphicID, RadixTree.FOREGROUND_COLOR, 0, false, newNode.wordRemainder.charAt(0));
            var childIndex = newNode.wordRemainder.charCodeAt(0) - 'A'.charCodeAt(0);// //caracteres de codigo
            rt.parent.children[childIndex] = newNode;//
            rt.parent = newNode;//

        }
        else// de lo contrario
        {
	    this.root = newNode;//se creo un nodo en la Raiz
        }
             /////////////////////////Conectado*/////////////////////////
             // animaciones
        this.cmd("SetHighlight", rt.graphicID, 0);//Establecer resaltado

        rt.parent = newNode;//

	this.cmd("Connect", newNode.graphicID, newNode.children[index].graphicID, RadixTree.FOREGROUND_COLOR, 0, false, rt.wordRemainder.charAt(indexDifference));
        rt.wordRemainder = secondRemainder;//       
         this.cmd("SetText", rt.graphicID, rt.wordRemainder);// establecer texto
        this.cmd("Step");//paso


/*************************************************************************/
        this.resizeTree();// redimencionar


        if (indexDifference == s.length)
        {
            newNode.isword = true;
	    this.cmd("SetBackgroundColor", newNode.graphicID, RadixTree.BACKGROUND_COLOR);
        }
        else
        {
	    this.cmd("SetBackgroundColor", newNode.graphicID, RadixTree.FALSE_COLOR);
            index = s.charCodeAt(indexDifference) - "A".charCodeAt(0)
             this.cmd("SetText", 1, s.substring(indexDifference));

            newNode.children[index] = this.addR(s.substring(indexDifference), null, rt.x, rt.y, indexDifference+wordIndex);
	    newNode.children[index].parent = newNode;
	    this.cmd("Connect", newNode.graphicID, newNode.children[index].graphicID, RadixTree.FOREGROUND_COLOR, 0, false, s.charAt(indexDifference));

        }      
        return newNode;
    }

/*******************************************************************************/
//mantener nueva posicion
RadixTree.prototype.setNewPositions = function(tree, xPosition, yPosition) // funcion sobre las posiciones en el lienzo
{
	if (tree != null) // si es arbol es diferente a Null (NADA)
	{
                tree.x = xPosition;  //se adigna tree.x a xposition
		tree.y = yPosition; // se asigna tree.y a y position
                var newX = xPosition - tree.width / 2;  // se declara la variable NewX que se asigna xposition
                var newY = yPosition + RadixTree.HEIGHT_DELTA; //se declara newY que se asigna Y position
                for (var i = 0; i < 26; i++) //..
                { 
                     if (tree.children[i] != null) // si lo nmodos no estan en Null
                     {
			//se va acomonado en el Lienso las palabras
			this.setNewPositions(tree.children[i], newX + tree.children[i].width / 2, newY);
			newX = newX + tree.children[i].width;
			// se va creando el arbol y acomonado lo doso Hijos
                     }
                }
	}
	
}
/******************************************************************************/
//animacion posiciones
RadixTree.prototype.animateNewPositions = function(tree) // funcion Animacion de Posiciones
{
	if (tree != null) // si el arbol no esta vacio
	{
		this.cmd("Move", tree.graphicID, tree.x, tree.y); 
                for (var i = 0; i < 26; i++) //..
                { 
                    this.animateNewPositions(tree.children[i]) // se llama a la funcion para animar el movimiento
                }
	}
}



/*******************************************FUNCIONALIDADES************************************************/

RadixTree.prototype.resizeWidths = function(tree) // redimencionar
{
	if (tree == null) // si el arbol es igual a Null
	{
		return 0; // no se realiza nada
	}
        var size = 0;// tamaño 0
	for (var i = 0; i < 26; i++)
	{
            //EVITA QUE SE SOBRESCRIBA EN LO NODOS HIJOS
            tree.childWidths[i] = this.resizeWidths(tree.children[i]); // redimencionar el arbol mientras se agrega o elimina
            size += tree.childWidths[i] //tamaño del arbol
        }
        //  ESPACIO DE SEPACION ENTRE LOS NODOS HIJOS
        tree.width = Math.max(size, RadixTree.NODE_WIDTH  + 4)
        return tree.width; //retorna el arbol Ancho
}



/****************************************ACEPTACION DE VALORES*****************************************/

function RadixNode(val, id, initialX, initialY) // Nodos del Trie, val , id espacios en el lienzo
{
	this.wordRemainder = val; // 
	this.x = initialX; //inicializa X
	this.y = initialY; // Inicializa Y
	this.graphicID = id;//muestra el Id Grafico
        this.children = new Array(26); // tamaño de chijos 26
        this.childWidths = new Array(26); // ancho de los Nodos hijos 26
        for (var i = 0; i < 26; i++)//..
	{
            this.children[i] = null; //  se le asigna Null a los hiJOS[i]
            this.childWidths[i] =0; // el acho de los nocos se les asigna 0
	}
        this.width = 0; // se declara Anchura
        this.parent = null; // se asigna Null a los parientes
        this.isword = false;
}

/**************************************DISPONIBILIDAD DE LOS BOTONES************************************/

RadixTree.prototype.disableUI = function(event)
{
	this.insertField.disabled = true;
	this.insertButton.disabled = true;
	this.deleteField.disabled = true;
	this.deleteButton.disabled = true;
	this.findField.disabled = true;
	this.findButton.disabled = true;
	this.printButton.disabled = true;
}

RadixTree.prototype.enableUI = function(event)
{
	this.insertField.disabled = false;
	this.insertButton.disabled = false;
	this.deleteField.disabled = false;
	this.deleteButton.disabled = false;
	this.findField.disabled = false;
	this.findButton.disabled = false;
	this.printButton.disabled = false;
}

/********************************************MOSTRAR ITENS*********************************************/

var currentAlg; //declaramos CurrenteAlgo(presente)

function init() //Inicializacion de Arbol
{
	var animManag = initCanvas(); //animacion lienzo
	currentAlg = new RadixTree(animManag, canvas.width, canvas.height); // inicializacion de Trie
	
}
