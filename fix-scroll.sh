#!/data/data/com.termux/files/usr/bin/bash
# fix-scroll.sh — patches the 3 scroll bugs and pushes to GitHub.
# Run from the root of your spaceship repo (where package.json is).
set -e

if [ ! -f "src/App.jsx" ]; then
  echo "Run this from the repo root (src/App.jsx not found here)."
  exit 1
fi

python3 - << 'PYEOF'
p1 = "src/components/VesselViewer.jsx"
s = open(p1, encoding="utf-8").read()

old1 = "    controls.enabled = !isMobile;\n    controls.enableDamping = true;\n    controls.dampingFactor = 0.06;\n    controls.enablePan = false;\n"
new1 = "    controls.enabled = !isMobile;\n    controls.enableDamping = true;\n    controls.dampingFactor = 0.06;\n    controls.enablePan = false;\n    controls.enableZoom = false; // fix: default true was capturing wheel/scroll over the full-viewport hero canvas\n"
if old1 not in s:
    raise SystemExit(f"[SKIP] enableZoom anchor not found in {p1} (already patched or file changed)")
s = s.replace(old1, new1, 1)

old2 = "            flightProgressRef.current = self.progress;\n            canvas.style.pointerEvents = self.progress > 0.001 ? 'none' : 'auto';\n"
new2 = (
    "            flightProgressRef.current = self.progress;\n"
    "            const wantsPointerEvents = self.progress > 0.001 ? 'none' : 'auto';\n"
    "            if (canvas.style.pointerEvents !== wantsPointerEvents) {\n"
    "              canvas.style.pointerEvents = wantsPointerEvents; // fix: only write on change, avoid per-scroll-tick style recalc\n"
    "            }\n"
)
if old2 not in s:
    raise SystemExit(f"[SKIP] pointerEvents anchor not found in {p1} (already patched or file changed)")
s = s.replace(old2, new2, 1)

open(p1, "w", encoding="utf-8").write(s)
print(f"patched {p1}")

p2 = "src/App.jsx"
s2 = open(p2, encoding="utf-8").read()

old3 = """    const yOffset = -80;
    // Stop Lenis momentarily then scroll — fixes mobile Lenis blocking native scroll
    if (window.lenis) {
      window.lenis.stop();
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(() => { if (window.lenis) window.lenis.start(); }, 1200);
    } else {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };"""

new3 = """    const yOffset = -80;
    if (window.lenis) {
      // fix: was calling lenis.stop() before scrolling, which adds the
      // "lenis-stopped" class (overflow:hidden) and blocked the very
      // window.scrollTo() call for ~1.2s. Use Lenis's own scrollTo instead.
      window.lenis.scrollTo(el, { offset: yOffset, duration: 1.2 });
    } else {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };"""

if old3 not in s2:
    raise SystemExit(f"[SKIP] scrollToAbout anchor not found in {p2} (already patched or file changed)")
s2 = s2.replace(old3, new3, 1)
open(p2, "w", encoding="utf-8").write(s2)
print(f"patched {p2}")
PYEOF

echo "Patch applied. Diff:"
git --no-pager diff -- src/components/VesselViewer.jsx src/App.jsx

git add src/components/VesselViewer.jsx src/App.jsx
git commit -m "fix: resolve scroll issues (OrbitControls wheel capture, Lenis stop() deadlock, scroll-tick style thrash)"
git push

echo "Done — pushed to remote."
