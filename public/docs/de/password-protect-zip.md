---
title: ZIP-Dateien auf dem Mac mit Passwort schützen (3 einfache Methoden)
description: 3 Methoden zum Passwortschutz von ZIP-Dateien auf dem Mac: Terminal (schnellste), MacPacker (einfachste) oder Festplattendienstprogramm. Mit Befehlen und AES-256-Tipps.
keywords: zip passwort schützen mac, zip verschlüsseln macos, zip datei mit passwort mac, passwortgeschützte zip mac, verschlüsselte zip erstellen mac, aes-256 zip mac, macpacker
canonical: https://macpacker.app/de/docs/password-protect-zip
---

# ZIP-Dateien auf dem Mac mit Passwort schützen (3 einfache Methoden)

macOS erlaubt es nicht, ZIP-Dateien über den Finder mit einem Passwort zu schützen, aber Sie können ZIP-Archive einfach mit Terminal, Drittanbieter-Apps wie MacPacker oder dem Festplattendienstprogramm verschlüsseln. Die schnellste Methode ist der Terminal-Befehl `zip -e`, der in Sekunden AES-256-verschlüsselte ZIP-Dateien erstellt. Dieser Leitfaden zeigt drei bewährte Methoden zum Passwortschutz von ZIP-Dateien auf dem Mac mit Schritt-für-Schritt-Anleitungen.

## Warum macOS keine passwortgeschützten ZIP-Dateien unterstützt

Das Archivierungsprogramm von Apple (im Finder integriert) kann ZIP-Dateien erstellen, unterstützt aber keinen Passwortschutz. Dies ist eine langjährige Einschränkung von macOS. Passwortgeschützte ZIP-Dateien sind unerlässlich für die Sicherung sensibler Daten bei Dateiübertragungen, E-Mail-Anhängen und Cloud-Speicherung. Häufige Anwendungsfälle sind:

- **Vertrauliche Dokumente** — Schutz von Finanzunterlagen, Verträgen und persönlichen Informationen
- **Sichere Dateifreigabe** — Senden sensibler Dateien per E-Mail oder Cloud-Speicher mit Verschlüsselung
- **Compliance-Anforderungen** — Erfüllung von Sicherheitsstandards für den Umgang mit geschützten Daten
- **Plattformübergreifende Kompatibilität** — ZIP-Dateien funktionieren unter Windows, Mac und Linux mit Passwortunterstützung

Im Gegensatz zur integrierten „Komprimieren"-Funktion des macOS Finders, die unverschlüsselte ZIP-Dateien erstellt, fügen die folgenden Methoden Passwortschutz und Verschlüsselung hinzu, um Ihre Daten zu schützen.

## Methode 1: ZIP-Dateien mit Terminal passwortschützen (Schnellste Methode)

Die Terminal-Methode ist der schnellste und zuverlässigste Weg, passwortgeschützte ZIP-Dateien unter macOS zu erstellen. Sie verwendet den integrierten `zip`-Befehl mit AES-256-Verschlüsselung.

### Schritt-für-Schritt: Verschlüsselte ZIP-Datei mit Terminal erstellen

Öffnen Sie Terminal (Programme > Dienstprogramme > Terminal) und navigieren Sie zum Ordner mit den Dateien, die Sie komprimieren möchten:

```bash
cd /pfad/zu/ihren/dateien
```

Um eine passwortgeschützte ZIP-Datei mit Verschlüsselung zu erstellen:

```bash
zip -er archiv.zip ordnername
```

**Erklärung der Flags:**
- `-e` — Passwortverschlüsselung aktivieren (Sie werden aufgefordert, ein Passwort einzugeben)
- `-r` — Rekursiv alle Dateien und Unterordner einschließen

Nach Ausführung des Befehls fordert Terminal Sie auf, Ihr Passwort einzugeben und zu bestätigen:

```bash
Enter password:
Verify password:
```

**Wichtig:** Ihr Passwort wird während der Eingabe nicht sichtbar sein (dies ist aus Sicherheitsgründen normal).

### Terminal-Befehle für verschiedene Szenarien

**Bestimmte Dateien verschlüsseln (nicht einen Ordner):**

```bash
zip -e dokumente.zip datei1.pdf datei2.docx datei3.xlsx
```

**Eine einzelne Datei verschlüsseln:**

```bash
zip -e vertraulich.zip sensibles-dokument.pdf
```

**Mit maximaler Kompression verschlüsseln:**

```bash
zip -9er archiv.zip ordnername
```

Das `-9`-Flag wendet maximale Kompression an (langsamer, aber erstellt kleinere Dateien).

**Dateien von der Verschlüsselung ausschließen:**

```bash
zip -er archiv.zip ordnername -x "*.tmp" "*.log"
```

