"use strict";
// yo g can you update GitHub for me 
// We dont need to import, this is not node.js 
var vp_width = 920,
    vp_height = 690; //declare variables to hold the viewport size

//declare global variables to hold the framework objects
var viewport, world, engine, body;

var ground;
var wall1;
var wall2;
var tank1;
var tank2;
var mode = 0;
var bullets = [];
var bullet;
var tanks = [];
var walls = [];
var menuActive;


class tankCreate {
    constructor(x, y, width, height, colour, state) {
        let options = {
                restitution: 0,
                friction: 1,
                density: 0.01,
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
        if (this.state) {
            if (keyIsDown(LEFT_ARROW)) {
                Matter.Body.translate(this.body, { x: -1, y: 0 });
            } else if (keyIsDown(RIGHT_ARROW)) {
                Matter.Body.translate(this.body, { x: 1, y: 0 });
            }
        }

    }

    barrelAim() {
        let pos = this.body.position;
        switch (this.state) {
            case true:
                push();
                translate(pos.x, pos.y - 20);
                let a = atan2(mouseY - pos.y, mouseX - pos.x);
                rotate(a);
                rect(0, 0, 60, 20);
                pop();
                break;
            case false:
                push();
                translate(pos.x, pos.y - 20);
                rect(0, 0, 60, 20);
                pop();
                break;
        }
    }
}

function mouseClicked() {
    console.log("dam")
    for (let i = 0; i != tanks.length; i++) {
        if (tanks[i]['state'] == true) { tanks[i]['state'] = false; } else tanks[i]['state'] = true
        bullet = new bulletCreate(200, 200 - 20, 10, 20);
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
    constructor(x, y, length, height, bulletSpeed) {
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
    }

    body() {
        return this.body
    }

    bullet() {

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
    walls.push(new c_ground(vp_width / 2, vp_height - 10, vp_width, 20));
    walls.push(new c_ground(vp_width, vp_height / 2, 20, vp_height));
    walls.push(new c_ground(0, vp_height / 2, 20, vp_height));
    tanks.push(new tankCreate(get_random(0, (vp_width / 2)), 600, 80, 40, "#708090", false));
    tanks.push(new tankCreate(get_random((vp_width / 2), vp_width), 600, 80, 40, "#00ff7f", true));
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
    for (let i = 0; i != walls.length; i++) {
        walls[i].show()
    }
    tanks[1].barrelAim()
    tanks[1].show()
    tanks[0].barrelAim()
    tanks[0].show()

}

function draw() {

    //this p5 defined function runs every refresh cycle
    Matter.Engine.update(engine); //run the matter engine update

    paint_background(); //paint the default background
    paint_assets(); //paint the assets

}

function start() {
    menuActive = false;
    setup();
}

function resume() {
    menuActive = false;
}