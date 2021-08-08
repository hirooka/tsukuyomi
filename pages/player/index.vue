<template>
  <div>
    <h1>Player</h1>
    <a href="/epg">EPG</a>
    <video ref="video" width="100%" height="640" controls></video>
  </div>
</template>

<script lang="ts">
import Hls from 'hls.js'
import Vue from 'vue'
export default Vue.extend({
  mounted () {
    const video = this.$refs.video
    const playlist = 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/gear4/prog_index.m3u8'
    const hls = new Hls()
    hls.loadSource(playlist)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play()
    })
  }
})
</script>
