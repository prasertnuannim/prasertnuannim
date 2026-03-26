"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkle: number;
  sparkle: number;
  phase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

export default function GalaxySectionBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let time = 0;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const createScene = () => {
      const starCount = Math.max(100, Math.floor((width * height) / 12000));

      stars = Array.from({ length: starCount }, () => ({
        x: random(0, width),
        y: random(0, height),
        r: random(0.45, 2.1),
        alpha: random(0.35, 1),
        twinkle: random(0.004, 0.04),
        sparkle: random(0.4, 1.4),
        phase: random(0, Math.PI * 2),
      }));

      shootingStars = [];
    };

    const drawBackground = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = () => {
      for (const star of stars) {
        const flicker = Math.sin(time * star.twinkle + star.phase + star.x * 0.02 + star.y * 0.015);
        const pulse = Math.sin(time * star.twinkle * 0.9 + star.phase + star.x * 0.012);
        const sparklePulse = Math.sin(time * star.twinkle * 1.8 + star.phase * 1.7);
        const alpha = Math.max(0.14, Math.min(1, star.alpha + flicker * 0.34));
        const glowRadius = star.r * (3.2 + (pulse + 1) * 1.4);

        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
        glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.42})`);
        glow.addColorStop(0.35, `rgba(255,255,255,${alpha * 0.18})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        if (star.r > 1) {
          const outerGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius * 1.8);
          outerGlow.addColorStop(0, `rgba(255,255,255,${alpha * 0.12})`);
          outerGlow.addColorStop(0.5, `rgba(210,220,255,${alpha * 0.05})`);
          outerGlow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = outerGlow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowRadius * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        const sparkleStrength = Math.max(0, sparklePulse) * star.sparkle;
        if (star.r > 0.9 && alpha > 0.45) {
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(alpha * 0.2 + sparkleStrength * 0.12, 0.45)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x - star.r * (3.5 + sparkleStrength * 2.5), star.y);
          ctx.lineTo(star.x + star.r * (3.5 + sparkleStrength * 2.5), star.y);
          ctx.moveTo(star.x, star.y - star.r * (3.5 + sparkleStrength * 2.5));
          ctx.lineTo(star.x, star.y + star.r * (3.5 + sparkleStrength * 2.5));
          ctx.stroke();
        }

        if (star.r > 1.3 && sparkleStrength > 0.25) {
          ctx.strokeStyle = `rgba(220,230,255,${Math.min(0.28, alpha * 0.16 + sparkleStrength * 0.08)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x - star.r * (2.4 + sparkleStrength * 1.4), star.y - star.r * (2.4 + sparkleStrength * 1.4));
          ctx.lineTo(star.x + star.r * (2.4 + sparkleStrength * 1.4), star.y + star.r * (2.4 + sparkleStrength * 1.4));
          ctx.moveTo(star.x + star.r * (2.4 + sparkleStrength * 1.4), star.y - star.r * (2.4 + sparkleStrength * 1.4));
          ctx.lineTo(star.x - star.r * (2.4 + sparkleStrength * 1.4), star.y + star.r * (2.4 + sparkleStrength * 1.4));
          ctx.stroke();
        }
      }
    };

    const spawnShootingStar = () => {
      if (Math.random() > 0.02) return;

      shootingStars.push({
        x: random(-80, width * 0.7),
        y: random(-20, height * 0.35),
        vx: random(6, 11),
        vy: random(3, 6),
        life: 0,
        maxLife: random(35, 60),
        size: random(1, 2),
      });
    };

    const drawShootingStars = () => {
      shootingStars = shootingStars.filter((shootingStar) => shootingStar.life < shootingStar.maxLife);

      for (const shootingStar of shootingStars) {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life += 1;

        const opacity = 1 - shootingStar.life / shootingStar.maxLife;
        const tailX = shootingStar.x - shootingStar.vx * 8;
        const tailY = shootingStar.y - shootingStar.vy * 8;

        const trail = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
        trail.addColorStop(0, `rgba(255,255,255,${opacity})`);
        trail.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = trail;
        ctx.lineWidth = shootingStar.size;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    };

    const drawFrame = () => {
      drawBackground();
      drawStars();
      drawShootingStars();
    };

    const stopAnimation = () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = null;
        return;
      }

      time += 1;
      drawBackground();
      drawStars();
      spawnShootingStar();
      drawShootingStars();
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationRef.current === null) {
        animationRef.current = window.requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createScene();
      drawFrame();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry?.isIntersecting ?? false;

        if (isVisibleRef.current) {
          resize();
          startAnimation();
          return;
        }

        stopAnimation();
      },
      { rootMargin: "240px 0px" },
    );
    visibilityObserver.observe(container);

    resize();

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      stopAnimation();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
