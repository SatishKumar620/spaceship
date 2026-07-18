#!/data/data/com.termux/files/usr/bin/bash
set -e

if [ ! -f "src/App.jsx" ]; then
  echo "Run this from the repo root (src/App.jsx not found here)."
  exit 1
fi

python3 - << 'PYEOF'
p = "src/components/VesselViewer.jsx"
s = open(p, encoding="utf-8").read()

old = """        if (flightP > 0.0005) {
          // Mid-flight (or docked): fly the model along an arc toward the
          // live screen position of the About section's dock target.
          if (dockTargetEl) {
            const rect = dockTargetEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            _flightNdc.set((cx / w) * 2 - 1, -(cy / h) * 2 + 1, 0.5).unproject(camera);
            _flightDir.copy(_flightNdc).sub(camera.position).normalize();
            const depth = camera.position.length() || 5;
            _flightDock.copy(camera.position).addScaledVector(_flightDir, depth);
          }
"""
new = """        if (flightP > 0.0005) {
          // Mid-flight: fly the model along an arc toward the live screen
          // position of the About section's dock target.
          // fix: getBoundingClientRect() forces a synchronous layout flush.
          // This used to run every single rAF frame for as long as the ship
          // stayed docked (i.e. indefinitely, the whole time a user is
          // scrolling around the About section+), pinning the main thread
          // and making touch-scroll feel disabled. Only re-measure while
          // actually still transitioning; once docked, the target's screen
          // position is effectively static, so reuse the last value.
          if (dockTargetEl && flightP < 0.999) {
            const rect = dockTargetEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            _flightNdc.set((cx / w) * 2 - 1, -(cy / h) * 2 + 1, 0.5).unproject(camera);
            _flightDir.copy(_flightNdc).sub(camera.position).normalize();
            const depth = camera.position.length() || 5;
            _flightDock.copy(camera.position).addScaledVector(_flightDir, depth);
          }
"""
if old not in s:
    raise SystemExit("[SKIP] flight-rect anchor not found (already patched or file changed)")
s = s.replace(old, new, 1)
open(p, "w", encoding="utf-8").write(s)
print(f"patched {p}")
PYEOF

echo "Diff:"
git --no-pager diff -- src/components/VesselViewer.jsx

git add src/components/VesselViewer.jsx
git commit -m "fix: stop forcing a synchronous layout flush every frame while ship is docked (was pinning main thread, blocking scroll)"
git push

echo "Done — pushed to remote."
