/* VARIABLES */ 

const ui = new CanvasInterface();

// Objetos del canvas
const backgound   = new ObjectBox(ui.canvas.width,ui.canvas.height);
const sqrBall     = new ObjectSquereBall(getProporcionalSize(ui.canvas.height + ui.canvas.width,1));
const specialZone = new ObjectSpecialZone(getProporcionalSize(ui.canvas.width,15),getProporcionalSize(ui.canvas.height,15));
const textOut	  = new ObjectText(getProporcionalSize(ui.canvas.width,2.5));
var detencionInterval;


/* EVENT'S LISTENERS */

document.addEventListener('DOMContentLoaded', () => {

	// Dibujar inicio del juego...
	textOut.text = '¡Deja que llegue a 10 Rebotes!';
	ui.drawMsj(textOut);
	textOut.text = 'Preciona la pantalla';
	textOut.posY -= getProporcionalSize(ui.canvas.width,5);
	ui.drawMsj(textOut);
	textOut.text = 'Debe chocar en la ZONA AZUL';
	textOut.posY += 2*getProporcionalSize(ui.canvas.width,5);
	ui.drawMsj(textOut);

	// Re-setear el texto.
	textOut.posY = ui.canvas.height;
	textOut.size = getProporcionalSize(ui.canvas.height + ui.canvas.width,3);
	textOut.text = `${sqrBall.rebound}`;

});

document.addEventListener('click', () => {

	if(!ui.gameRunning && !ui.gameOver){

		/* Setear el tiempo de inicio */

		ui.time = new Date().getTime();

		/* Ejecutar el renderizado */

		detencionInterval = setInterval( render , 5 );
		ui.gameRunning = true;

	}

});

function render () {


	/* Dibujar los elementos */

	ui.drawBox(backgound);


	/* Condicional de choque  y de finalizacion de juego*/ // Se repite código, pero no es muy grave...

	// Choca en Y
	if(sqrBall.posX + sqrBall.vectorX > ui.canvas.width || sqrBall.posX + sqrBall.vectorX < 0) {
		
		sqrBall.vectorX *= -1;

		// Choca en la Zona Especial en Y
		if (sqrBall.posY + sqrBall.vectorY > (ui.canvas.height - specialZone.yLength)/2 && sqrBall.posY + sqrBall.vectorY < (ui.canvas.height - specialZone.yLength)/2 + specialZone.yLength) {

			// Reasignacion aleatorio de vectores
			sqrBall.vectorX = sqrBall.vectorX/Math.abs(sqrBall.vectorX) * getRanNumber(1,sqrBall.vectorDiameter);
			sqrBall.vectorY = getRanNumber(-sqrBall.vectorDiameter,sqrBall.vectorDiameter);

			// Aumento de puntuaje
			sqrBall.rebound++;
			textOut.text = `${sqrBall.rebound}`;

			// Verificar si llegó a 10 puntos
			ui.validateFinish(sqrBall.rebound,detencionInterval);
		}
		
	// Choca en X
	} else if (sqrBall.posY + sqrBall.vectorY > ui.canvas.height || sqrBall.posY + sqrBall.vectorY < 0) {
		
		sqrBall.vectorY *= -1;

		// Choca en la Zona Especial en X
		if (sqrBall.posX + sqrBall.vectorX > (ui.canvas.width - specialZone.xLength)/2 && sqrBall.posX + sqrBall.vectorX < (ui.canvas.width - specialZone.xLength)/2 + specialZone.xLength) {

			// Reasignacion aleatorio de vectores
			sqrBall.vectorY = sqrBall.vectorY/Math.abs(sqrBall.vectorY) * getRanNumber(1,sqrBall.vectorDiameter);
			sqrBall.vectorX = getRanNumber(-sqrBall.vectorDiameter,sqrBall.vectorDiameter);

			// Aumento de puntuaje
			sqrBall.rebound++;
			textOut.text = `${sqrBall.rebound}`;

			// Verificar si llegó a 10 puntos
			ui.validateFinish(sqrBall.rebound,detencionInterval);

		}

	}



	/* Dibujar elementos */

	ui.drawMsj(textOut);
	ui.drawBall(sqrBall);
	ui.drawSpecialZone(specialZone);


	
	/* Mover pelota */

	sqrBall.moveBall();		

}

/* FUNCIONES */

// Retorna un numero aleatorio entre dos parametros
function getRanNumber (min,max) { return Math.floor(Math.random()*((max+1)-min)+min); }

// Retorna el porsentaje de un número
function getProporcionalSize (number,porcentage) { return Math.floor((number) * porcentage/100 * 2); }