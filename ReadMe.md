# 🏆 X2 — Site Informativo do Projeto X2

 ![Projeto X2](./public/logoX2home.svg)


## 📖 Descrição
 
O **X2** é um site informativo desenvolvido para divulgar e centralizar informações sobre o **Projeto X2**.  
Seu objetivo é apresentar a edição atual do projeto, os resultados dos jogos passados e, futuramente, exibir os resultados em tempo real durante as partidas.
 
O site busca ampliar a **visibilidade** do projeto e oferecer acesso rápido aos resultados para pessoas que não puderem estar presentes nos jogos.  
O projeto nasceu da necessidade de aprimorar o **marketing do Projeto X2**, que antes contava apenas com o Instagram como meio de divulgação.  
Com o site, espera-se alcançar mais público e fortalecer a identidade visual do projeto.
 
---
 
## 🚧 Status do Projeto
 
> 🔨 **Em desenvolvimento**
 
---
 
## ⚙️ Funcionalidades
 
### Sistema **Client**

###  **Login**
- react-hot-toast (notificação, login realizado)
- autenticação de usuario adm ou usuario comum


 
### Sistema **Admin**
- Edição das informações da **Home** do site. ( em desenvolvimento)
- Edição da **Tabela de Jogos**.              ( em desenvolvimento)
- Edição da seção **Sobre**.                  ( em desenvolvimento)
- Edição da tela de **Patrocinadores**.       ( em desenvolvimento)
---
 
## 🧠 Tecnologias Utilizadas
 
**Linguagens:**  
- HTML  
- CSS / TailwindCSS  
- JavaScript  
 
**Framework:**  
- React + Vite  
 
---
 
## 🧩 Pré-requisitos
 
- Navegador atualizado (Chrome, Edge, Firefox, etc.)  
- Node.js (para desenvolvimento e build do projeto)  
- npm ou yarn instalado
 
---



# 🌿 Design System – 

Sistema de design baseado em tons de verde e turquesa, com foco em leveza, natureza e modernidade.

## 🎨 Paleta de cores

|-------Variável-------|-Cor (Hex)-| 
|----------------------|-----------|
| `--color-dark`       | `#0C4740` | 
| `--color-medium`     | `#006D61` | 
| `--color-light`      | `#02B765` | 
| `--color-accent`     | `#7ED957` | 
| `--color-background` | `#FCFFFA` | 
| `--color-newaccent`  | `#C89116` | 
| `--color-newdark`    | `#000000` | 

---

## 💻 Variáveis CSS

```css
@theme {
  --color-dark: [#0C4740];
  --color-medium: [#006D61];
  --color-light: [#02B765];
  --color-accent: [#7ED957];
  --color-background: [#FCFFFA];
  --color-newaccent: [#C89116];
  --color-newdark: [#000000];
}
 ```
## 💻 Instalação
 
```bash
# Clone este repositório
git clone https://github.com/coffeecliff/Frontend-X2
 
# Instale as dependências
npm install
 
# Inicie o servidor de desenvolvimento
npm run dev

#caso dê algum erro execute esses comandos

# se estiver preso em algum pacote use:
 npm cache clean --force

 # e tente novamente o 
npm install

# se quiser ver em qual pacote esta travando use:
npm install --verbose

#se o npm está tentando baixar um pacote, mas a conexão HTTPS está sendo interceptada por um certificado SSL interno (autoassinado) use:
npm config set strict-ssl false

# e tente novamente o 
npm install

```

## Estrutura de pastas

    src/
    ├── assets/                 # Imagens e ícones
    ├── components/
    |   └── Button.jsx          # Componentes reutilizáveis
    |   └── Card.jsx            # Componentes reutilizáveis
    |   └── Footer.jsx          # Componentes reutilizáveis
    |   └── Input.jsx           # Componentes reutilizáveis
    |   └── LoadingSpinner.jsx  # Componentes reutilizáveis
    |   └── Privatenavbar.jsx   # Componentes reutilizáveis
    |   └── PublicNavbar.jsx    # Componentes reutilizáveis
    |   └── Sidebar.jsx         # Componentes reutilizáveis
    ├── context/
    │   └── AuthContext.jsx     # Controle de autenticação
    ├── pages/                  # Páginas do sistema (Home, Login,, about, etc.)
    |   └── About.jsx           # Pagina about conta um pouco sobre o projeto          
    |   └── AdmAboutEdit.jsx    # Pagina de edicão da pagina about          
    |   └── AdmGamesEdit.jsx    # Pagina de edição da tabela da pagina jogos                
    |   └── AdmHomeEdit.jsx     # Pagina de edição da tabela de resultados da home               
    |   └── AdmSponsorEdit.jsx  # Pagina de edição dos patrocinadores                   
    |   └── Games.jsx           # Pagina que mostra o resultado das tabelas dos jogos          
    |   └── Home.jsx            # Pagina inicial do site        
    |   └── Login.jsx           # Pagina login do site         
    |   └── NewEdition.jsx      # Pagina que mostra a edição atual do desafio              
    |   └── Register.jsx        # Pagina de registro do site              
    |   └── Sponsor.jsx         # Pagina de patrocinadores            
    ├── routes/
    │   └── AppRoutes.jsx       # Definição das rotas
    ├── services/
    |   └── mockApi.js          # somente temos mockApi para testarmos a autenticação e entrarmos na page adm           
    ├── App.jsx
    ├── index.css
    └── main.jsx

---

## 👨‍💻 Autores

- GitHub: <br>
[@lucas-cybertron](https://github.com/lucas-cybertron)<br>
[@coffeecliff](https://github.com/coffeecliff)<br>
[@anapaulasouza270407](https://github.com/anapaulasouza270407)
---

## 📞 Suporte

Tem alguma dúvida ou encontrou um bug? 

- 🐛 [Abra uma Issue](https://github.com/lucas-cybertron/back-end-x2/issues)
- 💬 [Discussões](https://github.com/lucas-cybertron/back-end-x2/discussions)

---

<div align="center">

**Desenvolvido com ❤️ usando FastAPI**

⭐ Se este projeto foi útil, considere dar uma estrela!

</div>
