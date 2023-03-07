import React, { useRef, useEffect } from "react";
import p5 from "p5";

function Sketch() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let letters = [];
      let numLetters = 26;

      class Letter {
        constructor(x, y, letter) {
          this.x = x;
          this.y = y;
          this.letter = letter;
          this.vx = p.random(-1, 1);
          this.vy = p.random(-1, 1);
          this.size = p.random(20, 40);
        }

        display() {
          p.textSize(this.size);
          p.textFont("Lora");
          p.text(this.letter, this.x, this.y);
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > p.width) {
            this.vx *= -1;
          }
          if (this.y < 0 || this.y > p.height) {
            this.vy *= -1;
          }
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(canvasRef.current);

        p.textAlign(p.CENTER, p.CENTER);
        p.fill(255);
        p.stroke(255);

        for (let i = 0; i < numLetters; i++) {
          let x = p.random(p.width);
          let y = p.random(p.height);
          let letter = String.fromCharCode(65 + i);
          letters[i] = new Letter(x, y, letter);
        }
      };

      p.draw = () => {
        p.background(0);

        for (let i = 0; i < numLetters; i++) {
          letters[i].display();
          letters[i].update();
        }
      };
    };

    new p5(sketch);
  }, []);

  return <div ref={canvasRef}></div>;
}

export default Sketch;
