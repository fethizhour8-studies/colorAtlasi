# 00 - How To Use These Docs

These docs are the operating system for the local LLM.

## Recommended Workflow

For each task:

1. Give the local LLM `project_context.md`.
2. Give the relevant phase file.
3. Ask it to implement one task only.
4. Require it to list files before editing.
5. Let it code.
6. Run the commands.
7. Test visually and technically.
8. Commit.
9. Move to the next task.

## Standard Prompt Template

```txt
Read project_context.md first.
Then read docs/[PHASE_FILE].md.

Implement only Task [TASK_NUMBER].

Before coding:
- restate the task
- list exact files you will create/edit
- explain what you will not touch

Do not add:
- database
- admin
- auth
- WordPress
- SSR
- ads
- search
- pipeline features
- multilingual UI
unless this specific task explicitly asks for it.

After coding:
- provide commands to run
- provide verification steps
- confirm npm run build succeeds if code changed
```

## Git Workflow

Use small commits.

```bash
git status
git add .
git commit -m "Phase 0: reset design direction"
```

Suggested commit style:

```txt
Phase 0: correct UX direction
Phase 1: simplify header
Phase 1: redesign homepage catalogue
Phase 1: add printable grid cards
Phase 2: add content validation
Phase 3: add Python pipeline dry run
```

## When To Stop

Stop and ask the human before:
- changing stack
- adding backend
- adding database
- adding auth
- adding real ads
- changing URL architecture
- adding copyrighted/franchise content
- adding multilingual UI
