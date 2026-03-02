from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
html_files = [p for p in root.rglob('*.html') if 'node_modules' not in p.parts]
errors = []
for file in html_files:
    text = file.read_text(encoding='utf-8')
    for href in re.findall(r'href="([^"]+)"', text):
        if href.startswith(('http://', 'https://', 'mailto:', 'tel:', '#')):
            continue
        if href.startswith('/'):
            target = root / href.lstrip('/')
        else:
            target = file.parent / href
        if href.endswith('/'):
            target = target / 'index.html'
        if target.is_dir():
            target = target / 'index.html'
        if not target.exists():
            errors.append(f"{file.relative_to(root)} -> missing: {href}")

if errors:
    print('\n'.join(errors))
    raise SystemExit(1)

print(f"Checked {len(html_files)} HTML files: all local href targets exist.")
