# Modelo de Dados

O modelo organiza o fluxo **Projeto -> Skill -> Contexto -> Evidência**.

```mermaid
erDiagram
    PROJECT ||--o{ PROJECT_SKILL : uses
    SKILL ||--o{ PROJECT_SKILL : appears_in
    PROJECT ||--o{ EVIDENCE : has
    SKILL |o--o{ EVIDENCE : supports_optional
    PROJECT ||--o{ ARCHITECTURE_DECISION : records

    PROJECT {
      string id
      string slug
      string name
      string description
      ProjectStatus status
      string repository
      string demoUrl
      DateTime createdAt
      DateTime updatedAt
    }

    SKILL {
      string id
      string slug
      string name
      string description
      DateTime createdAt
      DateTime updatedAt
    }

    PROJECT_SKILL {
      string projectId
      string skillId
      string context
      DateTime createdAt
    }

    EVIDENCE {
      string id
      string title
      string description
      EvidenceType type
      string url
      string projectId
      string skillId
      DateTime createdAt
      DateTime updatedAt
    }

    ARCHITECTURE_DECISION {
      string id
      string code
      string title
      string context
      string decision
      string consequences
      DecisionStatus status
      string projectId
      DateTime createdAt
      DateTime updatedAt
    }
```

## Relações

1. `Project` 1:N `ProjectSkill`.
2. `Skill` 1:N `ProjectSkill`.
3. `Project` 1:N `Evidence`.
4. `Skill` 1:N `Evidence`, quando a evidência estiver associada a uma skill.
5. `Project` 1:N `ArchitectureDecision`.

`ProjectSkill` usa chave composta: `(projectId, skillId)`.

`prisma/schema.prisma` é a fonte executável do modelo.
