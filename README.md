# MPM - Minecraft Package Manager
CLI tool for setting up and maintaining Minecraft servers.

## Features

  * Create and manage Minecraft servers
  * Update and manage plugins
  * Server files organized in folders
  * Version control with Git

## Supported platforms

  This package currently supports only UNIX and UNIX-like systems. Windows (DOS) platform is not supported, although adding support for it is planned.

## Installation

  * Install the CLI tool with `npm install -g mpmgg` or `yarn global add mpmgg`

  OR

  * Clone the repository to your local machine and run `npm install` or `yarn install`
  * Instead of `mpm` type `npx start` or `yarn start`

## Usage

  * Run the tool's help with `mpm help`
  * Initialize a new server with `mpm init <path>`
  * Run the server with `mpm <script_name>` (e.g. `mpm start`)
  * Add plugins with `mpm add <plugin_name>`
  * Install server and plugin files with `mpm install`
  * Update server and plugin files according to package.json (ignoring package-lock.json) with `mpm update`
  * Upgrade server and plugin files inside package.json with `mpm upgrade`

## Repositories
  * mpm tool - [GitHub (mbledkowski/mpm)](https://github.com/mbledkowski/mpm)
  * data - [Github (mbledkowski/mpm_repository)](https://github.com/mbledkowski/mpm_repository)
    * Data files licensed under Open Data Commons Open Database License v1.0 ([ODbL-1.0](https://opendatacommons.org/licenses/odbl/1.0/))
    * Code licensed under MIT License ([MIT](https://opensource.org/licenses/MIT))

## License (SPDX)

  General Public License 3.0 or later ([GPL-3.0-or-later](LICENSE))