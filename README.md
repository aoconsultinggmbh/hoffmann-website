# Frauenarztpraxis Dr. Janine Hoffmann, Rangsdorf

Webseite der Frauenarztpraxis Dr. Janine Hoffmann, Am Stadtweg 48, 15834 Rangsdorf.
24 Seiten plus 404-Seite: Frauenheilkunde, Geburtshilfe, Ästhetik, Emsella, Praxis, Karriere,
Kontakt, häufige Fragen, Gleichstellung, Impressum, Datenschutz.
Domain: **gyn-rangsdorf.de**

Erstellt von AO Consulting GmbH.

## Wichtig: wo geändert wird

Die Seite wird **nicht** in `website/` bearbeitet. Der Quellcode liegt auf Admirs Mac
unter `~/Desktop/Admir Assistenz/Webseite_Dr_Hoffmann/01_site/`:

- Texte: `pages/*.html` (ein File je Seite, mit JSON-Kopf)
- Praxisdaten, Navigation, Öffnungszeiten: `data/site.json`
- danach `python3 build.py` ausführen und den Inhalt von `dist/` nach `website/` kopieren

Wer direkt in `website/` ändert, verliert die Änderung beim nächsten Bauen.

## Aufbau

| Ordner | Inhalt |
|---|---|
| `website/` | **Die Webseite.** Nur was hier liegt, geht online. |
| `doku/` | Unterlagen zum Projekt |
| `.github/workflows/` | Die zwei Abläufe: Vorschau und Livegang |

## Die zwei Zweige

- **`main` = Vorschau** unter <https://hoffmann.vorschau.ao-consult.de>.
  Suchmaschinen sind dort ausgesperrt.
- **`live` = echte Webseite.** Erst wenn der Zweig `live` auf den Stand von `main`
  gesetzt wird, lädt GitHub die Dateien zum Hoster hoch.

Nichts geht ohne Freigabe live.

## Was diese Seite schon richtig macht

- Schriften (Cormorant Garamond, Figtree, Jost) liegen im Paket, keine Verbindung zu Google.
- Google Maps lädt **erst auf Klick**, mit Hinweistext davor. Kein Tracker, keine Cookies.
- Doctolib und Treatflow sind nur verlinkt, nicht eingebettet.
- `.htaccess` ist fertig: HTTPS erzwingen, www umleiten, Weiterleitungen von den
  alten Adressen (`/gynaekologie/`, `/aesthetische-medizin/`, `/ueber-uns/`).

## Wichtig für die Vorschau

- **Das Kontaktformular funktioniert in der Vorschau nicht.** `kontakt/senden.php`
  braucht PHP, das gibt es bei GitHub Pages nicht. Auf dem echten Server läuft es.
- Die Videos (84 MB, größtes 27 MB) liegen mit im Projekt. Das ist in Ordnung,
  aber bei jedem Austausch wächst das Projekt dauerhaft. Werden die Videos öfter
  ersetzt, sollten sie besser direkt auf den Hoster statt in GitHub.

## Vor dem Livegang

- Kontaktformular scharf schalten: Empfängeradresse prüfen, Honeypot gegen Spam.
  **Arztpraxis:** Im Freitextfeld können Gesundheitsangaben stehen. Hinweis
  ergänzen („bitte keine Krankheitsdaten") und mit der Praxis abstimmen.
- Datenschutzerklärung gegen das Formular und die Maps-Einbindung prüfen.
- Prüfen, dass alle Adressen der bisherigen Seite weiter funktionieren (.htaccess).
- Livegang nach `doku/livegang-anleitung.md` im Projekt puchmayr-website.
