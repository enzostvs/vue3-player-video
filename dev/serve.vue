<script>
import { defineComponent } from 'vue';
import VideoPlayer from '@/vue3-player-video.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VideoPlayer
  }
});
</script>

<template>
  <div id="app" class="py-20 w-screen h-screen flex items-center justify-center bg-gray-900">
    <div class="max-w-xl mx-auto">
      <video-player src="https://cdn.discordapp.com/attachments/700797706561388544/838421115897774090/video.mp4" />
    </div>
  </div>
</template>
