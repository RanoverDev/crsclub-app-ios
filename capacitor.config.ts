import type { CapacitorConfig } from '@capacitor/cli';

// IMPORTANTE: appId precisa bater exatamente com o Bundle ID já cadastrado
// no App Store Connect ("CRS Club | Congresso RS", app existente em
// "1.0 Preparar para envio"). Confirmar em App Store Connect → Config do
// App → Informações do App → Bundle ID antes de arquivar no Xcode — se
// não bater, o upload é rejeitado.
const config: CapacitorConfig = {
  appId: 'br.com.crsclub.app',
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
