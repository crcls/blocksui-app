# Blocks UI Marketplace

Blocks UI marketplace.

## Table of Contents

- [Contributing](#contributing)
  - [Types](#types)
  - [Branches](#branches)
  - [Commits](#commits)
  - [Pull Requests](#pull-requests)
  - [Merging Into Main](#merging-into-main)

## Contributing

Code changes can fall into the types from the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Types

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- **build**—changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).

- **chore**—other changes that don’t modify src or test files.

- **ci**—changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).

- **docs**—documentation only changes.

- **feat**—a new feature.

- **fix**—a bug fix.

- **perf**—a code change that improves performance.

- **refactor**—a code change that neither fixes a bug nor adds a feature.

- **revert**—reverts a previous commit.

- **style**—changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).

- **test**—adding missing tests or correcting existing tests.

### Branches

Branches are created from `main` and can follow the naming convention below. For common types, see [Types](#types).

Convention:

```shell
type/description
```

Example:

```shell
feat/add-xyz
```

### Commits

Conventional Commits are enforced using [commitlint](https://commitlint.js.org/) in a [husky](https://github.com/typicode/husky) pre-commit hook.

Convention:

```shell
type(scope?): description  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Example:

```shell
feat: add xyz
```

### Pull Requests

1.  **Title**

    Titles can follow the naming convention below and match the branch name. For common types, see [Types](#types).

    Convention:

    ```shell
    type: description
    ```

    Example:

    ```shell
    feat: add xyz
    ```

2.  **Body**

    When creating a new pull request, you will automatically see a template with a checklist in the body.

3.  **Reviewers**

    Add at least one reviewer.

4.  **Labels**

    Apply related labels.

### Merging Into Main

Always “Squash & merge” your commits into `main`.
