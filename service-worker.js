self.addEventListener('install', event => {
  self.skipWaiting()
  console.log('[PWA] Service Worker instalado')
})

self.addEventListener('activate', event => {
  self.clients.claim()
  console.log('[PWA] Service Worker ativado')
})
