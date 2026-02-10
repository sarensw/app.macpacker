---
title: Mehrere Archive gleichzeitig auf macOS extrahieren
description: Vollständige Anleitung zur Stapelextraktion von Archiven auf Mac. Automator-Workflows, Shell-Skripte und MacPacker-Batch-Funktionen zum gleichzeitigen Extrahieren mehrerer ZIP-, RAR- und 7z-Dateien.
keywords: stapelextraktion archive mac, mehrere zip dateien extrahieren mac, bulk unzip mac, extraktion automatisieren mac, batch unrar mac
canonical: https://macpacker.app/de/docs/batch-extraction
---

# Mehrere Archive gleichzeitig auf macOS extrahieren

Die Arbeit mit Dutzenden oder Hunderten von Archivdateien ist mühsam, wenn Sie jede einzeln extrahieren müssen. Egal, ob Sie heruntergeladene Software-Sammlungen verarbeiten, extrahierte Dateien sichern oder Medienbibliotheken organisieren — die Stapelextraktion mehrerer Archive auf einmal auf macOS spart enorm viel Zeit. MacPacker macht die Massenextraktion mühelos mit Drag-and-Drop-Batch-Unterstützung für ZIP, RAR, 7z und über 30 weitere Formate — ohne manuelle Skripterstellung erforderlich.

## Warum Archive auf dem Mac stapelweise extrahieren?

Die Stapelextraktion wird in mehreren häufigen Szenarien unverzichtbar:

**Softwareentwicklung** — Extrahieren mehrerer Abhängigkeitsarchive, Build-Artefakte oder Release-Pakete, die aus Repositories heruntergeladen wurden. Die Verarbeitung einzelner Archive verschwendet Entwicklungszeit.

**Mediensammlungen** — Entpacken großer Sammlungen komprimierter Videodateien, Bildarchive oder Audiobibliotheken, die oft als mehrere komprimierte Dateien für einfacheres Herunterladen verteilt werden.

**Dokumentenverwaltung** — Verarbeitung archivierter Berichte, gescannter Dokumente oder Sicherungsdateien, die als separate Archive organisiert nach Datum, Abteilung oder Projekt eintreffen.

**Datenmigration** — Das Verschieben archivierter Daten zwischen Systemen erfordert oft das gleichzeitige Extrahieren zahlreicher komprimierter Dateien, um Ordnerstrukturen wiederherzustellen.

Das integrierte Archivierungsdienstprogramm von macOS kann Archive nur nacheinander verarbeiten und zwingt Sie, jede Datei manuell zu doppelklicken oder eigene Skripte zu schreiben. MacPacker beseitigt diese Reibung mit nativer Stapelextraktionsunterstützung.

## Methode 1: Stapelextraktion mit MacPacker (Empfohlen)

MacPacker ist die einfachste Lösung zum gleichzeitigen Extrahieren mehrerer Archive auf dem Mac. Es verarbeitet gemischte Format-Batches — Sie können ZIP-, RAR-, 7z- und TAR-Dateien zusammen in einer Operation extrahieren.

### Schritt 1: MacPacker installieren

