

### Instalação global para criar ou rodar projetos
```bash
npm install -g cordova
```
> Node.js precisa ser 14+

### Criando um novo projeto
```bash
cordova create magi.app
cd ./magi.app
```

### Adicionando plataformas (necessário sempre que clonar o projeto tambem)
```bash
cordova platform add browser
cordova platform add android@11.0.0
```

### Rodando no navegador para testar
```bash
cordova run browser
```

Para rodar em um android precisa instalar [Android Studio](https://developer.android.com/studio/index.html)
> Eu baixei essa versão https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip

Extraia usando o comando abaixo (ajustando local do arquivo por exemplo)

```bash
tar -xf ~/Downloads/android-studio-2021.3.1.16-linux.tar.gz -C ~/
```
> Ele será extraido em uma pasta ~/android-studio/

Adicionando permissão para executar Android Studio e rodando ele
```bash
chmod a+x ~/android-studio/bin/studio.sh
~/android-studio/bin/studio.sh
```
Basta instalar com Next > Next > Next configuração Standard no Theme que preferir,Selecione Android 12L, 12, 11 e 10 como opções ele irá baixar o android sdk, emuladores etc.
> ~/Android/Sdk é o lugar padrão por isso pedi pra usar o Standard
> Caso tenha esquecido de selecionar android 12L, 12, 11 e 10 abra novamente vá em More Actions, SDK Manager, Procure por Android SDK, selecione as versões e clique em apply.

Tambem é necessário baixar o commandline-tools, na pagina de download do Android Studio, em [Download Options](https://developer.android.com/studio#downloads) procure "Command-line tools only"
> Eu baixei essa versão https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip

Extraia usando o comando abaixo (ajustando local do arquivo por exemplo)

```bash
unzip ~/Downloads/commandlinetools-linux-8512546_latest.zip -d ~/Android/Sdk
```

Tambem precisamos instalar gradle e extrair no diretório home
> Eu baixei nesse link https://gradle.org/next-steps/?version=7.5.1&format=all

```bash
mkdir /opt/gradle
sudo unzip ~/Downloads/gradle-7.5.1-all.zip -d /opt/gradle
```

```bash
sudo apt install gradle
```

Agora precisamos configurar  ~/.bashrc e ~/.zshrc (caso use zsh)

## bash

```bash
echo 'export ANDROID_SDK_ROOT=~/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools/' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_SDK_ROOT/emulator/' >> ~/.bashrc
echo 'export PATH=$PATH:/opt/gradle/gradle-7.5.1/bin' >> ~/.bashrc
 
source ~/.bashrc
```

### OMY zsh

```bash
echo 'export ANDROID_SDK_ROOT=~/Android/Sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools/' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_SDK_ROOT/emulator/' >> ~/.zshrc
echo 'export PATH=$PATH:/opt/gradle/gradle-7.5.1/bin' >> ~/.zshrc
 
source ~/.zshrc
```

Agora rode uma primeira vez com o comando abaixo para ele baixar as outras dependencias automaticamente
```bash
cordova build android
```

Caso acuse o seguinte erro ou de uma versão esperada:
> No installed build tools found. Please install the Android build tools version 32.0.0.
Abra o Android Studio vá em More Actions, SDK Manager, Procure por Android SDK, SDK Tools, marque a opção Show Package Details, selecione a versões 32 clique em apply, e depois de instalado rode novamente cordova build android.

No seu aparelho vá em About Device -> Version e de taps em Build number até liberar o modo desenvolvedor.
Agora vá em System Settings -> Developer Options e ative a opção USB debugging, conecte com o computador usando o cabo de dados e aceite para sempre confiar no seu computador caso/quando exiba a mensagem.

Agora basta rodar o seguinte comando para abrir em seu celular

```bash
cordova run android
```

### NPM/ YARN scripts

Adicionei alguns scripts de utilidade
```json
{
    ...
    "scripts": {
        "dev": "cordova run browser",
        "dev:android": "cordova run android",
        "build:android": "cordova build android",
        "release:android": "cordova build android --release"
    }
    ...
}
```

dev roda no navegador
dev:android roda no aparelho conectado no PC
build:android apenas compila sem rodar (gera um .apk de debug)
release:android apenas compila sem rodar em modo release (gera um aab/apk para publicar na loja)

Para publicar na loja é necessário assinar o APK/AAB em modo release mas esse tutorial fica para depois, se tiver curiosidade:
https://stackoverflow.com/questions/26449512/how-to-create-a-signed-apk-file-using-cordova-command-line-interface
