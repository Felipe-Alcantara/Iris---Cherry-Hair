# Íris — Cherry Hair 🍒

Landing page responsiva em estilo coquette/feminino para apresentar os serviços de coloração, tratamentos e cortes da Íris. O foco é destacar o cuidado personalizado e facilitar o agendamento direto pelo WhatsApp.

## Arquitetura do projeto

```
Iris---Cherry-Hair/
├── index.html
├── index.css
├── script.js
├── services.json
├── testimonials.json
├── images/
│   ├── profile-placeholder.svg
│   ├── galeria-1.svg … galeria-6.svg
└── README.md
```

## Personalização rápida ✨

- **Fotos reais**: Substitua os SVGs da pasta `images/` pelas fotos reais dos clientes e da Íris. Mantenha os mesmos nomes ou ajuste os caminhos em `index.html` e nos arquivos JSON.
- **WhatsApp**: Atualize o número e/ou a mensagem padrão em:
	- atributo `href` dos botões com link para o WhatsApp no `index.html`;
	- constantes `WHATSAPP_NUMBER` e `WHATSAPP_MESSAGE_TEMPLATE` dentro de `script.js`.
- **Serviços**: Edite `services.json` para ajustar títulos, descrições e faixas de preço.
- **Depoimentos**: Atualize `testimonials.json` com novos nomes, textos e avatares.
- **Cores e temas**: Os tokens de cor e tipografia estão declarados no topo de `index.css`.

## Recursos implementados

- Hero com CTA principal e botão para a seção de serviços.
- Cards de serviços com bordas pontilhadas, hover suave e agendamento via WhatsApp.
- Galeria em grid 2x3 com placeholders ilustrativos.
- Carregamento dinâmico de serviços e depoimentos a partir dos arquivos JSON.
- Seção de contato com CTA e link direto para telefonar ou acessar o Instagram.
- Botão flutuante do WhatsApp sempre visível.
- Microanimações (fade-in ao rolar, hover com leve elevação) e background com gradiente + padrão de estrelinhas.

## Como visualizar localmente

1. Faça o download ou clone este repositório.
2. Abra a pasta `Iris---Cherry-Hair` no VS Code (recomendado) ou no explorador de arquivos.
3. Abra `index.html` diretamente no navegador ou utilize uma extensão como *Live Server* para recarregar automaticamente.

## Publicação no GitHub Pages 🚀

1. Faça commit de todos os arquivos na branch `main`.
2. Acesse **Settings → Pages** no repositório do GitHub.
3. Em **Build and deployment**, escolha **Source: Deploy from a branch** e selecione a branch `main`, pasta `/ (root)`.
4. Salve. Em alguns minutos a página estará disponível no endereço indicado pelo GitHub.

> Dica: após publicar, teste os botões do WhatsApp no celular para garantir que a mensagem padrão está correta.

## Stack utilizada

- HTML5 semântico
- CSS3 com variáveis, animações e layout responsivo
- JavaScript puro para carregar dados JSON e controlar animações
- Google Fonts (Dancing Script & Poppins)

## Créditos

Design e desenvolvimento por Felixo • 2025.
