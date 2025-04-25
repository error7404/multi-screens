# Site Web Côte à Côte avec Synchronisation de la Souris pour démo

[🇺🇸 English Version](README.md)

Voici mon petit projet pour présenter les démos. Il doit être lancé depuis un navigateur avec --disable-web-security.

Exemple :

MacOS :

```bash
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials file://$HOME/Downloads/index.html\?old\=https://tickntrip.com\&new\=https://tickntrip.com
```

---

Windows (cmd/PS) :

```powershell
start chrome.exe --user-data-dir="%TEMP%\temporary-chrome-profile-dir" --disable-web-security --disable-site-isolation-trials "file://%USERPROFILE%\Downloads\index.html?old=https://tickntrip.com&new=https://tickntrip.com"
```

---

Linux :

```bash
google-chrome --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials "file://$HOME/Downloads/index.html?old=https://tickntrip.com&new=https://tickntrip.com"
````

## Dépannage

### La page de connexion ne se charge pas

- Ouvrez-la dans une fenêtre séparée
- Connectez-vous
- Actualisez la vue côte à côte

### L'ensemble du site web ne se charge pas

Vous pouvez essayer d'ajouter un proxy qui permet le chargement de la page dans un iframe (assurez-vous d'avoir le droit d'accéder à ce site web).
