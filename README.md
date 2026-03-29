# Flow Method

AI-driven development workflow for Claude Code.

## Install

```bash
npx flow-method
```

This scaffolds into your project:
- `_flow/` — workflow engine (config, learnings, templates, workflows)
- `.claude/commands/` — 7 slash commands for Claude Code
- `_flow_output/` — output directories (planning, implementation, brainstorming)

## Commands

| Command | Description |
|---------|-------------|
| `/pm` | Dashboard — sprint status, story progression, recommended next action |
| `/story` | Create next story from epic planning artifacts |
| `/dev` | Implement a story — red-green-refactor, visual validation |
| `/review` | Adversarial code review — find 3-10 issues minimum |
| `/retro` | Epic retrospective — metrics, learnings, artifact cleanup |
| `/brainstorm` | Interactive brainstorming — 100+ ideas, domain pivots |
| `/research` | Web research — market, domain, or technical analysis |

## Workflow

```
/brainstorm → /research → [plan epics manually] → /story → /dev → /review → /retro
                                                     ↑                          |
                                                     └──────────────────────────┘
```

## Key files

- `_flow/config.xml` — project config (name, user, language, paths)
- `_flow/learnings.xml` — cumulative learnings enriched by each retro
- `_flow/templates/story.md` — story file template
- `_flow_output/implementation-artifacts/sprint-status.yaml` — source of truth for all story statuses

## Retro cleanup

When `/retro` completes for an epic, it automatically:
1. Generates the retro file (`epic-N-retro.md`)
2. Enriches `learnings.xml` with new patterns
3. **Deletes** completed story files (`N-N-*.md`) from implementation-artifacts
4. **Deletes** the epic planning file from planning-artifacts
5. Removes story entries from `sprint-status.yaml`

This keeps the workspace lean — only active work + retro history remain.
