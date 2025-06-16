class Player {
    constructor(props){
        this.width = props.width
        this.height = props.height
        this.speed = props.speed
        this.color = props.color
        this.position = {
            x: props.position.x,
            y: props.position.y
        }

        this.image = null;
        if (props.imageSrc) {
        this.image = new Image();
        this.image.src = props.imageSrc;
    }

   
        this.velocity = {
            x: 0,
            y: 0, 
        }

        this.heightJump = 100
        this.gravity = 0.5
    }

    jump(){
       return  this.velocity.y = -Math.sqrt(2 * this.gravity * this.heightJump) 
    }

    moveRight(){
        this.velocity.x = 1 * this.speed
    }

    moveLeft(){
        this.velocity.x = -1 * this.speed
    }
    //kinematic equation pyhsic
    // heightjump = vi*2/ (2 * gravity)
    //vi= sqrt(2*g*h)
    
    update(){
        const ground = canvas.height - this.height
        const rightWall = canvas.width - this.width 
        
        this.velocity.y += this.gravity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y > ground){
            this.position.y = ground
            this.velocity.y = 0
        } 

        if (this === player) { // hanya player yang mantul
        if (this.position.x < 0) this.velocity.x *= -1
        if (this.position.x > rightWall) this.velocity.x *= -1
        }
        
    }
    create() {
    if (this.image) {
        board.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    } else {
        board.fillStyle = this.color;
        board.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // Hanya update posisi kalau belum game over
    if (!gameOver) {
        this.update();
    }
}

    chase(target) {
    // Gerak ke arah horizontal player
    if (target.position.x < this.position.x) {
        this.velocity.x = -this.speed
    } else if (target.position.x > this.position.x) {
        this.velocity.x = this.speed
    } else {
        this.velocity.x = 0
    }

    // (Opsional) Gerak ke arah vertikal juga, kalau mau
    if (target.position.y < this.position.y) {
        this.velocity.y = -this.speed
    } else if (target.position.y > this.position.y) {
          this.velocity.y = this.speed
    }
} 




checkCollision(target) {
    const buffer = 40;
    return (
        this.position.x + buffer < target.position.x + target.width - buffer &&
        this.position.x + this.width - buffer > target.position.x + buffer &&
        this.position.y + buffer < target.position.y + target.height - buffer &&
        this.position.y + this.height - buffer > target.position.y + buffer
    );
}


}