// Minimal service worker copied to public so Vite copies it to the production build.
// Keeps behavior minimal and safe: claims clients and doesn't cache aggressively.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // No-op: allow default network behavior. Add caching logic here if desired.
});