Dies erstellt ein verschlüsseltes Archiv, schließt aber temporäre Dateien und Logs aus.

### Sicherheits-Best-Practices für ZIP-Passwörter

Befolgen Sie bei der Erstellung passwortgeschützter ZIP-Dateien diese Sicherheitsrichtlinien:

1. **Verwenden Sie starke Passwörter** — Mindestens 12 Zeichen mit Groß- und Kleinbuchstaben, Zahlen und Symbolen
2. **Teilen Sie Passwörter nie über denselben Kanal** — Senden Sie die ZIP-Datei und das Passwort getrennt (z. B. Datei per E-Mail, Passwort per SMS)
3. **Vermeiden Sie Wörterbuchwörter** — Verwenden Sie Zufallspasswort-Generatoren oder Passphrasen
4. **Berücksichtigen Sie die Verschlüsselungsstärke** — Der Terminal-Befehl `zip -e` verwendet AES-256-Verschlüsselung, die sehr sicher ist
5. **Testen Sie Ihre Archive** — Testen Sie immer das Extrahieren des Archivs vor dem Senden, um zu überprüfen, ob das Passwort funktioniert

## Methode 2: ZIP-Dateien mit MacPacker passwortschützen (Einfachste GUI-Methode)

MacPacker wird die Erstellung passwortgeschützter ZIP-Archive über eine intuitive grafische Benutzeroberfläche unterstützen, sobald die Erstellungsfunktion verfügbar wird. Diese Methode ist ideal für Benutzer, die GUI-Tools gegenüber Terminal-Befehlen bevorzugen.

### Wie MacPacker die ZIP-Verschlüsselung vereinfacht (Demnächst)

Sobald die Erstellungsfunktion verfügbar ist, wird MacPacker bieten:

- **Drag-and-Drop-Oberfläche** — Ziehen Sie einfach Dateien in MacPacker, um verschlüsselte Archive zu erstellen
- **Passwortstärke-Indikatoren** — Visuelles Feedback zur Sicherstellung starker Passwörter
- **Unterstützung mehrerer Formate** — Erstellen Sie verschlüsselte ZIP-, 7z- und andere Archivformate
- **Batch-Operationen** — Verschlüsseln Sie mehrere Ordner gleichzeitig
- **Vorschau vor dem Erstellen** — Überprüfen Sie die Dateiliste vor dem Finalisieren des Archivs

**Aktueller Status:** MacPacker ist derzeit hervorragend beim Extrahieren passwortgeschützter Archive. Die Möglichkeit, verschlüsselte Archive zu erstellen, ist für eine zukünftige Version geplant.

Verwenden Sie in der Zwischenzeit die Terminal-Methode (Methode 1) zum Erstellen passwortgeschützter ZIP-Dateien und nutzen Sie MacPacker zum Extrahieren und Verwalten vorhandener Archive.

