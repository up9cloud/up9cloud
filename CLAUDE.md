# CLAUDE.md — up9cloud.github.io

The owner's **GitHub profile README** site. **Relationship: personal.**

See the root `../../CLAUDE.md` for monorepo-wide rules.

## Stack

- Node script that regenerates `README.md` from data (`update-readme.mjs`,
  using `jsonc-parser`)
- Published with `gh-pages`

## Commands

- `npm -w packages/up9cloud.github.io run build` — `node update-readme.mjs`
- `npm -w packages/up9cloud.github.io run deploy` — `gh-pages -d .`

For deployment, see the root `../../CLAUDE.md` "Deployment" section.

## Editing content

The published `README.md` is the rendered profile (badges, stats cards). If you
change profile content, prefer editing the generator/data and re-running
`build`, rather than hand-editing the generated `README.md`.
