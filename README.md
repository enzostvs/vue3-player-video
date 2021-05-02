# vue3-player-video
____

![VueJS](https://img.shields.io/badge/vuejs-%2335495e.svg?&style=for-the-badge&logo=vue.js&logoColor=%234FC08D)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white)
[![NPM](https://nodei.co/npm/vue3-player-video.png)](https://nodei.co/npm/vue3-player-video/)

A modern, visual video player for Vue3.
It will bring your videos to life with a customizable and powerful player!

If you have a problem, don't hesitate to create an issue :)

### Exemple
- Live demo 🎉
- Code demo 🎈

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
| Name   |      Type      |  Default |
|----------|:-------------:|------:|
| src |  string | required | 
| autoplay |    boolean   |   false |
| loop | boolean |   false |
| controls | boolean |   true |
| mask | boolean |   true |
| progressColors | String, Array |   ['#fbbf24', '#ec4899'] |