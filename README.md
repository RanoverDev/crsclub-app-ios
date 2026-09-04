# CRS Club — App iOS

App nativo que carrega o Hub em produção (`https://hub.crsclub.com.br`)
numa WebView, via [Capacitor](https://capacitorjs.com). Não é um bundle
estático: todo o conteúdo vem do servidor Next.js do Hub, esse projeto só
empacota o "casco" nativo (ícone, splash, permissões, assinatura) pra
poder ir na App Store.

O código-fonte do Hub em si vive em `../www` (repo separado).

## O que já está pronto

- Projeto Xcode gerado em `ios/App/App.xcodeproj` (Capacitor `cap add ios`).
- `capacitor.config.ts` configurado com `server.url` apontando pro hub em
  produção.
- Ícone e splash gerados a partir do ícone do PWA (`assets/icon.png`,
  `assets/splash.png`) em todas as resoluções exigidas pela Apple.
- `Info.plist` com `NSCameraUsageDescription` e
  `NSPhotoLibraryUsageDescription` — necessários porque o upload de foto
  de perfil do Hub (`<input type="file">`) abre o seletor nativo de
  câmera/galeria dentro da WebView, e o iOS derruba o app se essas chaves
  não existirem quando esse fluxo é acionado.

## ⚠️ Antes de arquivar no Xcode

**Confirmar o Bundle ID.** Este projeto usa `br.com.crsclub.app` como
placeholder. O app "CRS Club | Congresso RS" já existe na App Store
Connect (ficha em "1.0 Preparar para envio") — o Bundle ID de lá é fixo
e não pode ser alterado depois de criado. Antes do primeiro build:

1. App Store Connect → app CRS Club → Config do App → Informações do App
   → conferir o **Bundle ID** exato.
2. Se for diferente de `br.com.crsclub.app`, atualizar em dois lugares:
   - `capacitor.config.ts` (campo `appId`)
   - Dentro do Xcode: selecionar o target App → aba Signing & Capabilities
     → campo Bundle Identifier
   - Rodar `npx cap sync ios` depois de mudar o `capacitor.config.ts`.

## Como abrir e buildar (precisa de Mac com Xcode)

Este ambiente é Linux — dá pra gerar e configurar todo o projeto, mas
**compilar, assinar e arquivar exige Xcode rodando em macOS**. Passos pra
quem for finalizar no Mac (ou configurar o Xcode Cloud):

```bash
git clone <este repo> app-ios
cd app-ios
npm install
sudo gem install cocoapods   # se ainda não tiver CocoaPods
cd ios/App
pod install
cd ../..
npx cap open ios             # abre o .xcworkspace no Xcode
```

No Xcode:
1. Selecionar o Team de assinatura (Signing & Capabilities) — precisa da
   conta Apple Developer da organização.
2. Conferir Bundle Identifier (ver seção acima).
3. Version (`Marketing Version`) e Build number — a ficha da App Store
   Connect já está como "Versão 1.0", manter em sincronia.
4. Product → Archive, depois Distribute App → App Store Connect.

### Alternativa sem Mac local: Xcode Cloud

A própria ficha do App Store Connect já tem a aba "Xcode Cloud". Dá pra
conectar este repositório Git diretamente lá (Xcode Cloud roda numa VM
Mac da Apple) e configurar um workflow de build + TestFlight/App Store
sem precisar de um Mac físico — só a primeira configuração do workflow
geralmente pede um Mac com Xcode aberto uma vez para o setup inicial.

## Sempre que o código do Hub mudar

Como o app só carrega a URL remota, **não precisa gerar um novo build
pra maioria das mudanças** — elas aparecem automaticamente na próxima
vez que o usuário abrir o app (é a mesma página web). Só é preciso um
novo build/envio pra loja quando mudar:

- Ícone, splash, nome do app
- Permissões nativas (`Info.plist`)
- A própria versão do Capacitor/dependências nativas

## Estrutura

```
app-ios/
├── assets/              ícone e splash fonte (1024x1024 / 2732x2732)
├── www/                 placeholder local (só usado se a rede cair)
├── ios/App/             projeto Xcode gerado pelo Capacitor
├── capacitor.config.ts  aponta pro hub.crsclub.com.br
└── package.json
```
