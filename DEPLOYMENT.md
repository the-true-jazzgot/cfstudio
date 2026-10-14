# cyber_Folks source deployment

This package is source code, not a prebuilt Linux release. Keep the current website and old Node app intact.

Target application root: `/home/cfstudio/apps/cfstudio-migration-20261014`.
Node: 22.23.2. Mode: Production. Startup file: `app.js`.

Extract the ZIP contents directly into that application root (package.json and app.js must be at its top level). Preserve a copy of the provider-generated starter app.js before replacing it. Do not extract into the main domain's public_html, an old app directory or node_modules.

Set these public values before both build and runtime:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=5n1yg6xs
NEXT_PUBLIC_SANITY_DATASET=cfstudio
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-03
NEXT_PUBLIC_SITE_URL=https://cfstudio.pl
```

Project/dataset values are observed in the existing website's public assets. Sanity ownership, editing roles and CORS must still be verified. No secret tokens are included or required by the existing published-content client. Do not add tokens to NEXT_PUBLIC variables.

On the destination Linux host, in the app's Node virtual environment:

```sh
npm ci --include=dev
npm run build
```

Dev dependencies are needed to build (TypeScript/Tailwind). Node modules and .next must be generated for the destination platform. The panel's install/build capabilities are still to be checked because SSH is disabled. Do not enable SSH or alter permissions without authorization.

Passenger starts app.js itself. For local production testing, use `npm run start:cyberfolks` after a successful build. The ordinary `start` and Vercel behavior are retained.

The application expects domain-root routing. The current temporary path `/cfstudio-migration-20261014/` verifies the provider starter only. A complete staging test needs isolated root routing (for example a dedicated staging hostname) or a separately reviewed Next.js basePath configuration; do not point the main domain at this application to work around that limitation. NEXT_PUBLIC_SITE_URL controls canonical/sitemap URLs, not the routing prefix.

Before cutover: verify HTTPS, main/service/404 pages, navigation, images/galleries, contact links and Sanity login/edit/publish. Back up current hosting settings/files and Sanity data, and preserve email/unrelated DNS. Only switch domain mapping after the full website passes verification and the user's conditional authorization applies.

No hosting upload, restart, domain change or code commit is performed by preparing this package.

## Build outside the hosting account

The hosting account reports a 1 GB physical-memory limit and memory/process faults during builds. A server-side Webpack build was killed with SIGKILL. A local reduced-memory attempt at a 512 MB heap also failed. Do not repeatedly rebuild on the live hosting account or assume a paid upgrade is agreed.

The proposed `.github/workflows/build-cyberfolks.yml` workflow runs when the approved migration branch is pushed, or manually once the workflow is available on the default branch. It uses Ubuntu with Node 22.23.2, installs the repository lockfile, verifies the Linux compiler, lints, builds with Webpack and checks the production entry point before producing a tar.gz and SHA256 checksum. It uses public Sanity configuration only; it has no hosting credentials or deployment step. Publishing/running the workflow requires user authorization.

Before extracting a successful artifact: back up current app files and generated .next directory without deleting originals, verify the artifact checksum and revision, and align destination dependencies with the artifact's lockfile (the current server install drifted to newer Sanity versions). Preserve the hosting-managed node_modules link. The workflow does not establish that the 1 GB runtime limit is sufficient: verify Passenger startup, pages and publishing on the destination before cutover. Staging subpath routing is still unresolved.
