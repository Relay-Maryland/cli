# Relay cli

Command line tool for adding calendar entries to relaymaryland.com.

## System requirements

[Node.js](https://nodejs.org)

```sh
# Install latest Node.js (comes bundled with npm, Node package manager)
brew install node
```

## Install

```sh
# Clone the repo, rename it relay-cli
git clone git@github.com:Relay-Maryland/cli.git relay-cli

# Change into the relay-cli directory
cd relay-cli

# Create a symlink from this project root to run relay-cli from anywhere in the terminal
npm link
```

Currently this tool needs to be installed by first cloning this repository. In the future if this tool proves useful it will be published to the npm registry and installed by a one-step `npm` command.

## Usage

```sh
# Create a calendar entry
relay cal

# Get help
relay --help
```

## Desired behavior

### `relay news`

- prompts for frontmatter
  - pub_date
  - title
  - blurb
- maybe open new file in user editor? since this is a markdown doc, maybe it's best to just write it in an editor instead of do it on the cli; but the cli could create the new file and open it up, it could even take pub_date and title args to name the file and fill in those frontmatter fields.

### `relay cal`

- prompts for the yaml fields:
  - date
  - title
  - time
  - location
- shows preview of the file contents in the terminal and asks for confirmation, or maybe just opens it in $editor for review?
- on confirmation creates the yaml file, saves it to src/content/calendar
- maybe opens it up in $editor for review
- `relay event` is an alias

### `relay push`

- a convenience command, runs a series of git commands to push any new posts, uses the filename in the commit message, ie: 'Add $file.md'

## Refs

- https://github.com/lirantal/nodejs-cli-apps-best-practices
- https://blog.logrocket.com/creating-a-cli-tool-with-node-js/
- https://dev.to/shreshthgoyal/a-guide-to-building-cli-tools-in-javascript-28nn
-
