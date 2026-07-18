#!/data/data/com.termux/files/usr/bin/bash
set -e

if [ ! -f "src/App.jsx" ]; then
  echo "Run this from the repo root (src/App.jsx not found here)."
  exit 1
fi

python3 - << 'PYEOF'
p = "src/components/VesselViewer.jsx"
s = open(p, encoding="utf-8").read()

old = """    const homeSec = document.getElementById('home');
    const aboutSec = document.getElementById('about');
    if (homeSec) observer.observe(homeSec);
    if (aboutSec) observer.observe(aboutSec);
"""
new = """    const homeSec = document.getElementById('home');
    const aboutSec = document.getElementById('about');
    if (homeSec) observer.observe(homeSec);
    if (aboutSec) observer.observe(aboutSec);

    // fix: once the ship has finished docking, stop treating #about's
    // (large, long-lived) intersection as a reason to keep the full
    // render loop running — it was churning on the main thread for
    // nearly the entire time users scrolled through About, competing
    // with touch-scroll input processing and making scroll feel stuck.
    const handleDocked = () => { if (aboutSec) observer.unobserve(aboutSec); };
    const handleUndocked = () => { if (aboutSec) observer.observe(aboutSec); };
    window.addEventListener('ship:docked', handleDocked);
    window.addEventListener('ship:undocked', handleUndocked);
"""
if old not in s:
    raise SystemExit("[SKIP] observer anchor not found (already patched or file changed)")
s = s.replace(old, new, 1)

old_cleanup = """    return () => {
      observer.disconnect();
      cancelAnimationFrame(animateId);
"""
new_cleanup = """    return () => {
      observer.disconnect();
      window.removeEventListener('ship:docked', handleDocked);
      window.removeEventListener('ship:undocked', handleUndocked);
      cancelAnimationFrame(animateId);
"""
if old_cleanup not in s:
    raise SystemExit("[SKIP] cleanup anchor not found (already patched or file changed)")
s = s.replace(old_cleanup, new_cleanup, 1)

open(p, "w", encoding="utf-8").write(s)
print(f"patched {p}")
PYEOF

echo "Diff:"
git --no-pager diff -- src/components/VesselViewer.jsx

git add src/components/VesselViewer.jsx
git commit -m "fix: stop 3D render loop once ship docks, freeing main thread during About-section scroll"
git push

echo "Done — pushed to remote."
