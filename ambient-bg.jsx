// Ambient canvas background — sparse drifting field, optional cursor constellation.
// Exposed as window.Ambient; loaded before portfolio-app.jsx.
const { useEffect: useAmbEffect, useRef: useAmbRef } = React;

function Ambient({ mode = "drift" }) {
  const canvasRef = useAmbRef(null);
  const stateRef = useAmbRef({ pts: [], raf: 0, mouse: { x: -9999, y: -9999 }, scroll: 0 });

  useAmbEffect(() => {
    if (mode === "off") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const S = stateRef.current;
    let w = 0, h = 0, dpr = 1;

    const readInk = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        ink: (cs.getPropertyValue("--ink-3") || "#888").trim(),
        accent: (cs.getPropertyValue("--accent") || "#888").trim()
      };
    };
    let colors = readInk();

    const seed = () => {
      // density scales with area but stays modest — texture, not a screensaver
      const count = Math.min(150, Math.round(w * h / 16000));
      S.pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.35 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.09,
        vy: -0.05 - Math.random() * 0.12,
        tw: Math.random() * Math.PI * 2,
        tws: 0.006 + Math.random() * 0.014
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();

    const onMove = (e) => { S.mouse = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { S.mouse = { x: -9999, y: -9999 }; };
    const onScroll = () => { S.scroll = window.scrollY; };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const pts = S.pts;
      const par = S.scroll * 0.02; // gentle parallax drift with page scroll

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.tws;
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;

        const py = p.y - par * p.z;
        const yy = ((py % (h + 12)) + (h + 12)) % (h + 12) - 6;

        // cursor proximity brightens nearby points
        const dx = p.x - S.mouse.x;
        const dy = yy - S.mouse.y;
        const d2 = dx * dx + dy * dy;
        const near = d2 < 26000 ? 1 - d2 / 26000 : 0;

        const tw = 0.45 + Math.sin(p.tw) * 0.3;
        const a = (0.16 + near * 0.5) * tw * p.z;
        ctx.beginPath();
        ctx.arc(p.x, yy, p.z * (near > 0.4 ? 1.5 : 1.05), 0, Math.PI * 2);
        ctx.fillStyle = near > 0.45 ? colors.accent : colors.ink;
        ctx.globalAlpha = Math.max(0, Math.min(0.85, a));
        ctx.fill();
        p._sy = yy;
      }

      if (mode === "constellation" && S.mouse.x > -9000) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i];
          const adx = a.x - S.mouse.x, ady = a._sy - S.mouse.y;
          if (adx * adx + ady * ady > 34000) continue;
          for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j];
            const dx = a.x - b.x, dy = a._sy - b._sy;
            const d2 = dx * dx + dy * dy;
            if (d2 > 12000) continue;
            ctx.globalAlpha = (1 - d2 / 12000) * 0.22;
            ctx.strokeStyle = colors.accent;
            ctx.beginPath();
            ctx.moveTo(a.x, a._sy);
            ctx.lineTo(b.x, b._sy);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      S.raf = requestAnimationFrame(draw);
    };

    const start = () => { if (!S.raf) S.raf = requestAnimationFrame(draw); };
    const stop = () => { cancelAnimationFrame(S.raf); S.raf = 0; };
    const onVis = () => { document.hidden ? stop() : start(); };

    if (reduce) {
      draw();
      stop();
    } else {
      start();
    }

    const themeObs = new MutationObserver(() => { colors = readInk(); });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-style", "style"] });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      themeObs.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mode]);

  if (mode === "off") return null;
  return <canvas ref={canvasRef} className="ambient" aria-hidden="true" />;
}

Object.assign(window, { Ambient });
