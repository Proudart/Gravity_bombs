"use strict";
// yo g can you update GitHub for me 
// We dont need to import, this is not node.js 
var vp_width = 920,
    vp_height = 690; //declare variables to hold the viewport size

//declare global variables to hold the framework objects
var viewport, world, engine, body;
var mode = 0;
var bullet;
var tanks = [];
var walls = [];
var barrelPos;
var shot = false;


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
                Matter.Body.translate(this.body, { x: -2.5, y: 0 });
            } else if (keyIsDown(RIGHT_ARROW)) {
                Matter.Body.translate(this.body, { x: 2.5, y: 0 });
            }
        }

    }

    barrelAim() {
        let pos = this.body.position;
        barrelPos = pos
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
    if (shot == false) {
        for (let i = 0; i != tanks.length; i++) {
            if (tanks[i]['state'] == true) {
                tanks[i]['state'] = false;
                bullet = new bulletCreate(barrelPos.x, barrelPos.y - 20, 20, 20);
                Matter.Body.setVelocity(bullet.body, { x: 15, y: -(mouseY / 100) });
            } else tanks[i]['state'] = true
        }
        shot = true;
    } else shot = true
    if (Matter.Detector.canCollide(bullet, tanks)) {
        console.log("wow")
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
        this.body = Matter.Bodies.rectangle(x, y, width, height, options);
        Matter.World.add(world, this.body); //add to the matter world

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    body() {
        return this.body;
    }

    show() {
        let pos = this.body.position;
        rectMode(CENTER);
        fill("f64005");
        rect(pos.x, pos.y, this.width, this.height);
    }
}

class bulletCreate {
    constructor(x, y, width, height) {
        let options = {
                restitution: 0.90,
                friction: 0.005,
                density: 0.95,
                frictionAir: 0.005,
            }
            //create the body
        this.body = Matter.Bodies.rectangle(x, y, width, height, options);
        Matter.World.add(world, this.body);
        this.x = this.x;
        this.y = this.y;
        this.width = width;
        this.height = height;
        console.log(this.width, this.height)
    }
    body() {
        return this.body
    }
    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push()
        translate(pos.x, pos.y);
        fill('#f45842');
        rotate(angle)
        rect(0, 0, this.width, this.height); //draw the rectangle
        pop()
    }
}



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
    if (typeof bullet != "undefined") {
        bullet.show();
    }

}

function draw() {

    //this p5 defined function runs every refresh cycle
    Matter.Engine.update(engine); //run the matter engine update

    paint_background(); //paint the default background
    paint_assets(); //paint the assets

}