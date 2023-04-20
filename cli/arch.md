# Architecture

## `email dev`

### Get all email previews

1. Recursivley read the configured `<emailDir>` -> <npm.im/glob>
2. Match and filter filenames by `<emailPreviewExtensions>` -> TODO: make the glob configurable

### Render email preview

<https://github.com/unjs/jiti> + SWC

1. Add `require` and `import` hooks
   - Transform using `swc``
   - Track required files (for watching)
2. `await import` the entrypoint
3. render with `@react-email/render`

### Watch all tracked files

/email/:slug

1. Infer affected email previews
2. Publish `email: <slug>` event to SSE

/emails

1. Watch `<emailDir>`
2. Publish `emails` event to SSE
