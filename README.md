# 💸 Yamada Finance Track

Um gerenciador financeiro moderno e intuitivo construído com React, TypeScript e TailwindCSS. Este projeto oferece uma interface limpa e funcional para organizar e acompanhar suas finanças pessoais.

## Visualize o Projeto Clicando [AQUI](https://yamada-fintrack.vercel.app/)

## ✨ Funcionalidades

- **Autenticação de Usuário**: Sistema completo de login e cadastro.
- **Dashboard Financeiro**: Visualização do balanço geral (receitas, despesas e total).
- **Gerenciamento de Transações**: Adicione, edite e visualize suas transações.
- **Filtragem por Data**: Selecione períodos específicos para analisar suas finanças.
- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos.
- **Tema Escuro e Claro**: Alterne entre os temas para melhor visualização.

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca principal para a interface.
- **TypeScript** - Tipagem estática para JavaScript.
- **Tailwind CSS** - Framework CSS para estilização.
- **React Router** - Para o roteamento de páginas.
- **React Hook Form** & **Zod** - Para gerenciamento e validação de formulários.
- **TanStack Query** - Para gerenciamento de estado do servidor e cache.
- **Axios** - Cliente HTTP para realizar requisições à API.
- **Shadcn/UI** - Biblioteca de componentes de UI.

### Backend

O projeto se conecta a uma API RESTful para persistência e gerenciamento dos dados.

- **API**: `https://fullstackclub-finance-dashboard-api.onrender.com/api`

### Ferramentas de Desenvolvimento

- **Vite** - Build tool e servidor de desenvolvimento.
- **ESLint** - Para linting de código.
- **Prettier** - Para formatação de código.
- **Husky** - Para hooks do Git.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 20.x ou superior)
- npm (ou outro gerenciador de pacotes)

### Instalação

1.  **Clone o repositório**

    ```bash
    git clone https://github.com/YudiYamada/yamada-fintrack.git
    cd yamada-fintrack
    ```

2.  **Instale as dependências**

    ```bash
    npm install
    ```

3.  **Execute o projeto**

    ```bash
    npm run dev
    ```

    O frontend estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera a build de produção
npm run preview      # Visualiza a build de produção localmente

# Qualidade de Código
npm run lint         # Executa o ESLint para análise do código
```

## 📁 Estrutura do Projeto

```
src/
├── api/                 # Hooks e serviços para a API (React Query)
├── assets/              # Fontes e imagens
├── components/          # Componentes React reutilizáveis
├── constants/           # Constantes globais
├── contexts/            # Contextos React (ex: Autenticação)
├── forms/               # Schemas (Zod) e hooks para formulários
├── helpers/             # Funções auxiliares
├── lib/                 # Configuração de bibliotecas (axios, utils)
├── pages/               # Páginas da aplicação (Home, Login, etc.)
└── types/               # Definições de tipos TypeScript
```

## 🎨 Design System

O projeto utiliza um sistema de design baseado em CSS variables com suporte para temas claro e escuro, configurado em `src/index.css`. As cores principais são definidas usando a função `oklch` para uma melhor consistência de cores.

- **Primary**: `oklch(0.541 0.281 293.009)`
- **Background**: `oklch(1 0 0)` (Claro) / `oklch(0.141 0.005 285.823)` (Escuro)
- **Foreground**: `oklch(0.141 0.005 285.823)` (Claro) / `oklch(0.985 0 0)` (Escuro)
- **Card**: `oklch(1 0 0)` (Claro) / `oklch(0.21 0.006 285.885)` (Escuro)
- **Destructive**: `oklch(0.577 0.245 27.325)` (Cor para ações destrutivas/erros)

## 📱 Responsividade

O projeto foi desenvolvido com uma abordagem mobile-first, utilizando as classes utilitárias do Tailwind CSS para garantir que a aplicação seja totalmente funcional e visualmente agradável em todos os tamanhos de tela, de smartphones a desktops.

## 🤝 Contribuição

1.  Faça um fork do projeto.
2.  Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`).
3.  Faça o commit de suas mudanças (`git commit -m 'Adiciona NovaFuncionalidade'`).
4.  Faça o push para a branch (`git push origin feature/NovaFuncionalidade`).
5.  Abra um Pull Request.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

- **[Yudi Yamada](https://www.linkedin.com/in/yudi-yamada-0a10181b9/)**
