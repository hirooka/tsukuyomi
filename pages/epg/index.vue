<template>
  <div>
    <h1>EPG</h1>
    <h2>{{date}}</h2>
    <v-data-table
      :headers="headers"
      :items="programs"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import logger from '~/plugins/logger'
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/api/v1/programs/now'
    const response = await app.$axios.get(path, { auth: { username: app.$config.tsServerUsername, password: app.$config.tsServerPassword } })
    logger.debug(response)
    const data = response.data.map((ele) => {
      const begin = dayjs(ele.begin).format('HH:mm')
      ele.begin = begin
      const end = dayjs(ele.end).format('HH:mm')
      ele.end = end
      return ele
    })
    return {
      programs: data
    }
  },
  data () {
    const today = dayjs().format('YYYY-MM-DD (ddd)')
    return {
      date: today,
      headers: [
        { text: 'CH', value: 'channelRemoteControl' },
        { text: '番組', value: 'title' },
        { text: '開始', value: 'begin' },
        { text: '終了', value: 'end' }
      ]
    }
  }
})
</script>
