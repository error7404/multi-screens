# Side-by-Side Website Demo with mouse sync

[🇫🇷 Version Française](README.fr.md)

Here is my little project to present the demos. It needs to be launched from a browser with --disable-web-security.

eg:

Macos:

```bash
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials file://$HOME/Downloads/index.html\?old\=https://tickntrip.com\&new\=https://tickntrip.com
```

---

Windows (cmd/PS):

```powerShell
start chrome.exe --user-data-dir="%TEMP%\temporary-chrome-profile-dir" --disable-web-security --disable-site-isolation-trials "file://%USERPROFILE%\Downloads\index.html?old=https://tickntrip.com&new=https://tickntrip.com"
```

---

Linux:

```bash
google-chrome --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials "file://$HOME/Downloads/index.html?old=https://tickntrip.com&new=https://tickntrip.com"
```

## Troubleshooting

### The login page doesn't load

- Open it in a separate window
- Log in
- Refresh the side-by-side view

### The all website doesn't load

You can try to add a proxy that allows the loading of the page in an iframe (make sure you have the right to access this website).
