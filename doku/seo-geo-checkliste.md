# SEO- und GEO-Checkliste – Praxis Dr. Hoffmann, Rangsdorf

Stand 15.09.2026. Was in der Seite schon drin ist, steht unten. Was außerhalb der Seite passieren muss, steht oben mit genauen Werten zum Eintragen.

## 1. Google Unternehmensprofil (nach Livegang, mit Zugang der Kundin)

Die Verzeichnisse zeigen noch alte Sprechzeiten (Mo bis 18, Di bis 19, Fr bis 12 Uhr). Das muss überall auf den Stand der Webseite.

| Feld | Eintragen |
|---|---|
| Name | Praxis Dr. med. habil. Janine Hoffmann |
| Hauptkategorie | Frauenarzt |
| Weitere Kategorien | Geburtshelfer, Praxis für ästhetische Medizin, Kosmetikstudio |
| Adresse | Am Stadtweg 48, 15834 Rangsdorf |
| Telefon | 033708 21399 |
| Webseite | https://gyn-rangsdorf.de/ |
| Terminlink | https://www.doctolib.de/einzelpraxis/rangsdorf/frauenarztpraxis-hoffmann |
| Öffnungszeiten | Mo 08:00–12:00, 14:00–17:00 · Di 08:00–12:00, 14:00–17:00 · Mi 08:00–12:00, 14:00–15:00 · Do 08:00–12:00, 14:00–16:00 · Fr 08:00–13:00 |
| Attribute | Rollstuhlgerechter Eingang, Rollstuhlgerechter Parkplatz, Termin erforderlich, Von einer Frau geführt |
| Beschreibung (max. 750 Zeichen) | Frauenarztpraxis in Rangsdorf, südlich von Berlin. Dr. med. habil. Janine Hoffmann (Fachärztin für Frauenheilkunde und Geburtshilfe, Zusatzbezeichnung Spezielle Geburtshilfe und Perinatalmedizin) und Dr. med. Henry Hoffmann betreuen Frauen in jedem Lebensalter: Krebsfrüherkennung, Verhütung, Wechseljahre, Beckenboden, Schwangerschaftsvorsorge, Ersttrimester-Screening, NIPT und Feindiagnostik. Dazu EMSELLA®-Beckenbodentherapie bei Blasenschwäche, ästhetische Medizin mit Botulinumtoxin und Hyaluronsäure sowie ein Kosmetik-Institut mit HydraFacial und Microneedling. Gesetzlich und privat Versicherte, barrierefrei, Parkplätze am Haus, fünf Minuten vom Bahnhof Rangsdorf. Termine online über Doctolib. |
| Leistungen | Gynäkologische Vorsorge · Krebsfrüherkennung · Verhütungsberatung und Spirale · Hormonsprechstunde und Wechseljahre · Beckenboden und Blasenschwäche · Schwangerschaftsvorsorge · Ersttrimester-Screening und NIPT · Feindiagnostik · EMSELLA® Beckenbodentherapie · Botulinumtoxin · Hyaluronsäure · EMSCULPT® und EMTONE® · HydraFacial® · Microneedling |
| Fotos | Außenansicht (Foto 2), Empfang (10), Wartebereich (12), Team (75), Ärztin (27), Arzt (24), EMSELLA-Raum (19), Kosmetikraum (20) aus `00_material/fotos_web` |

Gleiche Daten in Doctolib-Profil, Jameda, Das Örtliche, Gelbe Seiten, Arzt-Auskunft und frauenaerzte.de eintragen oder korrigieren (dort steht noch „nicht rollstuhlgerecht“ und alte Zeiten).

## 2. Google Search Console (nach Livegang)
1. https://search.google.com/search-console → Property „Domain“ → `gyn-rangsdorf.de` → Bestätigung per DNS-TXT-Eintrag beim Domain-Anbieter.
2. Sitemaps → `https://gyn-rangsdorf.de/sitemap.xml` einreichen.
3. Nach einer Woche: „Seiten“ prüfen, ob alle 24 Seiten indexiert sind; „Verbesserungen“ zeigt die erkannten FAQ- und Breadcrumb-Daten.
4. Alte URLs der Vorgängerseite prüfen (leiten per .htaccess weiter): `/gynaekologie/`, `/aesthetische-medizin/`, `/ueber-uns/`, `/gleichstellung/`.

## 3. Weiterleitung yourbeautybalance.de
Die frühere Ästhetik-Domain der Kundin leitet bisher per 302 auf die Startseite. Sie rankte für „Botox Rangsdorf/Ludwigsfelde/Zossen“. Beim Domain-Anbieter der Domain (oder in einer eigenen .htaccess dort) einrichten:

```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?yourbeautybalance\.de$ [NC]
RewriteRule ^(.*)$ https://gyn-rangsdorf.de/aesthetik/ [R=301,L]
```

## 4. Prüfungen an der Vorschau (kann sofort gemacht werden)
- Rich Results Test: https://search.google.com/test/rich-results → URL der Vorschau eingeben (Start, EMSELLA, Häufige Fragen). Erwartet: MedicalBusiness, Person, FAQPage, BreadcrumbList ohne Fehler.
- PageSpeed Insights: https://pagespeed.web.dev → Start und EMSELLA, Mobil und Desktop. Zielwerte: Leistung über 90, LCP unter 2,5 s, CLS unter 0,1. Hinweis: Die Vorschau setzt `noindex`, das ist gewollt und keine Fehlermeldung.
- Handybreite 390 px: Kopfbereich, Bilder, Buttons ohne Umbruch, Barrierefreiheits-Knopf über der Terminleiste.
- Alle Videos starten, Untertitel über „CC“ zuschaltbar.
- Google-Karte lädt erst nach Klick auf „Karte laden“.

## 5. Was in der Seite schon drin ist
- Title und Meta-Description pro Seite (unter 60 bzw. 160 Zeichen), Canonical auf gyn-rangsdorf.de, Open Graph, Sitemap, robots.txt mit Freigabe für GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- Strukturierte Daten: MedicalBusiness/Physician mit Sprechzeiten, Koordinaten und Einzugsgebiet; Person für beide Ärzte; MedicalWebPage je Seite; FAQPage auf jeder Leistungsseite; MedicalTherapy für EMSELLA mit Preis; BreadcrumbList.
- GEO: Antwort-zuerst-Absätze, Fragen als Überschriften, Quellenangaben, Autorenbox mit Qualifikation und Datum auf jeder medizinischen Seite, `llms.txt` mit Praxisbeschreibung und Seitenliste.
- Technik: WebP in fünf Größen mit srcset, Schriften lokal, Videos laden erst auf Klick, keine externen Skripte außer Karte nach Klick, .htaccess mit HTTPS, www-Weiterleitung, Caching, Sicherheits-Headern und Weiterleitungen alter URLs.
