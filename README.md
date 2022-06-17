# MPM - Minecraft Package Manager
CLI tool for setting up and maintaining Minecraft servers.

## Features

  * Create and manage Minecraft servers
  * Update and manage plugins
  * Server files organized in folders
  * Version control with Git

## Supported platforms

  This package currently supports only UNIX and UNIX-like systems. Windows (and DOS) platform is not supported, although adding support for it is planned.

  * UNIX / UNIX-like
    * macOS
    * GNU/Linux
    * BSD
  * DOS / Windows NT
    * adding support planned

## Installation

  * Install the CLI tool with `npm install -g mpmgg` or `yarn global add mpmgg`

  OR

  * Clone the repository to your local machine
  * Run `npm build` or `yarn build`
  * Type `npm link` or `yarn global add file:/path/to/mpm` to install package globally

## Usage

  * Run the tool's help with `mpm help`
  * Initialize a new server with `mpm init <path>`
  * Run the server with `mpm <script_name>` (e.g. `mpm start`)
  * Add plugins with `mpm add <plugin_name>`
  * Install server and plugin files with `mpm install`
  * Update server and plugin files according to package.json (ignoring package-lock.json) with `mpm update`
  * Upgrade server and plugin files inside package.json with `mpm upgrade`

## Repositories
  * mpm tool - [mpmgg/mpm (GitHub)](https://github.com/mpmgg/mpm)
  * data - [mpmgg/repository (GitHub)](https://github.com/mpmgg/repository)
    * Licensed under Open Data Commons Open Database License v1.0 ([ODbL-1.0](https://opendatacommons.org/licenses/odbl/1.0/))
  * scripts - [mpmgg/scripts (GitHub)](https://github.com/mpmgg/scripts)
    * Licensed under MIT License ([MIT](https://opensource.org/licenses/MIT))

## License (SPDX)

  General Public License 3.0 or later ([GPL-3.0-or-later](LICENSE))
