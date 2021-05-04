<script>
import { defineComponent } from 'vue';
import gradient from '@/themes/Gradient.vue'
import basic from '@/themes/Basic.vue'

export default /*#__PURE__*/defineComponent({
  name: 'Vue3PlayerVideo', // vue component name
  components: { basic, gradient },
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
    colors: {
      type: [String, Array],
      default () {
        return ['#8B5CF6', '#ec4899']
      }
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'basic'
    }
  },
  data () {
    return {
      uuid: Math.random().toString(36).substr(2, 18),
      player: null,
      duration: 0,
      playing: false,
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
    setPlayer (e) {
      this.player = e
      this.player.addEventListener('loadeddata', () => {
        if(this.player.readyState >= 3){
          this.duration = this.format(Number(this.player.duration))
          this.time.display = this.format(0)
        }
      })
    },
    stop () {
      this.player.pause()
      this.player.currentTime = 0
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
  },
})
</script>

<template>
  <div class="vue3-player-video">
    <component
      :is="theme"
      :uuid="uuid"
      :src="src"
      :autoplay="autoplay"
      :loop="loop"
      :controls="controls"
      :mask="mask"
      :colors="colors"
      :time="time"
      :playing="playing"
      :duration="duration"
      :hoverable="hoverable"
      @play="play"
      @stop="stop"
      @timeupdate="({ currentTime }) => time.current = currentTime"
      @position="position"
      @fullScreen="fullScreen"
      @setPlayer="setPlayer"
      @isPlaying="isPlaying"
    />
    
  </div>
</template>

<style>
@import './assets/tailwind.css';
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
  backdrop-filter: blur(15px) !important;
}
.filter-white:hover {
  filter: brightness(2);
}
.gradient-variable {
  --tw-gradient-from: #fbbf24;
  --tw-gradient-to: #ec4899;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(251, 191, 36, 0))
}

</style>
