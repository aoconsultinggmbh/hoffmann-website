# Webseite Praxis Dr. Hoffmann – Stand 15.09.2026

## Ergebnis
- **ZIP für den Upload:** `Webseite_Dr_Hoffmann_2026-09-15.zip` im Projektordner. Inhalt von `dist/` komplett ins Web-Root (z. B. `/htdocs` bei All-Inkl) entpacken. Läuft auf jedem Apache-Hoster (All-Inkl, IONOS). PHP wird nur für das Kontaktformular gebraucht (`/kontakt/senden.php`).
- **24 indexierbare Seiten**, 404-Seite, sitemap.xml, robots.txt, llms.txt, .htaccess (HTTPS, www→non-www, alte URLs → neue URLs, Caching, Security-Header).
- **12 Videos** eingebettet (lokal gehostet, laden erst auf Klick), 251 Bilddateien in Webgrößen, Schriften lokal, Google Maps als Zwei-Klick-Karte → kein Cookie-Banner nötig.
- Lokale Vorschau: `cd dist && python3 -m http.server 8765` → http://localhost:8765

## Ordner
- `00_material/` – Fotos, Audio, Transkripte aller 12 Videos, Recherche (SEO-Blatt), Schriften, PDFs (Calls, Onboarding, Logo)
- `01_site/` – Quellcode: `build.py` (Jinja2), `data/site.json` (alle Praxisdaten, Nav, Zeiten), `templates/`, `pages/*.html` (ein File pro Seite mit JSON-Kopf), `assets/`, `static/` (.htaccess, llms.txt, PHP)
- `dist/` – gebaute Seite. Ändern → in `01_site` ändern, `python3 build.py --zip` ausführen.

## Seitenstruktur
Start · Praxis & Team · Frauenheilkunde (Übersicht, Vorsorge, Verhütung, Wechseljahre, Beckenboden, Sexualmedizin kurz + Selbsttest) · Geburtshilfe (Übersicht, Schwangerschaftsvorsorge mit Zeitstrahl, Ersttrimester/NIPT, Feindiagnostik) · EMSELLA · Ästhetik (Übersicht, Botulinumtoxin, Hyaluron, EMTONE/EMSCULPT, Kosmetik-Institut) · Häufige Fragen (mit „medizinische Kosmetik vs. Kosmetik“) · Kontakt (Formular) · Impressum · Datenschutz · Gleichstellungshinweis (wie Puchmayr) · Karriere · 404

## Barrierefreiheit
- AO-Barrierefreiheits-Widget (`assets/js/barrierefreiheit.js` + CSS, identisch mit Puchmayr, Farben auf Praxis-CI) auf allen Seiten; Knopf rutscht unter 1140 px über die mobile Terminleiste. Keine eigene Unterseite (Entscheidung Admir 15.09.).
- Alle 12 Videos mit deutschen Untertiteln (WebVTT aus den Whisper-Transkripten, `assets/video/*.vtt`).
- Kosmetik-Kontakt eingetragen: Treatflow-Link, Telefon 0179 2040640, kosmetik@gyn-rangsdorf.de (Kosmetik-Seite, Kontakt, Footer, Impressum, llms.txt).

## Vor Livegang von der Kundin bestätigen lassen (wichtig)
1. **Rechtsträger/Impressum:** Praxis war bis 2025 Teil des KMG-MVZ Süd-Brandenburg. Impressum nennt jetzt „Praxis Dr. med. habil. Janine Hoffmann“ als Einzelpraxis. Stimmt das? Wer ist Vertragspartner des Kosmetik-Instituts (Praxis oder eigenes Gewerbe)? Ggf. Anwalt (Kosmetik in Arztpraxis, § 3 Abs. 2 MBO-Ä).
2. **Zahlen aus Videos:** „6 MFAs“, Praxisübernahme 01.07.2025, Start in Rangsdorf 10/2024.
3. **Barrierefreiheit:** alte Verzeichnisse sagen „nicht rollstuhlgerecht“, aktuelle Seite „barrierefrei“. Ich habe „ebenerdig, barrierefrei“ übernommen.
4. **EMSELLA-Preise** 100 €/Sitzung, 600 € Serie (von der alten Seite übernommen). Protokoll 6×28 Min.
5. **Kosmetikerin „Frau Wetzel“** (Schreibweise aus Video, Vorname unklar). Ausbildung nicht genannt.
6. **Werdegang Dr. Janine Hoffmann** (Klinikstationen, Habilitationsthema) – bewusst nicht erfunden; kann ergänzt werden.
7. **DEGUM-Stufe / Feindiagnostik**: Seite sagt „Feindiagnostik in der Praxis“ ohne Stufenangabe. Falls DEGUM II vorliegt → ergänzen, sonst so lassen.
8. **Testimonial-Video (Ramona)** auf EMSELLA-Seite mit Disclaimer. HWG § 11 Nr. 11: zulässig, wenn nicht irreführend. Einwilligung der Patientin muss vorliegen (Model-Release).
9. **Fotos:** Brillenreflexionen (Retusche Iwan) – verwendete Fotos von ihr: 27, 28, 30, 35, 56, 57, 58, 65–68, 71–73, 86, 87. Nach Retusche einfach Dateien in `00_material/fotos_original` ersetzen und Webgrößen neu erzeugen.
10. **Logo:** aktuell SVG-Nachbau ihres eigenen Entwurfs mit neuer Wortmarke. Austausch = `01_site/assets/img/logo-praxis-dr-hoffmann.svg` + `bildmarke.svg`.
11. **Impressum:** Aufsichtsbehörde/Versicherung von der alten Seite übernommen. USt-Passus prüfen. „Kosmetik-Institut“-Absatz prüfen.
12. **Hoster in Datenschutzerklärung** ist neutral formuliert („Hosting-Anbieter in Deutschland, AV-Vertrag“) – bei All-Inkl passt das; AV-Vertrag abschließen.
13. **Kontaktformular:** Empfänger `janine.hoffmann@gyn-rangsdorf.de`, Absender `noreply@gyn-rangsdorf.de` – Postfach/Domain muss bei Hoster existieren, sonst landet Mail im Spam. Nach Upload einmal testen.
14. **3D/4D-Ultraschall:** Seite erklärt das gesetzliche Verbot von „Babyfernsehen“ seit 2021 (StrlSchV). Der alte WordPress-Entwurf hatte „Faszination Babyfernsehen“ – das wäre rechtlich riskant gewesen.

## Nach Livegang
- Google Unternehmensprofil: Sprechzeiten angleichen (Verzeichnisse zeigen noch Mo bis 18, Di bis 19, Fr bis 12 Uhr), Kategorien, Fotos, Webseite eintragen
- yourbeautybalance.de: 301 auf https://gyn-rangsdorf.de/aesthetik/ statt 302 auf Startseite (SEO-Blatt)
- Google Search Console: sitemap.xml einreichen, alte URLs prüfen
- Doctolib/Jameda-Profile: Leistungen und Zeiten konsistent halten

## Technik-Notizen
- Bilder: `pic(nr, alt, sizes)` im Template → srcset aus `00_material/fotos_web/`
- Neue Seite: Datei in `pages/` anlegen (JSON-Kopf + Jinja-Body), Nav in `site.json` ergänzen, bauen
- Videos: `assets/video/*.mp4` (1280px, H.264), Poster in `assets/img/video/`; Praxisfilm 1080p 27,6 MB
- Design-Tokens oben in `assets/css/main.css` (Farben, Schriften, Radien)
