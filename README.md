
# MeuIP

MeuIP é uma aplicação web simples que exibe informações detalhadas sobre o endereço IP do usuário, incluindo localização, ISP e outras informações úteis. A aplicação é construída com Node.js e Express, utiliza Tailwind CSS para o design e é containerizada usando Docker. O Nginx Proxy Manager é usado para gerenciamento de proxy reverso.

## Índice

- [Demonstração](#demonstração)
- [Características](#características)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Configuração do Nginx Proxy Manager](#configuração-do-nginx-proxy-manager)
- [Capturas de Tela](#capturas-de-tela)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Demonstração

![Screenshot do Projeto](https://raw.githubusercontent.com/drksbr/MeuIP/refs/heads/main/screenshots/screen01.png)

## Características

- **Informações de IP**: Exibe detalhes como cidade, país (com bandeira), localização, organização, CEP, estado, fuso horário, porta de origem e timestamp.
- **Design Moderno**: Interface responsiva e moderna utilizando Tailwind CSS.
- **Tema Dinâmico**: Tema claro e escuro com detecção automática do tema do sistema.
- **Switch de Tema**: Permite alternar entre os temas claro e escuro manualmente.
- **Containerização**: Utiliza Docker para fácil implantação e escalabilidade.
- **Proxy Reverso**: Configuração com Nginx Proxy Manager para gerenciamento de proxy e SSL.

## Pré-requisitos

- **Docker** e **Docker Compose** instalados no sistema.
- **Git** instalado para clonar o repositório.
- (Opcional) Um nome de domínio válido apontando para o seu servidor.

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/meuipmw.git
   cd meuipmw
   ```

2. **Crie o arquivo `.env`:**

   Crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   LOGO_URL=https://seu-site.com/sua-logo.png
   BACKGROUND_COLOR=#f0f0f0
   ```

   Substitua `https://seu-site.com/sua-logo.png` pela URL da sua logo e `#f0f0f0` pela cor de fundo desejada.

## Configuração

### Arquivo `docker-compose.yml`

Certifique-se de que o arquivo `docker-compose.yml` está configurado corretamente:

```yaml
version: "3.8"

services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: npm
    restart: always
    ports:
      - "80:80"
      - "81:81"
      - "443:443"
    volumes:
      - npm_data:/data
      - npm_letsencrypt:/etc/letsencrypt
    networks:
      - web

  meuipmw:
    image: drks/meuipmw:latest
    container_name: meuipmw
    environment:
      - LOGO_URL=${LOGO_URL}
      - BACKGROUND_COLOR=${BACKGROUND_COLOR}
    networks:
      - web

volumes:
  npm_data:
  npm_letsencrypt:

networks:
  web:
    driver: bridge
```

## Executando a Aplicação

Para iniciar a aplicação, execute:

```bash
docker-compose up -d
```

Este comando irá iniciar os contêineres em segundo plano.

## Configuração do Nginx Proxy Manager

1. **Acesse o painel do Nginx Proxy Manager:**

   Abra o navegador e acesse `http://localhost:81`. Se estiver executando em um servidor remoto, substitua `localhost` pelo endereço IP ou domínio do servidor.

2. **Login no NPM:**

   Use as credenciais padrão:

   - **Email:** `admin@example.com`
   - **Senha:** `changeme`

   **Importante:** Após o primeiro login, altere o e-mail e a senha para garantir a segurança.

3. **Configure um Proxy Host:**

   - Clique em **"Proxy Hosts"** no menu lateral.
   - Clique em **"Add Proxy Host"**.
   - **Domain Names:** Insira seu domínio ou `localhost` se estiver testando localmente.
   - **Scheme:** Selecione `http`.
   - **Forward Hostname / IP:** Insira `meuipmw`.
   - **Forward Port:** Insira `3000`.
   - **Websockets Support:** Marque esta opção se necessário.
   - **Block Common Exploits:** Marque esta opção.
   - **Configure SSL** se tiver um domínio válido e desejar usar HTTPS.
   - **Advanced > Custom Nginx Configuration:**

     Adicione o seguinte:

     ```nginx
     location / {
         proxy_set_header X-Forwarded-Source-Port $remote_port;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-Forwarded-Proto $scheme;

         # Inclui as configurações padrão do NPM
         include conf.d/include/proxy.conf;
     }
     ```

     Isso garante que o cabeçalho `X-Forwarded-Source-Port` seja passado para a aplicação, permitindo que ela capture a porta de origem do cliente.

   - Clique em **"Save"** para aplicar as configurações.

4. **Teste a Aplicação:**

   - Acesse `http://localhost` ou o domínio configurado para ver a aplicação em funcionamento.

## Capturas de Tela

*Inclua aqui capturas de tela da aplicação, do painel do Nginx Proxy Manager, e de quaisquer outras partes relevantes.*

## Tecnologias Utilizadas

- **Node.js** e **Express** para o backend.
- **Tailwind CSS** para o design responsivo e moderno.
- **Docker** e **Docker Compose** para containerização e fácil implantação.
- **Nginx Proxy Manager** para gerenciamento de proxy reverso e SSL.
- **ipinfo.io API** para obter informações detalhadas sobre o IP.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias, correções de bugs ou novas funcionalidades.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- **Nome:** Isaac Diniz
- **Email:** isaacramonpb@gmail.com
- **GitHub:** [seu-usuario](https://github.com/drksbr)
