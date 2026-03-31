<div align="center">

<br>
<img src="https://raw.githubusercontent.com/mcourant/flow_method/main/assets/flow-banner.jpg" alt="Flow Method" width="100%" />
<br><br>

**AI-driven development workflow for Claude Code**

[![npm version](https://img.shields.io/npm/v/flow-method.svg)](https://www.npmjs.com/package/flow-method)
[![license](https://img.shields.io/npm/l/flow-method.svg)](https://github.com/mcourant/flow_method/blob/main/LICENSE)

From brainstorming to production — a structured, repeatable workflow powered by Claude Code slash commands.

[Getting Started](#getting-started) · [Commands](#commands) · [Workflow](#workflow) · [Update](#update)

</div>

---

## What is Flow Method?

Flow Method is a complete AI development workflow that integrates directly into [Claude Code](https://claude.ai/code). It provides **8 slash commands** that cover the entire software development lifecycle — from ideation and research to implementation, design, review, and retrospective.

Each command follows a structured, repeatable process defined in XML workflow files. Your project accumulates learnings over time, making each iteration smarter than the last.

### What's included

```
your-project/
├── _flow/
│   ├── config.xml              # Project config (name, user, languages)
│   ├── learnings.xml           # Cumulative learnings from retros
│   ├── templates/
│   │   └── story.md            # Story file template
│   └── workflows/
│       ├── brainstorm/         # Brainstorming workflow
│       ├── design/             # UX/UI design workflow
│       ├── dev/                # Development workflow (red-green-refactor)
│       ├── pm/                 # Project management workflow
│       ├── research/           # Research workflow
│       ├── retro/              # Retrospective workflow
│       ├── review/             # Code review workflow
│       └── story/              # Story creation workflow
├── .claude/commands/           # 8 slash commands for Claude Code
└── _flow_output/
    ├── brainstorming/          # Brainstorm session outputs
    ├── planning-artifacts/     # Epics, designs, research
    └── implementation-artifacts/  # Stories, sprint status
```

---

## Getting Started

### Prerequisites

- [Claude Code](https://claude.ai/code) installed and configured
- Node.js 18+

### Install

```bash
npx flow-method
```

The interactive setup will ask for:
- **Project name** — used across all workflows
- **Your name** — for attribution in stories and reviews
- **Communication language** — language Claude uses to talk to you
- **Document language** — language for generated documents

That's it. Open Claude Code in your project and start using `/commands`.

---

## Commands

| Command | Description |
|---|---|
| `/pm` | **Dashboard** — Sprint status, story progression, recommended next action |
| `/story` | **Create story** — Analyze epic artifacts, extract design specs, generate story file |
| `/dev` | **Implement** — Red-green-refactor cycle, visual validation, runtime checks |
| `/design` | **UX/UI Design** — Information architecture, layouts, components, micro-interactions |
| `/review` | **Code review** — Adversarial review, find 3-10+ issues, verify claims |
| `/retro` | **Retrospective** — Extract metrics, analyze patterns, enrich learnings |
| `/brainstorm` | **Brainstorm** — Generate 100+ ideas, domain pivots, clustering, prioritization |
| `/research` | **Research** — Market, domain, or technical analysis with citations |

---

## Workflow

```
/brainstorm → /research → [plan epics] → /story → /dev → /review → /retro
                                /design ──┘   ↑                        |
                                              └────────────────────────┘
```

### Typical flow

1. **`/brainstorm`** — Generate ideas, explore directions, cluster and prioritize
2. **`/research`** — Deep-dive into market, domain, or technical topics
3. **`/design`** — Create UX/UI specs with information architecture, ASCII layouts, and component definitions
4. **Plan epics** — Organize work into epics manually
5. **`/story`** — Generate detailed story files from epic artifacts
6. **`/dev`** — Implement using red-green-refactor with visual validation
7. **`/review`** — Adversarial code review with severity-ranked findings
8. **`/retro`** — Retrospective that enriches learnings for future iterations

---

## Update

Already have Flow Method installed? Update to the latest version:

```bash
npx flow-method@latest update
```

This will:
- **Update** all workflows, commands, and templates to the latest version
- **Preserve** your `config.xml`, `learnings.xml`, sprint data, and all output files
- **Add** any new commands or workflows introduced in the update

---

## Key Files

| File | Purpose |
|---|---|
| `_flow/config.xml` | Project configuration — name, user, languages, paths |
| `_flow/learnings.xml` | Cumulative learnings enriched by each `/retro` |
| `_flow/templates/story.md` | Template used by `/story` to generate story files |
| `_flow_output/implementation-artifacts/sprint-status.yaml` | Source of truth for all story statuses |

---

## Design Philosophy

Flow Method is built on a few key principles:

- **Structured, not rigid** — Workflows provide guardrails, not cages. Each command follows a defined process but adapts to your project's context.
- **Cumulative intelligence** — Learnings from retrospectives feed into future development cycles. Your workflow gets smarter over time.
- **No lock-in** — Everything is plain files (XML, Markdown, YAML). No database, no server, no account. Fork it, customize it, own it.
- **Minimalist UX/UI design** — The `/design` command follows Apple/Tesla-inspired principles: clarity first, hierarchy and purpose, intentional minimalism.

---

## Retro & Cleanup

When `/retro` completes an epic, it automatically:

1. Generates the retro file (`epic-N-retro.md`)
2. Enriches `learnings.xml` with new patterns
3. Deletes completed story files from `implementation-artifacts/`
4. Deletes the epic planning file from `planning-artifacts/`
5. Removes story entries from `sprint-status.yaml`

Only active work + retro history remain — the workspace stays lean.

---

## License

MIT

---

<div align="center">

**Built for [Claude Code](https://claude.ai/code)**

</div>
