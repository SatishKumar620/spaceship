from pathlib import Path

files = [
    "src/App.css",
    "src/components/VesselViewer.jsx",
]

replacements = {
    "#6ee7ff": "#00D9FF",
    "#ff9a4d": "#FF1E3A",
    "#7d6bd0": "#8A2BE2",
    "0x6ee7ff": "0x00d9ff",
    "0xff9a4d": "0xff1e3a",
}

for file in files:
    path = Path(file)
    if not path.exists():
        print(f"[SKIP] {file} not found")
        continue

    text = path.read_text(encoding="utf-8")

    original = text
    for old, new in replacements.items():
        text = text.replace(old, new)

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"[UPDATED] {file}")
    else:
        print(f"[NO CHANGE] {file}")

print("Done.")
