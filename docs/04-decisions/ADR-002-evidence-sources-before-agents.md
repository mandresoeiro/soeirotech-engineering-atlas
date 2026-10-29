# ADR-002 — Fontes verificáveis antes de automação por IA

- Status: Aceito
- Data: 2026-10-29

## Problema

O banco já possui Evidence.type e Evidence.url, mas os formulários salvavam tudo como OTHER
e não permitiam vincular a fonte. Uma descrição sozinha não comprova uma entrega.

## Decisão

Reutilizar o schema existente: selecionar tipo, cadastrar URL HTTP/HTTPS opcional e mostrar a
fonte nos detalhes. Compartilhar campos entre criação e edição e validar no servidor com Zod.
Rejeitar protocolos executáveis e URLs com credenciais. Não acessar a URL automaticamente.
Registros sem fonte continuam válidos e são identificados como tal. Não há migração de banco.

## Custos e limites

Uma URL válida não comprova disponibilidade, autoria nem veracidade. A confirmação permanece
humana. A abstração se limita aos campos repetidos e aos tipos; nenhum serviço novo foi criado.

## Agente futuro (proposta, não implementado)

Um assistente de revisão poderá receber um repositório explicitamente escolhido, consultar
arquivos em modo leitura e sugerir evidências com caminho, referência do commit e justificativa.
O usuário revisará antes de salvar ou publicar. Não haverá publicação autônoma.

Antes de integrar um provedor: validar o fluxo manual, criar exemplos com resultados esperados,
definir orçamento por execução, medir afirmações sem fonte e impedir instruções vindas dos
arquivos de mudarem o objetivo da tarefa. Somente então comparar uma busca determinística
com um agente único. Não há necessidade atual de múltiplos agentes ou banco vetorial.

Antes de disponibilizar a aplicação de gestão na internet, implementar autenticação e
autorização no servidor. A vitrine do site SoeiroTech é uma apresentação estática separada.

## Evidências

- Testes de schema para tipos, compatibilidade e links inválidos.
- Fluxo E2E para criar, editar e remover fonte mantendo projeto e skill.

## Alternativas consideradas

- Criar um agente antes de completar a captura de fontes: adiado, pois faltaria uma base para revisar resultados.
- Criar outro serviço e alterar o schema: descartado, pois os campos necessários já existem.

## Dependências e reprodução

Atualizações compatíveis corrigiram os alertas de dependências de execução. O Vitest passou
para 5.0.5 para corrigir os alertas restantes da cadeia de testes; os testes existentes e novos
passaram após a atualização. O CI usa npm ci para reproduzir o lockfile.

Validação local em 29/10/2026: 23 testes passaram; typecheck e build de produção passaram.
Lint passou com um aviso preexistente em postcss.config.mjs. A auditoria npm informou zero
vulnerabilidades na instalação atual; isso não equivale a uma auditoria de segurança do produto.
Docker Desktop falhou ao iniciar nesta máquina. O fluxo E2E foi ampliado, mas sua execução
local com PostgreSQL ficou pendente. O CI existente inclui PostgreSQL e Playwright.
