# CubaPod web

CubaPod frontend, consuming the api via api.cubapod.net.

Based in:

* Nuxt
* Vue
* Apollo
* Buefy

And more dependencies that you can see in `package.json` file.

### Message from maintainer [@lugodev](https://github.com/lugodev):

> This repository comes from the CubaPod's old super-repo with more than 1.7K commits.
> That repo contains all the CubaPod services into one.
> What I'm doing is creating new repos for each part of the platform.
>  Stay tuned, we'll be creating discussions and Slack spaces soon to cooperate.

## Contributing

1. Fork the repository and clone it to your local dev environment.

2. Create a `.env` file with this content:

```
BASE_URL=http://localhost:3000
BACKEND_BASE_URL=https://api.cubapod.net/
API_BASE_URL=https://api.cubapod.net/
COMPRESSOR_API_BASE_URL=https://compressor.cubapod.net
```

**Note:**
This will change when API repo is released, so you can also run the API locally if you want. Also, some vars might be removed here.

3. Install Node, Yarn or NPM.

4. Install the project dependencies.

    With Yarn:

    ```bash
    cd cubapod-web
    yarn install
    ```

    Or with NPM:

    ```bash
    cd cubapod-web
    npm install
    ```

5. Run the project.

    With Yarn:

    ```bash
    yarn dev
    ```

    Or with NPM:

    ```bash
    npm run dev
    ```

6. Make your commits and sumbit a PR in a `feature` branch.

### ToDo

This section is temporary, so new contributors can acknowledge the HUGE amount of pending work we have. This will be moved to some team management tool, or maybe to GitHub issues.

- [ ] Contribution guide
- [ ] Issue template
- [ ] PR template
- [ ] Repo funding
- [ ] CI with GitHub actions
- [ ] Tests?
- [ ] Add ontributors according to all-contributors.org
- [ ] Document the entire platform, including each component
- [ ] Load fonts from Google Font
- [ ] Optimize images
- [ ] Update static pages
- [ ] Update styles
- [ ] Reuse API calls into `apollo` folder
- [ ] Improve Apollo clients
- [ ] Organize components into folders
- [ ] Remove `~/data/langs.json` file?
- [ ] Improve layouts

And many, many more...

### Possible breaking changes ToDo

- [ ] Migrating to TailwindCSS ?
- [ ] Migrating from Buefy to Oruga.io ?
