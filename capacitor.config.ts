import type { CapacitorConfig } from '@capacitor/cli';

// appId confirmado em App Store Connect → Config do App → Informações do
// App → ID do pacote ("CRS Club Hub - br.com.crsclub.hub", ID Apple
// 6808630261) em 2026-09-05.
const config: CapacitorConfig = {
  appId: 'br.com.crsclub.hub',
  appName: 'CRS Club',
  webDir: 'www',
  // O app é uma WebView do hub em produção, não um bundle estático:
  // server.url sobrepõe o webDir local (usado só como fallback offline).
  server: {
    url: 'https://hub.crsclub.com.br',
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
  },
};

export default config;