[MacPacker kostenlos herunterladen](https://macpacker.app/de#download)

## Methode 3: Festplattendienstprogramm für verschlüsselte DMG verwenden (Alternativer Ansatz)

Wenn Sie eine macOS-native GUI-Lösung für Dateiverschlüsselung benötigen, kann das Festplattendienstprogramm verschlüsselte DMG-Dateien (Disk-Images) erstellen. Obwohl DMG-Dateien keine ZIP-Archive sind, bieten sie starke Verschlüsselung und funktionieren gut innerhalb des Apple-Ökosystems.

### Schritt-für-Schritt: Verschlüsseltes DMG erstellen

1. Öffnen Sie **Festplattendienstprogramm** (Programme > Dienstprogramme > Festplattendienstprogramm)
2. Gehen Sie zu **Ablage > Neues Image > Image von Ordner...**
3. Wählen Sie den Ordner aus, den Sie verschlüsseln möchten
4. Wählen Sie **Verschlüsselung:** Wählen Sie „128-Bit-AES-Verschlüsselung" oder „256-Bit-AES-Verschlüsselung"
5. Geben Sie Ihr Passwort ein und bestätigen Sie es
6. Setzen Sie **Image-Format:** auf „komprimiert", um Speicherplatz zu sparen
7. Klicken Sie auf **Sichern**

Das Festplattendienstprogramm erstellt eine verschlüsselte `.dmg`-Datei, die das Passwort zum Mounten und Zugreifen erfordert.

### DMG vs. ZIP für Dateiverschlüsselung

**Wann verschlüsseltes DMG verwenden:**
- Dateien ausschließlich mit anderen Mac-Benutzern teilen
- Verschlüsselte Backups auf externen Laufwerken speichern
- Native macOS-Integration erforderlich (Doppelklick zum Mounten)
- Bevorzugung von GUI-Tools gegenüber Terminal-Befehlen

**Wann passwortgeschütztes ZIP verwenden:**
- Dateien mit Windows- oder Linux-Benutzern teilen
- E-Mail-Anhänge (ZIP ist universeller erkannt)
- Plattformübergreifende Kompatibilität erforderlich
- Kleinere Dateigrößen sind kritisch

Für maximale Kompatibilität über alle Betriebssysteme hinweg sind passwortgeschützte ZIP-Dateien (Methode 1) die bessere Wahl.

## AES-256 vs. Legacy-ZIP-Verschlüsselung: Was ist sicherer?

Nicht alle ZIP-Verschlüsselungen sind gleich. Das Verständnis der Verschlüsselungstypen hilft Ihnen, das richtige Sicherheitsniveau zu wählen.

### Legacy ZIP 2.0-Verschlüsselung (Schwach)

Ältere ZIP-Tools verwenden Legacy-ZIP-2.0-Verschlüsselung, auch „ZipCrypto" genannt. Diese Verschlüsselungsmethode ist **nicht sicher** und kann mit leicht verfügbaren Tools geknackt werden.

**Eigenschaften:**
- Schnelle Ver-/Entschlüsselung
- Weit kompatibel (selbst sehr alte Software kann sie öffnen)
- Anfällig für Known-Plaintext-Angriffe
- Nicht empfohlen für sensible Daten

### AES-256-Verschlüsselung (Stark)

Moderne ZIP-Tools, einschließlich des macOS-Terminal-Befehls `zip -e`, verwenden **AES-256-Verschlüsselung** (Advanced Encryption Standard mit 256-Bit-Schlüsseln).

**Eigenschaften:**
- Verschlüsselungsstärke auf Militärniveau
- Resistent gegen Brute-Force-Angriffe mit starken Passwörtern
- Unterstützt von den meisten modernen Archiv-Tools (WinZip, 7-Zip, MacPacker usw.)
- Empfohlen für alle sensiblen Daten

**Überprüfung:** macOS Terminal verwendet standardmäßig AES-256, wenn Sie `zip -e` ausführen. Sie können dies überprüfen, indem Sie die ZIP-Dateieigenschaften prüfen oder das Extrahieren mit Tools testen, die den Verschlüsselungstyp anzeigen.

## Fehlerbehebung häufiger Probleme

### „Falsches Passwort" beim Extrahieren

Wenn Sie sicher sind, dass das Passwort korrekt ist:

1. **Überprüfen Sie auf Tippfehler** — Passwörter sind groß- und kleinschreibungsempfindlich
2. **Überprüfen Sie das Tastaturlayout** — Stellen Sie sicher, dass Feststelltaste aus ist und die richtige Spracheingabe ausgewählt ist
3. **Versuchen Sie, das Passwort zu kopieren/einzufügen** — Eliminiert Tippfehler
4. **Überprüfen Sie die Verschlüsselungskompatibilität** — Einige alte Tools unterstützen AES-256 nicht; versuchen Sie das Extrahieren mit MacPacker oder einem modernen Tool

### ZIP-Datei ohne Passwortschutz erstellt

Wenn `zip -e` nicht nach einem Passwort fragt:

1. **Überprüfen Sie das `-e`-Flag** — Es muss vor dem Ausgabedateinamen stehen: `zip -e archiv.zip dateien`
2. **Prüfen Sie die Terminal-Ausgabe** — Suchen Sie nach der Eingabeaufforderung „Enter password:"
3. **Testen Sie das Archiv** — Versuchen Sie es zu extrahieren; wenn kein Passwort erforderlich ist, wurde es nicht verschlüsselt
4. **Verwenden Sie explizite Verschlüsselung** — Einige Systeme erfordern `zip -er` (mit rekursivem Flag), um die Verschlüsselung ordnungsgemäß zu aktivieren

### Passwort kann nicht erinnert werden

**Leider gibt es keine Möglichkeit, ein vergessenes ZIP-Passwort wiederherzustellen.** ZIP-Verschlüsselung (insbesondere AES-256) ist so konzipiert, dass sie ohne das richtige Passwort unknackbar ist.

**Präventionsstrategien:**
- Verwenden Sie einen Passwort-Manager (1Password, Bitwarden usw.), um ZIP-Passwörter zu speichern
- Führen Sie eine sichere Aufzeichnung von Passwörtern getrennt von den ZIP-Dateien
- Verwenden Sie Passworthinweise beim Teilen mit vertrauenswürdigen Empfängern
- Für kritische Archive speichern Sie das Passwort in einem sicheren Tresor

### Windows-Benutzer können Mac-erstellte ZIP-Dateien nicht öffnen

Dies ist selten, kann aber bei sehr alten Windows-Systemen vorkommen:

1. **Stellen Sie AES-256-Unterstützung sicher** — Windows 10+ unterstützt AES-256 nativ; ältere Versionen benötigen möglicherweise WinZip oder 7-Zip
2. **Testen Sie mit 7-Zip** — Kostenloses Windows-Tool mit vollständiger AES-256-Unterstützung: [www.7-zip.org](https://www.7-zip.org)
3. **Überprüfen Sie die Dateiübertragungsintegrität** — Stellen Sie sicher, dass die ZIP-Datei während des Downloads nicht beschädigt wurde
4. **Überprüfen Sie die Dateinamenkompatibilität** — Vermeiden Sie Sonderzeichen in Dateinamen, die Windows nicht unterstützt

## Häufig gestellte Fragen

### Kann der macOS Finder passwortgeschützte ZIP-Dateien erstellen?

Nein, die integrierte „Komprimieren"-Option des macOS Finders erstellt nur Standard-ZIP-Dateien ohne Passwortschutz oder Verschlüsselung. Sie müssen Terminal, Drittanbieter-Anwendungen oder verschlüsselte DMG-Dateien des Festplattendienstprogramms verwenden, um Passwortschutz hinzuzufügen.

### Was ist der sicherste Weg, eine ZIP-Datei auf Mac mit Passwort zu schützen?

Verwenden Sie die Terminal-Methode mit dem Befehl `zip -e`, der AES-256-Verschlüsselung (militärische Sicherheit) anwendet. Kombinieren Sie dies mit einem starken Passwort (12+ Zeichen, gemischte Groß-/Kleinschreibung, Zahlen, Symbole) und teilen Sie das Passwort nie über denselben Kanal wie die ZIP-Datei.

### Wie öffne ich eine passwortgeschützte ZIP-Datei auf Mac?

Das macOS-Archivierungsdienstprogramm kann passwortgeschützte ZIP-Dateien extrahieren — doppelklicken Sie einfach auf die Datei und geben Sie das Passwort ein, wenn Sie dazu aufgefordert werden. Alternativ verwenden Sie MacPacker für eine bessere Extraktionserfahrung mit Unterstützung für beschädigte Archive, mehrteilige Dateien und Vorschaufunktionen.

### Kann ich eine vorhandene ZIP-Datei mit einem Passwort schützen?

Nein, Sie können einer vorhandenen ZIP-Datei kein Passwort hinzufügen. Sie müssen den Inhalt extrahieren und ein neues passwortgeschütztes Archiv mit einer der oben genannten Methoden erstellen (Terminal-Befehl `zip -e` empfohlen).

### Welche Verschlüsselung verwendet macOS für passwortgeschützte ZIP-Dateien?

Der macOS-Terminal-Befehl `zip -e` verwendet standardmäßig **AES-256-Verschlüsselung**, denselben Verschlüsselungsstandard, der von Regierungen und Militärorganisationen verwendet wird. Dies bietet starken Schutz gegen Brute-Force-Angriffe in Kombination mit einem starken Passwort.

### Wie erstelle ich mehrere passwortgeschützte ZIP-Dateien stapelweise?

Verwenden Sie ein Terminal-Skript, um die ZIP-Erstellung für mehrere Ordner zu automatisieren:

```bash
for folder in */; do
    zip -er "${folder%/}.zip" "$folder"
done
```

Dieses Skript durchläuft alle Ordner im aktuellen Verzeichnis und erstellt für jeden ein verschlüsseltes ZIP. Sie werden für jedes Archiv nach einem Passwort gefragt.

### Gibt es eine Dateigrößenbeschränkung für passwortgeschützte ZIP-Dateien?

Standard-ZIP-Dateien unterstützen bis zu 4 GB pro Datei und 65.535 Dateien pro Archiv. Für größere Dateien verwenden Sie das **ZIP64-Format** (automatisch von modernen `zip`-Tools aktiviert, wenn nötig), das praktisch unbegrenzte Dateigrößen unterstützt. Der Terminal-Befehl `zip` unter macOS verarbeitet ZIP64 automatisch.

---

**Müssen Sie regelmäßig passwortgeschützte ZIP-Dateien erstellen?** Setzen Sie ein Lesezeichen für diesen Leitfaden oder richten Sie einen Terminal-Alias für schnellen Zugriff ein:

```bash
echo 'alias ziplock="zip -er"' >> ~/.zshrc
source ~/.zshrc
```

Jetzt können Sie einfach `ziplock archiv.zip ordnername` ausführen, um verschlüsselte Archive zu erstellen.

**Zum Extrahieren passwortgeschützter Archive** [Holen Sie sich MacPacker — Der beste Archivmanager für Mac](https://macpacker.app/de#download)

MacPacker ist kostenlos, quelloffen und unterstützt über 30 Archivformate. Keine Werbung, kein Tracking, keine Einschränkungen.
