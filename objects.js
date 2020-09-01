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
		this.rebound = 0;

	}

	moveBall () {

		this.posX += this.vectorX;
		this.posY += this.vectorY;

	}

	// Mejorar...
	setRanVector (vectorDiameter) {

		this.vectorX = getRanNumber(-vectorDiameter,vectorDiameter);
		this.vectorY = getRanNumber(-vectorDiameter,vectorDiameter);

		if(this.vectorX == 0 ^ this.vectorY == 0)
			this.setRanVector(vectorDiameter);

	}

}

// Objeto de juego: ZONA DE REBOTE ALEATORIO
class ObjectSpecialZone extends ObjectGerneric {

	constructor (xLength,yLength) {
		super()
		this.xLength = xLength;
		this.yLength = yLength;
		this.size = 4;
	}
}

// Objeto de juego: TEXTO BASICO
class ObjectText extends ObjectGerneric {
	
	constructor (text = 'None', size = 30) {

		super()
		this.text = text;
		this.size = size;
		this.color = 'red';

	}

}