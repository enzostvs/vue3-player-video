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
  <div id="app" style="width: 100vw; height: 100vh; background-color: black; display: flex; justify-content: center; align-items: center;">
    <div style="max-width: 50rem; margin: auto;">
      <video-player src="https://cdn.discordapp.com/attachments/639477330913394689/838839812340580352/zzozozoo.mp4" autoplay loop />
    </div>
    <div style="max-width: 50rem; margin: auto;">
      <video-player src="https://cdn.discordapp.com/attachments/639477330913394689/838839812340580352/zzozozoo.mp4" theme="gradient" autoplay loop />
    </div>
  </div>
</template>
