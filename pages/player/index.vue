<template>
  <div>
    <h1>Player</h1>
    <a href="/epg">EPG</a>
    <h2>{{ ch }}</h2>
    <video ref="video" width="100%" height="640" controls />
    <v-btn
      elevation="2"
      @click="stopButtonEvent"
    >
      STOP
    </v-btn>
  </div>
</template>

<script lang="ts">
import Hls from 'hls.js'
import Vue from 'vue'
import logger from '~/plugins/logger'
import { getters } from '~/store'
export default Vue.extend({
  async asyncData ({ app, store, $config }) {
    const ch = store.getters.ch as ReturnType<typeof getters.ch>
    const path = '/api/v1/izanami/start'
    const user = $config.hlsServerUsername
    const json = {
      streamingType: 'TUNER',
      playlistType: 'LIVE',
      transcodingSettings: 'HD_HIGH',
      canEncrypt: false,
      channelRemoteControl: ch,
      fileName: '',
      videoResolution: null,
      videoBitrate: '0',
      audioBitrate: 0,
      username: user
    }
    const response = await app.$axios.$post(path, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    logger.debug(response)
    store.commit('setM3u8', response.uri)
    return {
      ch,
      m3u8: response.uri
    }
  },
  mounted () {
    const ch = this.$store.getters.ch as ReturnType<typeof getters.ch>
    const program = this.$store.getters.program as ReturnType<typeof getters.program>
    logger.debug(`${ch}: ${JSON.stringify(program)}`)
    const video = this.$refs.video
    // const playlist = 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/gear4/prog_index.m3u8'
    const path = this.$store.getters.m3u8 as ReturnType<typeof getters.m3u8>
    const playlist = path
    const hls = new Hls()
    hls.loadSource(playlist)
    hls.attachMedia(<HTMLMediaElement>video)
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      (<HTMLMediaElement>video).play()
    })
  },
  methods: {
    async stopButtonEvent () {
      const path = '/api/v1/izanami/stop'
      const response = await this.$axios.get(path)
      logger.debug(JSON.stringify(response.data))
    }
  }
})
</script>
