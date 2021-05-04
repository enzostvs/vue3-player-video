# vue3-player-video
____

![VueJS](https://img.shields.io/badge/vuejs-%2335495e.svg?&style=for-the-badge&logo=vue.js&logoColor=%234FC08D)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white)

[![NPM](https://nodei.co/npm/vue3-player-video.png)](https://nodei.co/npm/vue3-player-video/)

A modern, visual video player for Vue3.
It will bring your videos to life with a customizable and powerful player!

If you have a problem, don't hesitate to create an issue :)

### Exemple
- [Live demo 🎉](https://en-zo.dev/vue3-player-video) (coming soon !)
- [Code demo 🎈](https://github.com/enzostvs/vue3-player-video/tree/main/examples) (coming soon !)

### Install
```js
npm install vue3-player-video
```

### Global
```js
import Vue from 'vue'
import VuePlayerVideo from 'vue3-player-video'

Vue.use(VuePlayerVideo, /* { default options with global component } */)
```

### Local registration
```js
import VuePlayerVideo from 'vue3-player-video'

export default {
  components: {
    VuePlayerVideo
  }
}
```

____

## Props
| Name   |      Type      |  Default | Description |
|----------|:-------------:|------:|------:|
| src |  string | required |  Source file |
| autoplay |    boolean   |   false |  Video played when component is load |
| loop | boolean |   false | Play the video again |
| controls | boolean |   true | Display controls |
| mask | boolean |   true | Display the mask on first load |
| hoverable | boolean |   true | Display the controls at the hover |
| colors | String, Array |   ['#fbbf24', '#ec4899'] | Change colors components |
| theme | String |   basic | You can change theme of component: basic, gradient |