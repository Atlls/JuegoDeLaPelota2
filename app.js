/* VARIABLES */ 

const ui = new CanvasInterface();
const maxDiameterVec = getProporcionalSize(ui.canvas.height + ui.canvas.width,.5);

// Objetos del canvas
const backgound   = new ObjectBox(ui.canvas.width,ui.canvas.height);
const sqrBall     = new ObjectSquereBall(getProporcionalSize(ui.canvas.height + ui.canvas.width,1),maxDiameterVec);
const specialZone = new ObjectSpecialZone(getProporcionalSize(ui.canvas.width,13),getProporcionalSize(ui.canvas.height,13));
const textOut	  = new ObjectText('Preciona la pantalla, ¡A jugar!', getProporcionalSize(ui.canvas.width,2.5));
var detencionInterval;


/* EVENT'S LISTENERS */

document.addEventListener('DOMContentLoaded', () => {

	// Mostrar inicio de juego...
	ui.drawCenterMsj(textOut);

	textOut.size = getProporcionalSize(ui.canvas.height + ui.canvas.width,3);
	textOut.text = `${sqrBall.rebound}`;

});

document.addEventListener('click', () => {

	if(!ui.gameRunning){
		/* Ejecutar el juego con la bolita */
		detencionInterval = setInterval( render , 10 );
		ui.gameRunning = true;
	}else{
		/* Pausar juego */
		clearInterval(detencionInterval);
		ui.gameRunning = false;
	}
	

});

function render () {

	/* Dibujar los elementos */

	ui.drawBox(backgound);
	ui.drawCenterMsj(textOut);
	ui.drawBall(sqrBall);
	ui.drawSpecialZone(specialZone);



	/* Condicional de choque */ // Se repite código, pero no es muy grave...

	// Choca en Y
	if(sqrBall.posX + sqrBall.vectorX > ui.canvas.width || sqrBall.posX + sqrBall.vectorX < 0) {
		
		sqrBall.vectorX *= -1;

		// Choca en la Zona Especial en Y
		if (sqrBall.posY + sqrBall.vectorY > (ui.canvas.height - specialZone.yLength)/2 && sqrBall.posY + sqrBall.vectorY < (ui.canvas.height - specialZone.yLength)/2 + specialZone.yLength) {

			// Reasignacion aleatorio de vectores
			sqrBall.vectorX = sqrBall.vectorX/Math.abs(sqrBall.vectorX) * getRanNumber(1,maxDiameterVec);
			sqrBall.vectorY = getRanNumber(-maxDiameterVec,maxDiameterVec);

			// Aumento de puntuaje
			sqrBall.rebound++;
			textOut.text = `${sqrBall.rebound}`;
			
		}
		
	// Choca en X
	} else if (sqrBall.posY + sqrBall.vectorY > ui.canvas.height || sqrBall.posY + sqrBall.vectorY < 0) {
		
		sqrBall.vectorY *= -1;

		// Choca en la Zona Especial en X
		if (sqrBall.posX + sqrBall.vectorX > (ui.canvas.width - specialZone.xLength)/2 && sqrBall.posX + sqrBall.vectorX < (ui.canvas.width - specialZone.xLength)/2 + specialZone.xLength) {

			// Reasignacion aleatorio de vectores
			sqrBall.vectorY = sqrBall.vectorY/Math.abs(sqrBall.vectorY) * getRanNumber(1,maxDiameterVec);
			sqrBall.vectorX = getRanNumber(-maxDiameterVec,maxDiameterVec);

			// Aumento de puntuaje
			sqrBall.rebound++;
			textOut.text = `${sqrBall.rebound}`;

		}

	}


	
	/* Mover pelota */

	sqrBall.moveBall();		

}

/* FUNCIONES */

// Retorna un numero aleatorio entre dos parametros
function getRanNumber (min,max) { return Math.floor(Math.random()*((max+1)-min)+min); }

// Retorna el porsentaje de un número
function getProporcionalSize (number,porcentage) { return Math.floor((number) * porcentage/100 * 2); }