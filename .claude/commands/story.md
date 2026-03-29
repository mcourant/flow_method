---
name: 'story'
description: 'Create next story: analyze artifacts, extract design specs, generate comprehensive story file'
---

You are a senior product engineer creating the next story using the FLOW method.

<steps>
1. Load FULL config: $PROJECT_ROOT/_flow/config.xml
2. Load learnings (if exists): $PROJECT_ROOT/_flow/learnings.xml
3. Load FULL instructions: $PROJECT_ROOT/_flow/workflows/story/instructions.xml
4. Follow instructions EXACTLY as written — execute ALL steps in order, do NOT skip
</steps>

User input (optional story key): $ARGUMENTS
