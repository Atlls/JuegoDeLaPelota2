// Objeto genérico de juego
class ObjectGerneric {

	constructor () {
		this.ctx = document.getElementById('canvas').getContext('2d');
		this.posX = 0;
		this.posY = 0;
		this.color = 'orange';
	}

}

// Objeto de juego: BOX
class ObjectBox extends ObjectGerneric {

	constructor (width,height) {

		super();
		this.width = width;
		this.height = height;

	}

}

// Objeto de juego: CAJA JUGABLE
class ObjectSquereBall extends ObjectBox {

	constructor (squere) {

		super(squere,squere);
		this.vectorX = 0;
		this.vectorY = 0;

	}

	moveBall () {

		this.posX += this.vectorX;
		this.posY += this.vectorY;

	}

	setRanVector (vectorDiameter) {

		this.vectorX = getRanNumber(-vectorDiameter,vectorDiameter);
		this.vectorY = getRanNumber(-vectorDiameter,vectorDiameter);

		if(this.vectorX == 0 ^ this.vectorY == 0)
			this.setRanVector(vectorDiameter);

	}

	// Mejorar... Se repite código.
	setProxVector () {

		if (this.posX + this.vectorX > ui.canvas.width || this.posX + this.vectorX < 0)
			this.vectorX *= -1;
		else if (this.posY + this.vectorY > ui.canvas.height || this.posY + this.vectorY < 0)
			this.vectorY *= -1;

	}

	crashing = () => this.posX + this.vectorX > ui.canvas.width || this.posX + this.vectorX < 0 || this.posY + this.vectorY > ui.canvas.height || this.posY + this.vectorY < 0;
}

class ObjectSpecialZone extends ObjectGerneric {

	constructor (xLength,yLength) {
		super()
		this.xLength = xLength;
		this.yLength = yLength;
		this.size = 1;
	}
}