Installieren Sie MacPacker über [Homebrew](https://brew.sh):

```bash
brew install --cask macpacker
```

Oder laden Sie es direkt von der [MacPacker-Website](https://macpacker.app/de#download) oder aus dem Mac App Store herunter.

### Schritt 2: Mehrere Archive auswählen

Navigieren Sie im Finder zum Ordner mit Ihren Archiven. Wählen Sie alle Archive aus, die Sie extrahieren möchten:

- **Alle Dateien auswählen**: Drücken Sie `Cmd + A`, um alles im Ordner auszuwählen
- **Bestimmte Dateien auswählen**: Halten Sie `Cmd` gedrückt und klicken Sie auf einzelne Archive
- **Bereich auswählen**: Klicken Sie auf das erste Archiv, halten Sie `Shift` gedrückt und klicken Sie auf das letzte Archiv

MacPacker unterstützt das gleichzeitige Extrahieren gemischter Archivformate — wählen Sie eine beliebige Kombination von `.zip`, `.rar`, `.7z`, `.tar.gz` und anderen Formaten aus.

### Schritt 3: Drag-and-Drop zum Extrahieren

Sobald Sie Ihre Archive ausgewählt haben, ziehen Sie sie auf das MacPacker-Anwendungssymbol in Ihrem Dock oder Programmordner. MacPacker wird:

1. Alle ausgewählten Archive gleichzeitig öffnen
2. Jedes Archiv in seinen eigenen Ordner extrahieren (oder zu Ihrem gewählten Ziel)
3. Den Fortschritt aller Extraktionsvorgänge in einer einheitlichen Oberfläche anzeigen
4. Fehler elegant behandeln und mit den verbleibenden Archiven fortfahren, wenn eines fehlschlägt

**Profi-Tipp**: Sie können die Extraktionseinstellungen von MacPacker so konfigurieren, dass Archive automatisch in denselben Ordner wie die Quelldatei, einen bestimmten Zielordner extrahiert werden oder Sie für jeden Batch gefragt werden.

### Stapelextraktionsfunktionen in MacPacker

Der Batch-Modus von MacPacker behandelt komplexe Szenarien automatisch:

- **Gemischte Formate** — Extrahieren Sie [ZIP](./password-protect-zip), [RAR](./extract-rar) und [7z-Dateien](./extract-7zip) in einem Batch
- **Passwortgeschützte Archive** — Geben Sie Passwörter einmal für alle Archive mit demselben Passwort ein oder bei Bedarf einzeln
- **Mehrteilige Archive** — MacPacker erkennt und kombiniert automatisch geteilte Archive (`.part1.rar`, `.part2.rar`)
- **Fehlerbehandlung** — Extrahiert verbleibende Archive weiter, auch wenn einzelne Dateien fehlschlagen
- **Struktur erhalten** — Behält die ursprüngliche Ordnerorganisation beim Extrahieren zu einem Ziel bei

Dies macht MacPacker deutlich leistungsfähiger als das Archivierungsdienstprogramm oder grundlegende Kommandozeilen-Tools für Batch-Operationen.

[MacPacker kostenlos herunterladen](https://macpacker.app/de#download)

## Methode 2: Stapelextraktion mit Terminal und Shell-Skripten

Für Entwickler und fortgeschrittene Benutzer bietet das Terminal leistungsstarke Automatisierungsoptionen für die Stapelextraktion. Diese Methode ist ideal bei der Arbeit auf Remote-Servern, der Integration in Build-Skripte oder der programmatischen Verarbeitung von Archiven.

### Grundlegende Stapelextraktion mit unzip

Um alle ZIP-Dateien in einem Verzeichnis zu extrahieren:

```bash
for file in *.zip; do
    unzip -d "${file%.zip}" "$file"
done
```

Dieses Skript durchläuft alle `.zip`-Dateien im aktuellen Verzeichnis und extrahiert jede in einen Ordner, der nach dem Archiv benannt ist (ohne die `.zip`-Erweiterung).

### RAR-Dateien stapelweise mit unrar extrahieren

Installieren Sie zunächst `unrar`, falls noch nicht verfügbar:

```bash
brew install unrar
```

Dann extrahieren Sie alle RAR-Archive:

```bash
for file in *.rar; do
    unrar x "$file" "${file%.rar}/"
done
```

### 7z-Dateien stapelweise mit p7zip extrahieren

Installieren Sie das `p7zip`-Kommandozeilen-Tool:

```bash
brew install p7zip
```

Extrahieren Sie alle 7z-Archive:

```bash
for file in *.7z; do
    7z x "$file" -o"${file%.7z}"
done
```

### Universelles Stapelextraktionsskript

Für gemischte Archivformate verwenden Sie dieses umfassende Skript, das ZIP-, RAR-, 7z- und TAR-Formate verarbeitet:

```bash
#!/bin/bash
for archive in *.{zip,rar,7z,tar.gz,tar.bz2}; do
    [ -f "$archive" ] || continue

    case "$archive" in
        *.zip)     unzip -d "${archive%.zip}" "$archive" ;;
        *.rar)     unrar x "$archive" "${archive%.rar}/" ;;
        *.7z)      7z x "$archive" -o"${archive%.7z}" ;;
        *.tar.gz)  tar xzf "$archive" -C "${archive%.tar.gz}" ;;
        *.tar.bz2) tar xjf "$archive" -C "${archive%.tar.bz2}" ;;
    esac
done
```

Speichern Sie dies als `batch_extract.sh`, machen Sie es mit `chmod +x batch_extract.sh` ausführbar und führen Sie es in jedem Verzeichnis mit Archiven aus.

**Wann die Terminal-Methode verwenden:**
- Automatisierung der Extraktion in CI/CD-Pipelines
- Verarbeitung von Archiven auf Remote-Servern via SSH
- Integration der Extraktion in bestehende Shell-Skripte
- Batch-Verarbeitung mit benutzerdefinierter Filterung oder Transformationen

## Methode 3: Stapelextraktion mit Automator-Workflows

macOS Automator bietet eine GUI-basierte Automatisierungslösung für die Stapelextraktion ohne Code-Schreiben. Erstellen Sie einen wiederverwendbaren Workflow, den Sie aus dem Rechtsklick-Menü des Finders aufrufen können.

### Erstellen eines Automator-Stapelextraktionsdienstes

1. Öffnen Sie **Automator** (in Programme oder via Spotlight)
2. Wählen Sie **Schnellaktion** (oder „Dienst" in älteren macOS-Versionen)
3. Setzen Sie „Workflow erhält" auf **Dateien oder Ordner** in **Finder**
4. Ziehen Sie die Aktion **Shell-Skript ausführen** in den Workflow
5. Fügen Sie dieses Skript ein:

```bash
for file in "$@"; do
    case "$file" in
        *.zip)
            unzip -d "${file%.zip}" "$file"
            ;;
        *.rar)
            unrar x "$file" "${file%.rar}/"
            ;;
        *.7z)
            7z x "$file" -o"${file%.7z}"
            ;;
    esac
done
```

6. Speichern Sie den Workflow als „Archive stapelweise extrahieren"

Jetzt können Sie mit der rechten Maustaste auf ausgewählte Dateien im Finder klicken und **Schnellaktionen > Archive stapelweise extrahieren** wählen, um sie sofort zu verarbeiten.

### Automator vs. MacPacker

Während Automator-Workflows Automatisierung bieten, bietet MacPacker mehrere Vorteile:

- **Keine Einrichtung erforderlich** — Funktioniert sofort nach der Installation
- **Fortschrittsverfolgung** — Visuelles Feedback für alle Extraktionsvorgänge
- **Fehlerbehandlung** — Benutzerfreundliche Fehlermeldungen statt Terminal-Ausgabe
- **Formatunterstützung** — Verarbeitet über 30 Archivformate ohne Installation zusätzlicher Kommandozeilen-Tools
- **Passwortunterstützung** — Interaktive Passwortabfragen für verschlüsselte Archive

Für gelegentliche Stapelextraktion ist MacPacker einfacher. Für die Integration in komplexe Workflows oder Automatisierungsketten bieten Automator oder Shell-Skripte mehr Flexibilität.

## Behebung von Stapelextraktionsproblemen

### Einige Archive lassen sich im Batch-Modus nicht extrahieren

Bei der Verarbeitung großer Batches können einige Archive beschädigt oder passwortgeschützt sein:

1. Überprüfen Sie das Extraktionsprotokoll von MacPacker, um festzustellen, welche Dateien fehlgeschlagen sind
2. Extrahieren Sie fehlgeschlagene Archive einzeln, um spezifische Fehlermeldungen zu sehen
3. Überprüfen Sie beschädigte Archive, indem Sie sie mit `unrar t dateiname.rar` oder ähnlichen Befehlen testen
4. Für passwortgeschützte Archive extrahieren Sie sie separat oder stellen Sie sicher, dass alle dasselbe Passwort verwenden

Erfahren Sie mehr über den Umgang mit problematischen Dateien: [Dateien aus beschädigten Archiven wiederherstellen](./corrupted-archives)

### Stapelextraktion geht der Speicherplatz aus

Das gleichzeitige Extrahieren vieler großer Archive kann erheblichen Speicherplatz verbrauchen:

1. Überprüfen Sie den verfügbaren Speicherplatz vor der Stapelextraktion: Systemeinstellungen > Allgemein > Speicher
2. Extrahieren Sie in kleineren Batches, um den Speicherplatzverbrauch schrittweise zu verwalten
3. Löschen Sie Quellarchive nach erfolgreicher Extraktion, wenn Speicherplatz knapp ist
4. Verwenden Sie symbolische Links oder Sparse-Dateien für Disk-Images und ISO-Dateien, wenn möglich

### Archive werden an falsche Orte extrahiert

Verschiedene Tools haben unterschiedliche Standard-Extraktionsverhalten:

- **MacPacker**: Extrahiert jedes Archiv in einen Ordner, der nach der Archivdatei benannt ist
- **Archivierungsdienstprogramm**: Extrahiert in dasselbe Verzeichnis wie das Quellarchiv
- **Kommandozeilen-Tools**: Verhalten hängt von verwendeten Flags ab (`-d`, `-o`, etc.)

Konfigurieren Sie die Einstellungen für das Extraktionsziel in den MacPacker-Einstellungen oder verwenden Sie explizite Ausgabepfade in Shell-Skripten, um zu steuern, wohin Dateien extrahiert werden.

### Stapelextraktion ist zu langsam

Die Extraktionsgeschwindigkeit hängt von mehreren Faktoren ab:

1. **Archivformat**: [7z-Archive](./extract-7zip) extrahieren langsamer als ZIP aufgrund der Komplexität des Kompressionsalgorithmus
2. **Dateianzahl**: Archive mit Tausenden kleiner Dateien dauern länger als einzelne große Dateien
3. **Festplattengeschwindigkeit**: Das Extrahieren auf externe Laufwerke oder Netzwerkstandorte ist langsamer als auf lokalen SSD-Speicher
4. **Gleichzeitige Operationen**: Das gleichzeitige Extrahieren zu vieler Archive kann die Festplatten-I/O sättigen

Für maximale Geschwindigkeit extrahieren Sie in Batches von 10-20 Archiven gleichzeitig auf lokalen SSD-Speicher. [RAR-Archive](./extract-rar) bieten ein gutes Gleichgewicht zwischen Kompression und Extraktionsgeschwindigkeit.

## Häufig gestellte Fragen

### Kann ich verschiedene Archivformate gleichzeitig stapelweise extrahieren?

Ja, MacPacker verarbeitet gemischte Format-Stapelextraktion nahtlos. Wählen Sie eine beliebige Kombination von ZIP, RAR, 7z, TAR.GZ und anderen unterstützten Formaten aus und extrahieren Sie sie zusammen in einer Operation. MacPacker erkennt automatisch das Format jedes Archivs und verwendet die geeignete Extraktionsmethode.

### Wie extrahiere ich passwortgeschützte Archive stapelweise?

Wenn alle Archive dasselbe Passwort verwenden, fragt MacPacker einmal und wendet dieses Passwort auf alle Dateien an. Wenn Archive unterschiedliche Passwörter verwenden, fragt MacPacker bei Bedarf einzeln. Für die Kommandozeilen-Stapelextraktion können Sie Passwörter direkt in Skripten mit Flags wie `unrar x -pPasswort archiv.rar` übergeben oder eine interaktive Schleife verwenden, die für jedes Passwort fragt.

### Funktioniert die Stapelextraktion mit verschachtelten Archiven?

Ja, aber verschachtelte Archive (Archive, die andere Archive enthalten) erfordern mehrere Extraktionsdurchgänge. MacPacker kann [verschachtelte Archive](./nested-archives) vor dem Extrahieren in der Vorschau anzeigen und ermöglicht es Ihnen, innere Archive nach dem Extrahieren der äußeren zu extrahieren. Für die Automatisierung führen Sie Ihr Stapelextraktionsskript zweimal aus — einmal für äußere Archive, dann erneut auf dem extrahierten Inhalt.

### Kann ich nur bestimmte Dateitypen aus Archiven stapelweise extrahieren?

MacPacker ermöglicht selektive Extraktion — öffnen Sie Archive einzeln und wählen Sie bestimmte zu extrahierende Dateien aus. Für die Kommandozeilen-Automatisierung verwenden Sie Tools wie `unzip` mit Dateimustern: `unzip archiv.zip '*.pdf'` extrahiert nur PDF-Dateien. Für Batch-Operationen integrieren Sie die Dateifilterung nach der Extraktion in Ihre Shell-Skripte.

### Was ist der schnellste Weg, Hunderte von Archiven zu extrahieren?

Verwenden Sie MacPacker für gemischte Formate mit grafischer Oberfläche oder schreiben Sie ein Shell-Skript mit paralleler Verarbeitung für maximale Geschwindigkeit:

```bash
find . -name "*.zip" -print0 | xargs -0 -P 4 -I {} unzip -d "{}" "{}"
```

Dies extrahiert bis zu 4 ZIP-Dateien gleichzeitig. Passen Sie `-P 4` an Ihre CPU-Kernanzahl an. Seien Sie vorsichtig mit sehr hoher Parallelität, da dies die Festplatten-I/O sättigen und die Gesamtextraktion tatsächlich verlangsamen kann.

### Wie extrahiere ich Archive automatisch beim Herunterladen?

macOS bietet keine integrierte automatische Extraktion beim Download für alle Archivtypen. Für Browser konfigurieren Sie Download-Einstellungen oder verwenden Sie Browser-Erweiterungen. Für automatisierte Workflows erstellen Sie eine Ordneraktion in Automator, die Ihren Download-Ordner überwacht und neue Archive automatisch extrahiert. Alternativ verwenden Sie Kommandozeilen-Tools wie `fswatch`, um Verzeichnisse zu überwachen und Extraktionsskripte auszulösen, wenn neue Archive erscheinen.

### Kann ich Archive direkt auf ein Netzlaufwerk oder externen Speicher extrahieren?

Ja, sowohl MacPacker als auch Kommandozeilen-Tools unterstützen das Extrahieren auf jedes eingebundene Volume. Netzlaufwerke und externer Speicher sind jedoch erheblich langsamer als lokaler SSD-Speicher. Für große Batch-Operationen sollten Sie zuerst auf lokalen Speicher extrahieren und dann die extrahierten Dateien anschließend zur besseren Leistung auf Netzwerkspeicher verschieben.

### Wie behandle ich mehrteilige Archive bei der Stapelextraktion?

Mehrteilige Archive (`.part1.rar`, `.part2.rar`, etc.) müssen alle Teile im selben Verzeichnis haben. Beim Stapelextrahieren wählen Sie nur den ersten Teil jedes mehrteiligen Archivs aus — MacPacker und Kommandozeilen-Tools erkennen und kombinieren automatisch alle Teile. Das Auswählen aller Teile einzeln kann Fehler oder doppelte Extraktionsversuche verursachen.

---

**Bereit, Archive effizient stapelweise zu extrahieren?** [MacPacker herunterladen — Der schnellste Stapelarchiv-Entpacker für Mac](https://macpacker.app/de#download)

MacPacker ist kostenlos, quelloffen und unterstützt die Stapelextraktion von über 30 Archivformaten. Keine Skripte, keine Einrichtung, keine Einschränkungen.
