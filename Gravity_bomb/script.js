"use strict";
// yo g can you update GitHub for me 
// We dont need to import, this is not node.js 
var vp_width = 1400,
    vp_height = 700; //declare variables to hold the viewport size

//declare global variables to hold the framework objects
var viewport, world, engine, body;

var ground;
var wall1;
var wall2;
var tank1;
var tank2;
var mode = 0;
var bullets = [];

class tankCreate {
    constructor(x, y, width, height, colour,state) {
        let options = {
                restitution: 0.99,
                friction: 1,
                density: 0.99,
                frictionAir: 0.032,
            }
            //create the body
        this.body = Matter.Bodies.rectangle(x, y, width, height, options);
        Matter.World.add(world, this.body); //add to the matter world
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.state = state
    }
// oh fuck

    body() {
        return this.body; //return the created body
    }

    show() {
        let pos = this.body.position; //create an shortcut alias
        let angle = this.body.angle;
        push(); //p5 translation 
        stroke("#000000");
        fill(this.colour);
        rectMode(CENTER); //switch centre to be centre rather than left, top
        translate(pos.x, pos.y);
        rotate(angle);
        rect(0, 0, this.width, this.height);
        pop();
    }

    barrelAim() {
        let pos = this.body.position;
        switch(this.state) {
            case true:push(); translate(pos.x,pos.y-20); let a = atan2(mouseY - pos.y,mouseX - pos.x); rotate(a); rect(0, 0, 60, 20); pop(); break;
            case false: push(); translate(pos.x,pos.y-20); rect(0, 0, 60, 20); pop(); break;
        }
    }

    tankAll() {
        show()
        barrelAim()
        if (this.state) {
        if (keyIsDown(RIGHT_ARROW)){
            Matter.Body.setVelocity(this.body, { x: -5, y: 0 });
            } else if (keyIsDown(RIGHT_ARROW)) {
            Matter.Body.setVelocity(this.body, { x: 5, y: 0 });
          }
        }
    }


  //Check google chat, no point in debugging this   
    mouseClicked() {
        if (tank1['state'] == true) {tank1['state'] = false; } else tank1['state'] = true
        if (tank2['state'] == true) {tank2['state'] = false} else tank2['state'] = true
    }
}

class c_ground {
    constructor(x, y, width, height) {
        let options = {
                isStatic: true,
                restitution: 0.99,
                friction: 0.20,
                density: 0.99,
            }
            //create the body
        this.body = Matter.Bodies.rectangle(x, y, width, height, options);
        Matter.World.add(world, this.body); //add to the matter world

        this.x = x; //store the passed variables in the object
        this.y = y;

        this.width = width;
        this.height = height;
    }

    body() {
        return this.body; //return the created body
    }

    show() {
        let pos = this.body.position; //create an shortcut alias 
        rectMode(CENTER); //switch centre to be centre rather than left, top
        fill("f64005"); //set the fill colour
        rect(pos.x, pos.y, this.width, this.height); //draw the rectangle
    }
}

class bulletCreate {
    constructor(length,height,bulletSpeed) {
        let options = {
            restitution: 0.99,
            friction: 1,
            density: 0.99,
            frictionAir: 0.032,
        }
        //create the body
    this.body = Matter.Bodies.rectangle(x, y, width, height, options);
    Matter.World.add(world, this.body); //add to the matter world

    this.length = length;
    this.height = height;
    this.bulletSpeed = bulletSpeed;
    this.bulletSize = 
    let pos = this.body.position;
    let angle = this.body.angle;
    }

    body(){
        return this.body
    }
    keyPressed() {
        if (keyCode == 32)
          bullets.push(new Bullet(pos.x, pos.y, bulletSize,
            this.body.dir, bulletSpeed));
      }
    
    bullet() {
      if (this.body.length > 0) {
        for (var i = 0; i < bullets.length; i++) {
          bullets[i].render(200, 200, 0);
          if (bullets[i].x < 0 || bullets[i].x > width ||
            bullets[i].y < 0 || bullets[i].y > height)
            bullets.splice(i, 1)
        }
      }
    }
}



function apply_angularvelocity() {
    Matter.Body.setAngularVelocity(tank1.body, Math.PI / get_random(3, 20));
};



function apply_force() {
    Matter.Body.applyForce(crate.body, {
        x: crate.body.position.x,
        y: crate.body.position.y
    }, {
        x: 0.05,
        y: get_random(50, 2000) * -1
    });
};


function get_random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function preload() {
    //p5 defined function
}

function initialiseGame() {
    ground = new c_ground(vp_width / 2, vp_height - 10, vp_width, 20);
    wall1 = new c_ground(vp_width, vp_height / 2, 20, vp_height);
    wall2 = new c_ground(0, vp_height / 2, 20, vp_height);
    tank1 = new tankCreate(get_random(0, (vp_width / 2)), 600, 80, 40, "#708090",false);
    tank2 = new tankCreate(get_random((vp_width / 2), vp_width), 600, 80, 40, "#00ff7f",true);
    var tanks = [tank1,tank2]
    var walls = [ground,wall1,wall2]

}


function setup() { // Menu should go here 
    let mode = 0;
    textSize(21);
    //this p5 defined function runs automatically once the preload function is done
    viewport = createCanvas(vp_width, vp_height); //set the viewport (canvas) size
    viewport.parent("viewport_container"); //move the canvas so it’s inside the target div

    //enable the matter engine
    engine = Matter.Engine.create();
    world = engine.world;
    body = Matter.Body;

    initialiseGame(); //once the matter engine is invoked we can create our objects

    frameRate(60);
}


function paint_background() {
    //access the game object for the world, use this as a background image for the game
    background('#4c738b');
}


function paint_assets() {
    walls
}

function draw() {

    //this p5 defined function runs every refresh cycle
    Matter.Engine.update(engine); //run the matter engine update

    paint_background(); //paint the default background
    paint_assets(); //paint the assets
    if (mode == 0){
        text("Press enter to start", 20, 40);
    }
}

