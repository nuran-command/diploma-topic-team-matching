# ThesisFlow UI and UX

English desktop design proposal for an AITU diploma topic selection and student team formation platform. The design is based on the supplied project reports. All names, dates, records, percentages, and counts in the mockups are illustrative; they are not research results or computed recommendations.

## Review

Open `index.html` directly in a browser. No server, package installation, account, or build is required. Its tabs switch between six mockups. Controls drawn inside each SVG are design elements; they do not execute application actions.

## Edit in Figma

1. Create a Figma design file.
2. Drag files from `screens/` onto its canvas.
3. Create one 1440 × 1000 frame per imported screen and give it the corresponding screen name.
4. Use the component specifications in `ux-spec.md` to rebuild reusable components and Auto Layout where needed.
5. Connect frames using the prototype flow described in `ux-spec.md`.

SVG shapes and text are vector-editable. SVG import does not preserve native Figma components, variants, Auto Layout, or prototype connections. Arial is used for predictable font availability. The vector sources are the version-controlled deliverable; no `.fig` file is required.

## Files

- `screens/01-dashboard.svg` — student overview and next steps.
- `screens/02-explore-topics.svg` — search, filters, availability, and ranked topic cards.
- `screens/03-topic-details.svg` — project requirements, recommendation explanation, supervisor, and application entry.
- `screens/04-my-team.svg` — current team, role coverage, and suggested teammates.
- `screens/05-supervisor.svg` — application review queue and supervision capacity.
- `screens/06-administrator.svg` — department allocation and supervisor quotas.
- `tokens.json` — colors, spacing, typography, and radii.
- `generate.cjs` — dependency-free SVG generator.
- `ux-spec.md` — component behavior, flows, states, and responsive guidance.

## Regenerate

From the repository root, run:

```sh
node design/generate.cjs
```

Commit the generator, tokens, SVGs, HTML viewer, and documentation together. Review generated SVG changes visually in the viewer. Change the generator instead of manually editing generated SVGs, otherwise regeneration overwrites those edits. For designs edited in Figma, export them under a separate `design/figma-exports/` directory and document which version is authoritative.

Suggested commit message: `design: add ThesisFlow UI mockups and UX specification`

## Scope

Six desktop concept screens cover the core student experience and overview screens for the two other roles. This is an initial design package, not a complete implementation-ready specification of every route. Authentication, full student profile editing, invitation detail states, application confirmation, supervisor decision dialogs, quota editing, and mobile frames remain to be designed. Their expected behavior is outlined in `ux-spec.md`.
