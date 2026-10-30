# Busca e filtros de projetos — 30/10/2026

## Problema e solução

A lista de projetos não permitia localizar um cadastro por nome nem separar sua situação.
Agora há busca por nome ou descrição, filtro por situação e ação para limpar ambos.
A contagem distingue resultados encontrados do total cadastrado. Uma busca sem resultados
mostra uma orientação e permite voltar à lista completa.

## Decisão e limite

Usar formulário GET e consulta Prisma no servidor, com validação Zod dos parâmetros.
O termo e a situação ficam no endereço, permitindo recarregar ou compartilhar a mesma busca.
Busca sem diferenciar maiúsculas/minúsculas; não há promessa de busca sem acentos.
Parâmetros inválidos ou repetidos são ignorados; o termo tem limite de 120 caracteres.
Não foi adicionada biblioteca nem modificado o schema ou os registros existentes.

O catálogo ainda não é paginado. Busca textual e filtros atendem o volume atual;
paginação e índices específicos dependem de necessidade observada.

## Validação

30 testes unitários e de ações passaram. Lint sem erros (aviso preexistente em postcss),
tipagem e build de produção passaram. No navegador local foram conferidos busca por
“odonto”, situação Concluído e um filtro sem resultados. O teste E2E adicional cria dois
projetos fictícios no banco de CI, combina texto e situação e verifica a limpeza dos filtros.
