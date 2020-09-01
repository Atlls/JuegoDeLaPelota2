class CanvasInterface {

	constructor () {
		this.canvas = document.getElementById('canvas'); // Si pones *canvas* funciona igual :O

		// Ajustar a las proporciones de la pantalla
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.gameStop = false;
	}

	drawBox (objectBox) {

		objectBox.ctx.fillStyle = objectBox.color;
		objectBox.ctx.fillRect(objectBox.posX, objectBox.posY, objectBox.width, objectBox.height);

	}

	drawBall (objectBall) {

		objectBall.ctx.fillStyle = objectBall.color;
		objectBall.ctx.fillRect(objectBall.posX - objectBall.width/2, objectBall.posY - objectBall.height/2, objectBall.width, objectBall.height);

	}

	drawSpecialZone (objectSpecialZone) {

		objectSpecialZone.ctx.fillStyle = objectSpecialZone.color;

		// Arriba.
		objectSpecialZone.ctx.fillRect((ui.canvas.width - objectSpecialZone.xLength)/2, 0, objectSpecialZone.xLength, objectSpecialZone.size);
		// Izquierda.
		objectSpecialZone.ctx.fillRect(0, (ui.canvas.height - objectSpecialZone.yLength)/2, objectSpecialZone.size, objectSpecialZone.yLength);
		// Abajo.
		objectSpecialZone.ctx.fillRect((ui.canvas.width - objectSpecialZone.xLength)/2, ui.canvas.height - objectSpecialZone.size, objectSpecialZone.xLength, objectSpecialZone.size);
		// Derecha.
		objectSpecialZone.ctx.fillRect(ui.canvas.width - objectSpecialZone.size, (ui.canvas.height - objectSpecialZone.yLength)/2 , objectSpecialZone.size, objectSpecialZone.yLength);

	}

}

