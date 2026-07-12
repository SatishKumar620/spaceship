from pathlib import Path

f = Path("src/components/VesselViewer.jsx")
text = f.read_text(encoding="utf-8")

replacements = {
    "renderer.toneMappingExposure = 1.0;":
        "renderer.toneMappingExposure = 1.18;",

    "new THREE.DirectionalLight(0xbadaff, 1.55)":
        "new THREE.DirectionalLight(0x00d9ff, 1.8)",

    "new THREE.DirectionalLight(0xffb84d, 0.85)":
        "new THREE.DirectionalLight(0xff1e3a, 1.25)",

    "rgba(255,180,90,0.28)":
        "rgba(255,30,58,0.35)",

    "rgba(255,150,60,0)":
        "rgba(255,30,58,0)",

    "rgba(255,224,150,0.9)":
        "rgba(255,120,150,0.9)"
}

changed = 0
for old, new in replacements.items():
    if old in text:
        text = text.replace(old, new)
        changed += 1

f.write_text(text, encoding="utf-8")

print(f"Updated {changed} items.")
