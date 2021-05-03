<template>
  <div class="shadow-xl rounded-3xl overflow-hidden relative" @mouseenter="hovered = true" @mouseleave="hovered = false" @keydown.left="$emit('play')">
    <div class="relative">
      <video
        :ref="uuid"
        class="w-full"
        :loop="loop"
        :autoplay="autoplay"
        :muted="autoplay"
        @timeupdate="$event => $emit('timeupdate', $event.target)"
        @pause="$emit('isPlaying', false)"
        @play="$emit('isPlaying', true)"
        @click="$emit('play')"
      >
        <source :src="src" type="video/mp4">
      </video>
      <div
        v-if="controls"
        :class="{ 'opacity-0 translate-y-full': !hoverable && hovered, 'opacity-0 translate-y-full': hoverable && !hovered }"
        class="absolute px-5 pb-5 bottom-0 left-0 w-full transition duration-300 transform"
      >
        <div class="w-full bg-black bg-opacity-30 px-5 py-4 rounded-xl flex items-center justify-between" @mouseleave="volume = false">
          <div class="font-sans py-1 px-2 text-white rounded-md text-xs mr-5 whitespace-nowrap font-medium w-32 text-center" :style="`font-size: 11px; background-color: ${color}`">
            {{ time.display }}&nbsp;/&nbsp;{{ duration }}
          </div>
          <div class="mr-5">
            <img v-show="playing" src="https://en-zo.dev/vue-videoplayer/basic/pause.svg" alt="Icon pause video" class="w-4 cursor-pointer filter-white transition duration-300" @click="$emit('play')">
            <img v-show="!playing" src="https://en-zo.dev/vue-videoplayer/basic/play.svg" alt="Icon play video" class="w-4 cursor-pointer filter-white transition duration-300" @click="$emit('play')">
          </div>
          <div class="w-full h-1 bg-white bg-opacity-40 rounded-sm cursor-pointer mr-6" @click="e => $emit('position', e)">
            <div class="w-full rounded-sm h-full bg-white pointer-events-none" :style="`width: ${time.progress}%; transition: width .2s ease-in-out;`" />
          </div>
          <div class="relative mr-6">
            <div :class="`w-128 origin-left translate-x-2 -rotate-90 w-128 transition duration-200 absolute transform top-0 py-2 ${volume ? '-translate-y-4' : 'opacity-0 -translate-y-1 pointer-events-none'}`">
              <div class="px-3 py-3 rounded-xl flex items-center transform translate-x-9 bg-black bg-opacity-30">
                <input v-model="amount" type="range" step="0.05" min="0" max="1" class="rounded-lg overflow-hidden appearance-none bg-white bg-opacity-30 h-1.5 w-128 vertical-range">
              </div>
            </div>
            <img :src="`https://en-zo.dev/vue-videoplayer/basic/volume_${Math.ceil(amount * 2)}.svg`" alt="High volume video" class="w-5 cursor-pointer filter-white transition duration-300 relative" style="z-index: 2" @click="stopVolume" @mouseenter="volume = true">
          </div>
          <img src="https://en-zo.dev/vue-videoplayer/basic/fullscreen.svg" alt="Fullscreen" class="w-4 cursor-pointer filter-white transition duration-300" @click="$emit('fullScreen')">
        </div>
      </div>
      <div v-if="!autoplay && mask && time.current === 0" :class="`transition transform duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter z-10 flex items-center justify-center ${playing ? 'opacity-0 pointer-events-none' : ''}`">
        <div class="w-20 h-20 rounded-full bg-white bg-opacity-20 transition duration-200 hover:bg-opacity-40 flex items-center justify-center cursor-pointer" @click="$emit('play')">
          <img src="https://en-zo.dev/vue-videoplayer/play.svg" alt="Icon play video" class="transform translate-x-0.5 w-12">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default /*#__PURE__*/defineComponent({
  name: 'BasicTheme', // vue component name
  props: {
    uuid: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    autoplay: {
      type: Boolean,
      required: true
    },
    loop: {
      type: Boolean,
      required: true
    },
    controls: {
      type: Boolean,
      required: true
    },
    hoverable: {
      type: Boolean,
      required: true
    },
    mask: {
      type: Boolean,
      required: true
    },
    colors: {
      type: [String, Array],
      required: true
    },
    time: {
      type: Object,
      required: true
    },
    playing: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      hovered: false,
      volume: false,
      amount: 1
    }
  },
  computed: {
    color () {
      if (typeof this.colors === 'string') {
        return this.colors ? this.colors : '#8B5CF6'
      }
      return this.colors?.[0] ? this.colors[0] : '#8B5CF6'
    }
  },
  mounted () {
    this.$emit('setPlayer', this.$refs[this.uuid])
  },
  methods: {
    setVolume () {
      this.$refs[this.uuid].volume = this.amount
    },
    stopVolume () {
      if (this.amount > 0) return this.amount = 0
      return this.amount = 1
    }
  }
})
</script>