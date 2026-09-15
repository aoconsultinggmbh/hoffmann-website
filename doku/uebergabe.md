# Anleitung für einen neuen Chat: Webseite Dr. Hoffmann veröffentlichen und SEO/GEO abschließen

Diesen Text komplett in einen neuen Chat (Cowork in der Desktop-App mit „Link to this computer“) kopieren.

---

Nutze den Skill **webseite-veroeffentlichen** und halte dich an dessen Regeln. Kunde: Praxis Dr. med. habil. Janine Hoffmann, Frauenarztpraxis in Rangsdorf. Ziel-Domain später: gyn-rangsdorf.de.

## Was schon fertig ist (nichts neu bauen)
- Das GitHub-Projekt liegt fertig vorbereitet auf dem Mac unter `~/hoffmann-repo`: Ordner `website/` mit der kompletten Seite (24 Seiten, Videos, Barrierefreiheits-Widget), `doku/` mit Stand, Freigabeliste und SEO-Checkliste, `.github/workflows/` mit `vorschau.yml` und `livegang.yml`, `README.md`. Es gibt bereits einen ersten Commit auf dem Zweig `main`.
- Der Quellcode der Seite liegt unter `~/Desktop/Admir Assistenz/Webseite_Dr_Hoffmann/01_site/`. Änderungen an Texten dort machen (`pages/*.html`, Praxisdaten in `data/site.json`), dann `python3 build.py` ausführen und den Inhalt von `dist/` nach `~/hoffmann-repo/website/` kopieren. Nie direkt in `website/` editieren.
- Die Seite ist SEO- und GEO-optimiert (Titles, Metas, strukturierte Daten, Sitemap, llms.txt). Die Vorschau sperrt Suchmaschinen automatisch aus.

## Aufgabe 1: Vorschau veröffentlichen
1. Prüfe `~/hoffmann-repo/website/` kurz: Anzahl HTML-Seiten, Bilder, Videos, keine externen Verbindungen außer Doctolib, Treatflow und Google Maps (nur nach Klick). Nichts ändern, nur melden.
2. Bitte Admir in dieser Reihenfolge um die Klicks:
   - github.com → **+** → **New repository** → Owner **aoconsultinggmbh** (nicht das eigene Konto) → Name `hoffmann-website` → **Public** → Create repository
   - Settings → **Pages** → Source auf **GitHub Actions**
   - auf derselben Seite Custom domain `hoffmann.vorschau.ao-consult.de` → Save
3. Frage Admir nach seinem persönlichen GitHub-Schlüssel (Personal Access Token). Nur im Arbeitsspeicher verwenden, nie in eine Datei oder einen Commit schreiben:
   ```
   cd ~/hoffmann-repo
   git remote add origin https://github.com/aoconsultinggmbh/hoffmann-website.git
   git -c credential.helper='!f() { echo "username=x-access-token"; echo "password=$GH_TOKEN"; }; f' push -u origin main
   ```
4. Prüfe unter github.com/aoconsultinggmbh/hoffmann-website → Actions, ob „Vorschau (GitHub Pages)“ grün ist. Falls der Ablauf scheitert, weil Pages noch auf „Deploy from a branch“ stand: eine echte Datei in `website/` ändern (z. B. Leerzeile in `website/llms.txt`) und erneut hochladen.
5. Öffne https://hoffmann.vorschau.ao-consult.de mit Claude in Chrome und prüfe: Seite lädt, Bilder da, `noindex` gesetzt, Handybreite 390 px ohne Umbrüche, Barrierefreiheits-Knopf sitzt über der Terminleiste. Dann Admir den Vorschau-Link schicken.

Hinweis: Das Kontaktformular (`kontakt/senden.php`) funktioniert in der Vorschau nicht, weil GitHub Pages kein PHP kann. Das ist erwartet und wird erst beim Hoster aktiv.

## Aufgabe 2: SEO/GEO an der Vorschau prüfen
Arbeite `doku/seo-geo-checkliste.md`, Abschnitt 4, ab: Rich Results Test für Start, EMSELLA und Häufige Fragen; PageSpeed Insights für Start und EMSELLA (Mobil und Desktop). Fehler nicht selbst „wegdiskutieren“, sondern konkret melden: Seite, Fehlertext, Vorschlag. Kleine Korrekturen an strukturierten Daten oder Ladezeit dürfen im Quellcode unter `01_site/` gemacht werden, danach neu bauen, nach `website/` kopieren, hochladen.

## Aufgabe 3: Freigabe vorbereiten, nichts erfinden
- In `doku/stand-und-freigabeliste.md` stehen 14 Punkte, die nur die Kundin klären kann (Rechtsträger im Impressum, Vertragspartner Kosmetik-Institut, Preise, Fotos nach Retusche, Logo, Werdegang). Stelle daraus eine kurze Liste für Admir zusammen, die er der Kundin schicken kann. Formuliere so, dass die Kundin sieht: Abläufe sind nach Standard beschrieben, sie streicht, was bei ihr anders ist.
- Wenn die Kundin Änderungen schickt (Screenshot, Sprachnachricht, Zuruf): im Quellcode unter `01_site/pages/` mit grep suchen, ändern, bauen, hochladen, Screenshot zurück. Namen, Titel oder Fakten nie ergänzen, wenn sie nicht von der Kundin kommen; die Stelle lieber sichtbar leer lassen und nachfragen.

## Aufgabe 4: Livegang erst nach Freigabe
Ablauf C aus dem Skill. Vorher aus `README.md` den Abschnitt „Vor dem Livegang zu erledigen“ abarbeiten: Kundenkonto und FTP im KAS, die vier Secrets, Domain im KAS, Postfächer (Formular-Empfänger `janine.hoffmann@gyn-rangsdorf.de`, Absender `noreply@gyn-rangsdorf.de`), dann Zweig `live` auf den Stand von `main` setzen. Nach dem Livegang: Formular testen, Google Unternehmensprofil und Search Console nach `doku/seo-geo-checkliste.md` Abschnitt 1 bis 3, Weiterleitung yourbeautybalance.de als 301 auf `/aesthetik/`.

## Haltung
Deutsch, leichte Sprache, Klickwege statt Beschreibungen. Commits mit Namen von Admir Bahovic, nicht mit „Claude“. Keine Agenten-Workflows starten, alles direkt im Chat erledigen, Admir achtet auf sein Nutzungslimit. Am Ende in einem Satz sagen, was jetzt gilt und was bei der Kundin liegt.
