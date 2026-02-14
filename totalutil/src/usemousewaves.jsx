import { useEffect } from "react";

export default function MouseRipples() {
  useEffect(() => {
    // Create container once
    let container = document.getElementById("mouse-ripples");
    if (!container) {
      container = document.createElement("div");
      container.id = "mouse-ripples";
      document.body.appendChild(container);
    }

    let last = { x: 0, y: 0, t: 0 };

    const spawn = (x, y) => {
      const el = document.createElement("span");
      el.className = "mouse-ripple";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      container.appendChild(el);

      // Remove after animation
      window.setTimeout(() => el.remove(), 750);
    };

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Throttle + distance gate (prevents too many ripples)
      const now = performance.now();
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);

      if (now - last.t < 25) return;     // throttle ~40fps max
      if (dist < 10) return;             // only if moved enough

      last = { x, y, t: now };
      spawn(x, y);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      // Optional cleanup: container.remove();
    };
  }, []);

  return null;
}
