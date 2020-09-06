class CanvasInterface {

	constructor () {
		this.canvas = document.getElementById('canvas'); // (Si pones *canvas* funciona igual :O)

		// Ajustar a las proporciones de la pantalla
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.gameOver = false;
		this.gameRunning = false;

		this.time = 0;

	}

	/* Funciones de dibujo */

	// Dibuja una caja en el canvas.
	drawBox (objectBox) {

		objectBox.ctx.fillStyle = objectBox.color;
		objectBox.ctx.fillRect(objectBox.posX, objectBox.posY, objectBox.width, objectBox.height);

	}

	// Dibuja la POLOTA CUADRADA de forma centrada.
	drawBall (objectBall) {

		objectBall.ctx.fillStyle = objectBall.color;
		objectBall.ctx.fillRect(objectBall.posX - objectBall.width/2, objectBall.posY - objectBall.height/2, objectBall.width, objectBall.height);

	}

	// Dibuja la zona especial en sentido antihorario.
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

	// Dibuja un un texto en el centro de la pantalla, por defecto es en el centro.
	drawMsj (objectText) {

		objectText.ctx.font = `${objectText.size}px Consolas`;
		objectText.ctx.textAlign = 'center';
		objectText.ctx.fillStyle = objectText.color;
		objectText.ctx.fillText(objectText.text, objectText.posX, (objectText.posY + objectText.size)/2);

	}

	/* Funciones de juego */

	validateFinish (points,detectionInterval) {

		if (points == 10) {

			// Formalizar tiempo jugado.
			this.time = (new Date().getTime() - this.time)/1000;

			// Detener el renderizado.
			this.gameOver = true;
			clearInterval(detectionInterval);

			// Definir texto de Game Over.
			const textOver = new ObjectText(getProporcionalSize(ui.canvas.width,2.5),`Tiempo tardado: ¡${this.time} Segundos!`);
			textOver.posY += getProporcionalSize(ui.canvas.height,15);

			// Dibujar texto.
			this.drawMsj(textOver);

		}


	}

}