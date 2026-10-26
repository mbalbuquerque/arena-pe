# Arena PE — Gestão de Eventos Esportivos

> **Seu evento. Seu ritmo. Sua arena.**

Plataforma de apresentação, divulgação e organização de eventos esportivos, com foco em conectar atletas, organizadores e comunidades. O site funciona como uma **vitrine central de eventos** e direciona o visitante às páginas oficiais de cada iniciativa.

**Site:** https://arenapegestaodeeventos.netlify.app/

## Visão geral

A Arena PE reúne informações sobre eventos e projetos esportivos em uma landing page responsiva. A proposta é facilitar a descoberta de eventos e dar visibilidade às iniciativas divulgadas, sem substituir os sistemas de inscrição já existentes.

### Funcionalidades da versão atual

- Página institucional com apresentação da Arena PE, soluções e contato.
- Seção de eventos com cards, cartazes, datas, modalidades, locais e links externos.
- Filtros **Próximos**, **Realizados** e **Todos**.
- Identificação visual de situação do evento (conforme cadastro).
- Layout responsivo para desktop e dispositivos móveis.
- Menu mobile, navegação por âncoras e animações de entrada.
- Links de contato por WhatsApp, Instagram e e-mail.

> **Importante:** o catálogo é alimentado por dados em JavaScript. O painel administrativo, a autenticação e a persistência no Supabase **ainda não estão implementados**.

## Eventos e projetos divulgados

| Evento / projeto | Página oficial |
|---|---|
| Dispara TechFit Ano III | https://disparaano3.netlify.app/ |
| Treino Sítio de Mainha | https://sitiodemainha.netlify.app/ |
| FEST AQUATHLON 2026 | https://fest-aquatlon.onrender.com/ |
| Corra Por Você — Desafio Virtual | https://corraporvocedesafiovirtual.netlify.app/ |
| Movimente-se com Propósito | https://movimentesecomproposito2026.netlify.app/ |
| Corra Por Você — Projeto Esportivo | https://corraporvoce.netlify.app/ |
| Treinão Aqua Olinda 2026 | https://treinaoaquaolinda2026.netlify.app/ |

A relação acima corresponde aos sete links inicialmente fornecidos. A versão local mais recente também pode incluir **Treino das Crianças** e ajustes de datas e cartazes, conforme a evolução do cadastro. Consulte `events-data.js` para a lista efetivamente exibida no seu ambiente.

## Tecnologias

- **HTML5:** estrutura semântica da página.
- **CSS3:** identidade visual, cards, animações e responsividade.
- **JavaScript (vanilla):** menu, interações, filtros e renderização dos eventos.
- **Netlify:** hospedagem da versão pública.
- **Google Fonts:** DM Sans e Space Grotesk.

Não é necessário instalar um framework ou executar `npm install` para a versão estática.

## Estrutura do projeto

```text
arena-pe/
├── index.html         # Página principal e seção de eventos
├── styles.css         # Layout, cores e responsividade
├── script.js          # Navegação, animações e interações
├── events-data.js     # Dados dos eventos (catálogo estático)
├── assets/            # Cartazes e outros arquivos de mídia (se utilizada)
│   └── eventos/
└── README.md
```

> Os nomes e caminhos das imagens dependem de como os cartazes foram organizados na sua pasta local. A pasta `assets/eventos/` é uma convenção recomendada, não uma exigência do código original.

## Executar localmente

1. Baixe ou clone o repositório.
2. Abra um terminal na pasta que contém `index.html`.
3. Inicie um servidor local:

```bash
python -m http.server 5500
```

4. Abra **http://localhost:5500/** no navegador.

Alternativamente, utilize a extensão **Live Server** no VS Code.

## Como atualizar os eventos

Na versão estática, os dados ficam em **`events-data.js`**. Para cada evento, revise os campos definidos no arquivo, especialmente nome, data, local, modalidade, status, destaque, link e imagem (quando presentes).

### Cartazes

- Salve os arquivos de imagem dentro do projeto, preferencialmente em `assets/eventos/`.
- Configure o caminho relativo no cadastro do evento, por exemplo: `assets/eventos/dispara-techfit.jpg`.
- Confira maiúsculas/minúsculas, acentos, extensão e existência do arquivo.
- Teste se os cartazes aparecem no navegador antes de publicar.

### Datas e situações

- Revise manualmente as datas e os status antes de cada divulgação.
- **Evento futuro** não significa necessariamente **inscrições abertas**.
- Eventos esgotados devem usar chamadas como **Ver evento**, sem prometer vagas.
- Projetos permanentes podem aparecer separadamente de provas com data marcada.

## Publicação no Netlify

Para a versão estática, publique a pasta que contém `index.html`, `styles.css`, `script.js`, `events-data.js` e as imagens referenciadas.

Caso o projeto esteja conectado a um repositório Git, envie as alterações para a branch configurada no Netlify. Antes de divulgar, verifique os links, cartazes, filtros e a navegação no celular.

## Identidade visual

| Cor | Código | Uso sugerido |
|---|---|---|
| Azul-marinho | `#071a3d` | Textos e superfícies de destaque |
| Azul | `#1769ff` | Botões e links principais |
| Verde | `#13c995` | Destaques e elementos positivos |
| Coral | `#ff5c55` | Elementos de apoio e contraste |
| Fundo claro | `#f5f8fb` | Fundo da página |

Fontes: **Space Grotesk** (títulos) e **DM Sans** (textos).

## Roadmap

- [x] Landing page institucional.
- [x] Seção de eventos com cards e filtros.
- [x] Links para páginas oficiais dos eventos.
- [x] Suporte a cartazes por evento na versão local.
- [ ] Revisar acessibilidade, SEO e metadados para compartilhamento.
- [ ] Criar página individual de detalhes de cada evento, se necessário.
- [ ] Implementar autenticação administrativa com Supabase Auth.
- [ ] Criar tabela de eventos no Supabase com políticas RLS.
- [ ] Desenvolver painel para cadastrar, editar, destacar e arquivar eventos.
- [ ] Permitir upload seguro de cartazes.
- [ ] Conectar a vitrine ao banco de dados e eliminar a edição manual de `events-data.js`.
- [ ] Implementar testes automatizados de navegação e responsividade.

## Cuidados de segurança na próxima fase

O futuro painel deve exigir autenticação e autorização administrativa. Operações de escrita no Supabase devem ser protegidas por políticas **Row Level Security (RLS)**. Nunca publique uma `service_role key` no JavaScript do navegador.

## Contato

- **Site:** https://arenapegestaodeeventos.netlify.app/
- **Instagram:** https://www.instagram.com/arenapegestaodeeventos/
- **E-mail:** contatoarenapeeventos@gmail.com

---

**Arena PE — Seu evento esportivo em movimento.**
