<script>
import { defineComponent } from 'vue';

export default /*#__PURE__*/defineComponent({
  name: 'Vue3PlayerVideo', // vue component name
  props: {
    src: {
      type: String,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    progressColors: {
      type: [String, Array],
      default () {
        return ['#fbbf24', '#ec4899']
      }
    }
  },
  data () {
    return {
      uuid: Math.random().toString(36).substr(2, 18),
      hovered: false,
      amount: 1,
      player: null,
      duration: 0,
      playing: false,
      volume: false,
      time: {
        progress: 0,
        display: 0,
        current: 0
      },
    }
  },
  created () {
    window.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === 32) {
        this.play()
      }
    })
  },
  computed: {
    colorFrom () {
      if (typeof this.progressColors === 'string') {
        return this.progressColors ? this.progressColor : '#fbbf24'
      }
      return this.progressColors?.[0] ? this.progressColors[0] : '#fbbf24'
    },
    colorTo () {
      if (typeof this.progressColors === 'string') {
        return this.progressColors ? this.progressColor : '#fbbf24'
      }
      return this.progressColors?.[1] ? this.progressColors[1] : '#ec4899'
    },
  },
  async mounted () {
    this.player = this.$refs[this.uuid]
    this.player.addEventListener('loadeddata', () => {
      if(this.player.readyState >= 3){
        this.duration = this.format(Number(this.player.duration))
        this.time.display = this.format(0)
      }
    })
  },
  watch:{
    'time.current' (value) {
      this.time.display = this.format(Number(value))
      this.time.progress = value * 100 / this.player.duration
    }
  },
  methods: {
    isPlaying (bool) {
      this.playing = bool
    },
    play () {
      if (this.playing) {
        return this.player.pause()
      }
      return this.player.play()
    },
    stop () {
      this.player.pause()
      this.player.currentTime = 0
    },
    setVolume () {
      this.player.volume = this.amount
    },
    fullScreen () {
      this.player.webkitEnterFullscreen()
    },
    position (e) {
      this.player.pause()
      const rect = e.target.getBoundingClientRect()
      const pos = e.clientX - rect.left
      const percentage = pos * 100 / e.target.offsetWidth
      this.player.currentTime = percentage * this.player.duration / 100
      this.player.play()
    },
    format (seconds) {
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = Math.round(seconds % 60)
      return [
        h,
        m > 9 ? m : (h ? '0' + m : m || '00'),
        s > 9 ? s : '0' + s
      ].filter(Boolean).join(':')
    }
  }
})
</script>

<template>
  <div class="shadow-xl rounded-xl overflow-hidden relative" @mouseenter="hovered = true" @mouseleave="hovered = false" @keydown.left="play">
    <div class="relative">
      <video
        :ref="uuid"
        class="w-full"
        :loop="loop"
        :autoplay="autoplay"
        :muted="autoplay"
        @timeupdate="time.current = $event.target.currentTime"
        @pause="isPlaying(false)"
        @play="isPlaying(true)"
        @click="play"
      >
        <source :src="src" type="video/mp4">
      </video>
      <!-- ${hovered ? 'opacity-100' : 'opacity-0 translate-y-full'} -->
      <div v-if="controls" :class="`transition duration-300 transform absolute w-full bottom-0 left-0  flex items-center justify-between overlay px-5  pt-3 pb-5`">
        <div class="flex items-center justify-start w-full">
          <p class="text-white text-xs mr-3 w-24">
            {{ time.display }}/{{ duration }}
          </p>
          <div class="mr-3">
            <img v-show="playing" src="https://en-zo.dev/vue-videoplayer/pause.svg" alt="Icon pause video" class="w-4 cursor-pointer" @click="play">
            <img v-show="!playing" src="https://en-zo.dev/vue-videoplayer/play.svg" alt="Icon play video" class="w-4 cursor-pointer" @click="play">
          </div>
          <div class="w-full h-1 bg-white bg-opacity-60 rounded-sm cursor-pointer" @click="e => position(e)">
            <div class="relative h-full pointer-events-none" :style="`width: ${time.progress}%; transition: width .2s ease-in-out;`">
              <div
                class="w-full rounded-sm h-full gradient-variable bg-gradient-to-r pointer-events-none absolute top-0 left-0"
                :style="`--tw-gradient-from: ${colorFrom};--tw-gradient-to: ${colorTo};transition: width .2s ease-in-out`"
              />
              <div
                class="w-full rounded-sm filter blur-sm h-full gradient-variable bg-gradient-to-r pointer-events-none absolute top-0 left-0"
                :style="`--tw-gradient-from: ${colorFrom};--tw-gradient-to: ${colorTo};transition: width .2s ease-in-out`"
              />
            </div>
          </div>
        </div>
        <div class="ml-3 flex items-center justify-end" @mouseleave="volume = false">
          <div class="relative">
            <div :class="`w-128 transform origin-left translate-x-2 -rotate-90 w-128 transition duration-200 absolute transform top-0 py-2 ${volume ? '-translate-y-4' : 'opacity-0 -translate-y-1'}`">
              <div class="px-3 py-2 rounded-lg bg-black bg-opacity-80 flex items-center transform translate-x-2">
                <input v-model="amount" type="range" step="0.05" min="0" max="1" class="rounded-lg overflow-hidden appearance-none bg-white bg-opacity-30 h-1 w-128 vertical-range" @input="setVolume">
              </div>
            </div>
            <img :src="`https://en-zo.dev/vue-videoplayer/volume-${Math.ceil(amount * 2)}.svg`" alt="High volume video" class="w-6 cursor-pointer relative" style="z-index: 2" @click="amount > 0 ? amount = 0 : amount = 1" @mouseenter="volume = true">
          </div>
          <img src="https://en-zo.dev/vue-videoplayer/maximize.svg" alt="Fullscreen" class="w-4 ml-3 cursor-pointer" @click="fullScreen">
        </div>
      </div>
      <div v-if="!autoplay && mask && time.current === 0" :class="`transition transform duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter z-10 flex items-center justify-center ${playing ? 'opacity-0 pointer-events-none' : ''}`">
        <div class="w-20 h-20 rounded-full bg-white bg-opacity-20 transition duration-200 hover:bg-opacity-40 flex items-center justify-center cursor-pointer">
          <img src="https://en-zo.dev/vue-videoplayer/play.svg" alt="Icon play video" class="transform translate-x-1 w-8" @click="play">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background: linear-gradient(0deg, #0000006b, transparent)
}
.vertical-range::-webkit-slider-thumb {
  width: 6px;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background-color: white;
  cursor: ns-resize;
  box-shadow: -405px 0 0 400px rgba(255, 255, 255, .6);
  border-radius: 50%;
}
.backdrop-filter {
  backdrop-filter: blur(15px);
}
.gradient-variable {
  --tw-gradient-from: #fbbf24;
  --tw-gradient-to: #ec4899;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(251, 191, 36, 0))
}
</style>
