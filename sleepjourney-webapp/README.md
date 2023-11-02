# Next Ignition

This is boilerplate for Decoupled Drupal & Next.js project.

## Features

- [Redux Toolkit](https://redux-toolkit.js.org)
- Material UI
- Cypress E2E testing
- Next SWR
- SEO with React Helmet
- Optimized images
- ESLint and Prettier (Using airbnb styleguide)
- Absolute imports

## Setup & Install

Download:

```bash
curl -
cd next-ignition
```

Install it and run:

```bash
yarn
yarn dev
```

# Notes

## Default Environment Variables

In general only one `.env.local` file is needed. However, sometimes you might want to add some defaults for the development (next dev) or production (next start) environment.

Next.js allows you to set defaults in `.env` (all environments), `.env.development` (development environment), and `.env.production` (production environment).

`.env.local` always overrides the defaults set.

> Note: `.env`, `.env.development`, and `.env.production` files should be included in your repository as they define defaults. `.env*.local` should be added to `.gitignore`, as those files are intended to be ignored. `.env.local` is where secrets can be stored.

# Setting up local development environment

Assuming you already have the following

- VirtualBox Ubuntu 20.04 installed
- ssh enabled on virtual machine (you can either set up login/password or public key access access to the server)
    ```bash
    sudo apt update
    sudo apt install openssh-server
    ```

    - Generate ssh keys on your windows - https://www.ssh.com/ssh/putty/windows/puttygen 
    - Copy the ssh key
    - using putty login to the linux virtual VirtualBox
    ```bash
    umask 077 && touch ~/.ssh/authorized_keys
    ```
    - open ~/.ssh/authorized_keys
    - paste the ssh-key you copied
    - make sure you can login without password using putty

## Install git, nodejs, npm and curl
```bash   
    sudo apt update
    sudo apt install git
    sudo apt install nodejs
    sudo apt install npm
    sudo apt install curl
```
## Open Visual Code
- Open command palette and search for "git" and choose "Git: Clone"
- Paste the VDF Front-end git url (https://gitlab.com/dauntless-solutions/vodafone/vigor/vdf-front-end.git) 
- Choose a folder on the virtual machine
- Right click on the folder "vdf-front-end" and click on "Open in Integrated Terminal"

## Install yarn 
Ubuntu 20.04 comes with default cmdtest, which does not work properly with yarn. So you have to remove the default cmdtest and install yarn.
```bash 
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update
    sudo apt remove cmdtest
    sudo apt install yarn
```
## Run the app
```bash 
    yarn
    yarn dev
```
## Setting up local env file

- create a file .env.local
- copy contents of .env.staging


