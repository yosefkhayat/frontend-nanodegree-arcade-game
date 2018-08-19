// Enemies our player must avoid

var rowImagesStart = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
];
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed ;
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed);
	if(this.x > 5) {
		this.x = 0;
    }
    if(this.y==player.y && (this.x>=player.x-0.8 && this.x<player.x+1))  {
        allEnemies.pop();
        player.lifes--;
        player.reset();
        player.level--;
        if (player.lifes==0) {
            player.restartGame();
        } 
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), (this.x * 101), (this.y * 83 - 20));
};

//player class
var Player =function(sprite) {
    this.lifes = 3;
    this.level = 1;
    this.reset();
    this.state='start';
    this.sprite =sprite;
};
//start the game
Player.prototype.start =function(sprite) {
    this.sprite=rowImagesStart[this.x];
    this.reset();
}
//restart the game
Player.prototype.restartGame = function(){
    this.sprite='images/Selector.png';
    this.state='start';
    this.lifes=3;
    this.level=1;
    allEnemies=Array(player.level).fill().map((v,i)=> new Enemy(0,Math.floor(Math.random() * 3)+1,1+player.level*0.1));
}
//remnder the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);
    if (this.state=='game'){
        ctx.fillStyle = "black";
        ctx.fillText('level: '+this.level, 40, 40);
        for (i=this.lifes;i>0;i--) ctx.drawImage(Resources.get('images/Heart.png'),4*101+26*i,0,25,25);
    }
        
};
//reset position 
Player.prototype.reset = function(){
    this.x= 2;
    this.y= 5;
}

//level up
Player.prototype.levelUp = function(){
    this.y=5;
    this.level++;
    allEnemies.push(new Enemy(Math.floor(Math.random() * 5),Math.floor(Math.random() * 3)+1,1+player.level*0.1));
}
//handelInput
Player.prototype.handleInput = function(input) {
	switch(input) {
        case 'up':
        case 'w':
            if (this.state =='start') break;
            this.y-=1;
            if (this.y<1) {
                this.levelUp();
            }
			break;
        case 'down':
        case 's':
            if (this.state =='start') break;
            if (this.y<5)
			    this.y+=1;
			break;
        case 'left':
        case 'd':
            if (this.x>0)
			    this.x-=1;
			break;
        case 'right':
        case 'a':
            if (this.x<4)
			    this.x+=1;
            break;
        case 'enter':
            if(this.state=='game') break;
            this.start();
            this.state='game';
		default:
			break;
	}  
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player('images/Selector.png');
allEnemies = Array(player.level).fill().map((v,i)=> new Enemy(0,Math.floor(Math.random() * 3)+1,1+player.level*0.1));
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'w',
        65: 'a',
        83: 's',
        68: 'd',
        13: 'enter'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
