# Atlas: como usar e o que melhorar em seguida

## Para que serve

Transformar uma experiência em algo demonstrável: projeto → competência → contexto → evidência.
Ele não mede automaticamente o nível de uma pessoa e não certifica a veracidade de um link.

## Exemplo de uso real

1. Cadastre o projeto SoeiroTech e seu endereço público.
2. Cadastre a competência CSS.
3. Associe CSS ao projeto com o contexto: “Defini paleta e hierarquia tipográfica para melhorar a leitura”.
4. Crie uma evidência do tipo Commit, com o link do commit que implementou essa mudança.
5. Consulte a fonte na tela de detalhes; edite ou remova o link quando necessário.

## Primeira refatoração

Antes: todo registro era OTHER e não havia campo para a fonte.
Agora: criação e edição compartilham os mesmos campos de tipo e fonte, validados no servidor.
O banco foi preservado. O custo é manter uma pequena lista de tipos e rótulos alinhada ao Prisma.

## Próximas prioridades

1. Rodar o fluxo E2E com PostgreSQL e revisar o resultado do CI.
2. Tornar erros de validação amigáveis nos formulários, preservando o que foi preenchido.
3. Acrescentar autenticação e autorização antes de publicar a aplicação de gestão.
4. Selecionar explicitamente o que entra numa vitrine pública; não expor todos os dados internos.
5. Testar busca e filtros com projetos reais.

## Quando um agente se justifica

Primeiro, execute o fluxo manual em três a cinco projetos. Se localizar evidências tomar tempo
repetidamente, prototipe um assistente de revisão, sem criar uma plataforma separada.

Entrada: repositório escolhido e objetivo da análise.
Ferramentas: listar e ler arquivos e consultar commits em modo leitura.
Saída: rascunhos com projeto, competência, contexto, fonte e justificativa.
Revisão: o usuário confirma antes de persistir ou publicar.

Não enviar arquivos privados a um provedor sem definir esse acesso. Tratar conteúdo do repositório
como dados, não como instruções. Limitar chamadas, tempo e custo. Medir acertos, afirmações sem
fonte, correções humanas e tempo economizado em exemplos com respostas esperadas.

Não há agente implementado neste ciclo nem chave de API necessária. A decisão detalhada está no ADR-002.
