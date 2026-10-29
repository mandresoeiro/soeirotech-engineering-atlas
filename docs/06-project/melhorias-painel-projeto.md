# Painel do projeto — 29/10/2026

## Problema

A tela mostrava nomes em inglês, tipos de evidência como códigos e exigia abrir um registro
para chegar à fonte. Não indicava quais competências estavam sem contexto ou evidências sem link.

## Mudança

- Navegação com Painel, Competências, Vitrine e Status do sistema.
- Resumo de competências, evidências e fontes com formato válido.
- Próximos passos baseados nos registros: associar competência, completar contexto ou fonte.
- Tipos de evidência em português e acesso direto à fonte.
- Indicadores compactos para telas estreitas.

Os indicadores medem preenchimento, não proficiência, autoria nem veracidade das fontes.
Links inseguros não são exibidos como fontes. A consulta mostra todas as evidências do projeto
para não indicar uma pendência antiga sem permitir encontrá-la. Paginação pode ser adicionada
quando houver volume real; não foram introduzidas novas dependências nem alterado o banco.

## Conceito aplicado

Uma função pequena calcula o resumo; a tela cuida da apresentação. Isso permite testar contextos
vazios, URLs inválidas e contagem de registros antigos sem depender de banco ou navegador.
O fluxo Playwright também verifica o próximo passo quando uma fonte é removida.

## Validação

Testes unitários e de ações: 26 casos. Tipagem e compilação de produção verificadas.
O fluxo completo com PostgreSQL e navegador é executado pelo CI após o envio.
