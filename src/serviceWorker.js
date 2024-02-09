// INFO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Dieser optionale Code wird verwendet, um einen Service Worker zu registrieren.

// Dadurch wird die App bei späteren Besuchen in der Produktion schneller geladen und ist
// sie offline-fähig. Allerdings bedeutet dies auch, dass Entwickler (und Benutzer)
// erst bei späteren Besuchen einer Seite sehen, nachdem alle
// geöffneten Registerkarten geschlossen wurden, da zuvor zwischengespeicherte
// Ressourcen im Hintergrund aktualisiert werden.

// ENDE INFO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // URL constructor 
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Hier wird gecheckt. ob der ServiceWorker im LocalHost vorhanden ist
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Wenn kein LocalHost, dann nur ServiceWorker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error während der ServiceWorker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check, ob ServiceWorker gefunden werden kann
  fetch(swUrl)
    .then(response => {
      // Sicherstellen, ob ServiceWorker vorhanden ist
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Kein ServiceWorker gefunden. Seite aktualisieren
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // ServiceWorker gefunden. Es kann weiter gehen
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('Keine Internetverbindung gefunden. Die App läuft im Offline-Modus.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
