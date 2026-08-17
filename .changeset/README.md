# Changesets

Release steps:

1. `pnpm changeset` to record the change.
2. `pnpm changeset version` to bump the version and update the changelog.
3. Commit and push to `main`.
4. Run the **Release** GitHub Action to publish to npm.

Changelog files are generated with `@changesets/cli/changelog`.
