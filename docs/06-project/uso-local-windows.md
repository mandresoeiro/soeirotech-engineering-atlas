# Abrir o Atlas neste computador

O cadastro real da Odonto Personnallite está no banco PostgreSQL local do Atlas.

1. Abra ABRIR-ATLAS.cmd na raiz do projeto.
2. Acesse http://127.0.0.1:3010/projects.
3. Abra Odonto Personnallite para ver quatro competências e cinco evidências.

O atalho usa PostgreSQL 17 já instalado, na porta 5440, e inicia o painel somente em 127.0.0.1.
Se a aplicação já estiver rodando, informa o endereço sem criar outra instância.

## Dados locais

- `.local/postgres/`: dados do banco exclusivo do Atlas, sem alterar bancos ou serviços existentes.
- `.env.local`: configuração privada de conexão; nunca publicar nem enviar ao GitHub.
- Os dados e a senha não acompanham um clone do repositório.
- Não apagar `.local` para limpar o projeto: ela contém o cadastro realizado.
- O banco local não é publicado no site SoeiroTech.

O aplicativo ainda não tem autenticação. Este atalho o mantém acessível apenas neste computador.

## Cadastro inicial

Projeto: Odonto Personnallite. Site: https://odontopersonnallite.com.br/.
Competências: React, TypeScript, CSS e publicação web.
Fontes: site publicado, entrada React, configuração TypeScript, imports CSS e captura de tela.
O nome antigo do repositório GitHub não altera o nome do projeto publicado.

Para editar, use a tela do projeto. Um link cadastrado não comprova por si só autoria ou resultado comercial.
