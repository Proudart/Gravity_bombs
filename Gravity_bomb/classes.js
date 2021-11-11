// class c_fuzzball {
//     constructor(x, y, diameter) {
//         let options = {
//             restitution: 0.90,
//             friction: 0.005,
//             density: 0.95,
//             frictionAir: 0.005,
//         }
//         this.body = Matter.Bodies.circle(x, y, diameter / 2, options); //matter.js used radius rather than diameter
//         Matter.World.add(world, this.body);

//         this.x = x;
//         this.y = y;
//         this.diameter = diameter;
//     }

//     body() {
//         return this.body;
//     }

//     show() {
//         let pos = this.body.position;
//         let angle = this.body.angle;

//         push(); //p5 translation 
//         translate(pos.x, pos.y);
//         rotate(angle);
//         fill("#708090");
//         ellipseMode(CENTER); //switch centre to be centre rather than left, top
//         circle(0, 0, this.diameter);
//         pop();
//     }
// }

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
    if (this.state)
    if (keyIsDown(LEFT_ARROW)) {
        Matter.Body.setVelocity(this.body, { x: -5, y: 0 });
      } else if (keyIsDown(RIGHT_ARROW)) {
        Matter.Body.setVelocity(this.body, { x: 5, y: 0 });
      }
}
}