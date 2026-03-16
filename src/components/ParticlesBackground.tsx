"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 55;
const MAX_DISTANCE = 110;
const MAX_DISTANCE_SQ = MAX_DISTANCE * MAX_DISTANCE;
const COLOR = "0,170,255";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  canvasW: number;
  canvasH: number;

  constructor(w: number, h: number) {
    this.canvasW = w;
    this.canvasH = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.size = Math.random() * 1.6 + 0.4;
  }

  move(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      if (!canvas) return;
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    }

    function connectParticles() {
      if (!ctx) return;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MAX_DISTANCE_SQ) {
            const alpha = 1 - Math.sqrt(distSq) / MAX_DISTANCE;
            ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // cap at 30fps

    function animate(now: number) {
      if (!canvas || !ctx) return;
      animationId = requestAnimationFrame(animate);
      if (now - lastTime < FRAME_INTERVAL) return;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(${COLOR},0.85)`;

      particles.forEach((p) => {
        p.move(canvas!.width, canvas!.height);
        p.draw(ctx!);
      });

      connectParticles();
    }

    resize();
    initParticles();
    animationId = requestAnimationFrame(animate);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        initParticles();
      }, 150);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastTime = 0;
        animationId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-container"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
