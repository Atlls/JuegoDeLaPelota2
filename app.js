/* VARIABLES */

const ui = new CanvasInterface();
const maxDiameterVec = getProporcionalSize(ui.canvas.height + ui.canvas.width,.5);

// Hacer una funcion a parte...
const sizeProporcional = getProporcionalSize(ui.canvas.height + ui.canvas.width,1);

// Objetos del canvas
const backgound   = new ObjectBox(ui.canvas.width,ui.canvas.height);
const sqrBall     = new ObjectSquereBall(sizeProporcional);
const specialZone = new ObjectSpecialZone(getProporcionalSize(ui.canvas.width,10),getProporcionalSize(ui.canvas.height,10));
var detencionInterval;


/* EVENT'S LISTENERS */

document.addEventListener('DOMContentLoaded', launch);
ui.canvas.addEventListener('click', () => ui.gameStop = true );

function launch () {

	/* --- Inicializar --- */

	backgound.color = 'black';

	sqrBall.color = 'orange';
	sqrBall.posX = Math.floor(ui.canvas.width / 2);
	sqrBall.posY = Math.floor(ui.canvas.height / 2);
	sqrBall.setRanVector(maxDiameterVec);

	specialZone.color = 'red';

	console.log(sqrBall);
	console.log(specialZone);

	/* --- Renderizar --- */

	detencionInterval = setInterval( render , 10 );
}

function render () {

	ui.drawBox(backgound);
	ui.drawBall(sqrBall);
	ui.drawSpecialZone(specialZone);


	if(sqrBall.posX + sqrBall.vectorX > ui.canvas.width || sqrBall.posX + sqrBall.vectorX < 0) {
	//	console.log('choca Y');
		sqrBall.vectorX *= -1;
		if (sqrBall.posY + sqrBall.vectorY > (ui.canvas.height - specialZone.yLength)/2 && sqrBall.posY + sqrBall.vectorY < (ui.canvas.height - specialZone.yLength)/2 + specialZone.yLength) {
			console.log('Cambio Aleatorio en X');
			sqrBall.vectorX = sqrBall.vectorX/Math.abs(sqrBall.vectorX) * getRanNumber(1,maxDiameterVec);
			sqrBall.vectorY = getRanNumber(-maxDiameterVec,maxDiameterVec);
		}
		
	} else if (sqrBall.posY + sqrBall.vectorY > ui.canvas.height || sqrBall.posY + sqrBall.vectorY < 0) {
	//	console.log('choca X');
		sqrBall.vectorY *= -1;
		if (sqrBall.posX + sqrBall.vectorX > (ui.canvas.width - specialZone.xLength)/2 && sqrBall.posX + sqrBall.vectorX < (ui.canvas.width - specialZone.xLength)/2 + specialZone.xLength) {
			console.log('Cambio Aleatorio en Y');
			sqrBall.vectorY = sqrBall.vectorY/Math.abs(sqrBall.vectorY) * getRanNumber(1,maxDiameterVec);
			sqrBall.vectorX = getRanNumber(-maxDiameterVec,maxDiameterVec);
		}
	}

	// console.log(sqrBall.vectorX,sqrBall.vectorY);

	sqrBall.moveBall();

	if(ui.gameStop)
		clearInterval(detencionInterval);

}

/* FUNCIONES */

function getRanNumber (min,max) { return Math.floor(Math.random()*((max+1)-min)+min); }

function getProporcionalSize (number,porcentage) { return Math.floor((number) * porcentage/100 * 2); }