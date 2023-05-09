# Hacker News PWA

Progressive web app for browsing [Hacker News](https://en.wikipedia.org/wiki/Hacker_News). Focused on small touches missing from similar projects. 

<p align="center">
  <a href="https://hn.xdv.com" target="_blank">
    <img src="https://cdn.levine.org/uploads/images/gallery/2023-05/hnpwa_desktop.png" width="700px">
    <br>
    <img src="https://cdn.levine.org/uploads/images/gallery/2023-05/hnpwa_mobile.png" height="700px">
  </a>
</p>

## Features

- Single page application (SPA)
  - Built with React + react-router
  - Utilizes the [hackerweb](https://github.com/cheeaun/node-hnapi) and [Algolia](https://hn.algolia.com/api) APIs for fetching content
- Progressive web app
  - App manifest
  - Service worker
  - 100/100 Lighthouse score
- TailwindCSS 2.0
  - Responsive, mobile first design
  - Light/dark theme availible (set automatically based off device theme)

## Build Setup

**Requires Node.js 12+**

``` bash
# install dependencies
npm install # or yarn

# start development server
npm run dev

# build for production
npm run build
```

## License

MIT
