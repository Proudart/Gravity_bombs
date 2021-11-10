"use strict";

var vp_width = 1400,
    vp_height = 700; //declare variables to hold the viewport size

//declare global variables to hold the framework objects
var viewport, world, engine, body;

var ground;
var wall1;
var wall2;
var tank1;
var tank2;
var fuzzball;


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


class tankCreate {
    constructor(x, y, width, height, colour) {
        let options = {
                restitution: 0.99,
                friction: 0.030,
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
    }


    body() {
        return this.body; //return the created body
    }
    show() {
        let pos = this.body.position; //create an shortcut alias 
        console.log(pos.x)
        let angle = this.body.angle;
        push(); //p5 translation 
        stroke("#000000");
        fill(this.colour);
        rectMode(CENTER); //switch centre to be centre rather than left, top
        translate(pos.x, pos.y);
        rotate(angle);
        rect(0, 0, this.width, this.height);
        pop();

        function barrelAim() {
            rect(0, 0, this.width, this.height);
        }
    }
}


class c_fuzzball {
    constructor(x, y, diameter) {
        let options = {
            restitution: 0.90,
            friction: 0.005,
            density: 0.95,
            frictionAir: 0.005,
        }
        this.body = Matter.Bodies.circle(x, y, diameter / 2, options); //matter.js used radius rather than diameter
        Matter.World.add(world, this.body);

        this.x = x;
        this.y = y;
        this.diameter = diameter;
    }

    body() {
        return this.body;
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push(); //p5 translation 
        translate(pos.x, pos.y);
        rotate(angle);
        fill("#708090");
        ellipseMode(CENTER); //switch centre to be centre rather than left, top
        circle(0, 0, this.diameter);
        pop();
    }
}

//test for mouse position

function keyPressed() { 
    switch (keyCode) {
		case UP_ARROW: Matter.Body.setVelocity(fuzzball.body, { x: mouseX/50, y: mouseY/50 }); break;
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
    tank1 = new tankCreate(get_random(0, (vp_width / 2)), 600, 80, 40, "#708090");
    tank2 = new tankCreate(get_random((vp_width / 2), vp_width), 600, 80, 40, "#00ff7f");
    fuzzball = new c_fuzzball(400, 200, 60);
}


function setup() {
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
    ground.show();
    wall1.show();
    wall2.show();
    tank1.show();
    tank2.show();
    fuzzball.show();
}


function draw() {
    //this p5 defined function runs every refresh cycle
    Matter.Engine.update(engine); //run the matter engine update

    paint_background(); //paint the default background
    paint_assets(); //paint the assets
}