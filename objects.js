/* LOS OBJETOS DEL JUEGO, YA ESTÁN INICALIZADOS ACÁ */

// Objeto genérico de juego
class ObjectGerneric {

	constructor () {

		this.ctx = document.getElementById('canvas').getContext('2d');
		this.posX = 0;
		this.posY = 0;
		this.color = '#304ffe';

	}

}

// Objeto de juego: BOX 
class ObjectBox extends ObjectGerneric {

	constructor (width,height) {

		super();
		this.color = '#212121';
		this.width = width;
		this.height = height;

	}

}

// Objeto de juego: PELOTA CUADRADA
class ObjectSquereBall extends ObjectBox {

	constructor (base,vectorDiameter) {
		
		super(base,base);
		this.color = '#dd2c00';
		this.vectorDiameter = vectorDiameter;
		
		// Posicionar a la mitad
		this.posX = Math.floor(ui.canvas.width / 2);
		this.posY = Math.floor(ui.canvas.height / 2);
		this.rebound = 0;

		this.init();

	}

	init () {

		/* Asigar un primer vector aleatoriamente  */

		this.vectorX = getRanNumber(-this.vectorDiameter,this.vectorDiameter);
		this.vectorY = getRanNumber(-this.vectorDiameter,this.vectorDiameter);
		console.log(this.vectorDiameter);

		// Validar que no el vector no sea '(0,0)'
		if(this.vectorX == 0 || this.vectorY == 0)
			this.setRanVector(this.vectorDiameter);

	}

	moveBall () {

		this.posX += this.vectorX;
		this.posY += this.vectorY;

	}

}

// Objeto de juego: ZONA DE REBOTE ALEATORIO
class ObjectSpecialZone extends ObjectGerneric {

	constructor (xLength,yLength) {

		super()
		this.color = '#304ffe';
		this.xLength = xLength;
		this.yLength = yLength;
		this.size = 4;

	}
}

// Objeto de juego: TEXTO BASICO
class ObjectText extends ObjectGerneric {
	
	constructor (text = 'None', size = 30) {

		super()
		this.color = '#304ffe';
		this.text = text;
		this.size = size;

	}

}