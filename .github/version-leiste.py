#!/usr/bin/env python3
"""Fuegt in der VORSCHAU oben auf jeder Seite eine Leiste ein:
"Sie sehen Version X  ->  Version Y ansehen". Die Leiste kommt nur in die
Vorschau (wird im Ablauf vorschau.yml aufgerufen), nie auf die echte Seite.

Aufruf: python3 version-leiste.py <ordner> "<diese Version>" "<andere Version>" <adresse der anderen Version>
Beispiel: python3 version-leiste.py _vorschau "Version 1" "Version 2" https://hoffmann-v2.vorschau.ao-consult.de
"""
import os, re, sys

ordner, diese, andere, ziel = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4].rstrip('/')

STIL = """<style>
.version-bar{background:#173B36;color:#fff;font-family:"Jost",system-ui,sans-serif;font-size:.95rem;position:relative;z-index:101}
.version-bar .vb-in{max-width:1240px;margin:0 auto;padding:.55rem clamp(1rem,4vw,2.5rem);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.4rem 1.1rem;text-align:center}
.version-bar strong{font-weight:600}
.version-bar a{display:inline-flex;align-items:center;gap:.4em;background:#fff;color:#173B36;font-weight:600;text-decoration:none;padding:.4rem .95rem;border-radius:999px;white-space:nowrap}
.version-bar a:hover{background:#FBEBE4;color:#8F4D36}
</style>"""

def pfad(datei):
    rel = os.path.relpath(datei, ordner).replace(os.sep, '/')
    if rel == '404.html':
        return '/'
    if rel.endswith('index.html'):
        return '/' + rel[:-len('index.html')]
    return '/' + rel

anzahl = 0
for wurzel, _, dateien in os.walk(ordner):
    for name in dateien:
        if not name.endswith('.html'):
            continue
        datei = os.path.join(wurzel, name)
        s = open(datei, encoding='utf-8').read()
        if 'class="version-bar"' in s:
            continue
        leiste = (STIL + '\n<div class="version-bar" role="note"><div class="vb-in">'
                  f'<span>Entwurf zum Vergleich · Sie sehen <strong>{diese}</strong></span>'
                  f'<a href="{ziel}{pfad(datei)}">{andere} ansehen <span aria-hidden="true">&rarr;</span></a>'
                  '</div></div>')
        neu, n = re.subn(r'(<body[^>]*>)', r'\1\n' + leiste.replace('\\', '\\\\'), s, count=1)
        if n:
            open(datei, 'w', encoding='utf-8').write(neu)
            anzahl += 1
print(f'Versions-Leiste in {anzahl} Seiten eingefuegt')
