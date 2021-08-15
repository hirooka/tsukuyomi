<template>
  <div>
    <h1>EPG</h1>
    <h2>{{ date }}</h2>
    <v-data-table
      :headers="headers"
      :items="programs"
      :items-per-page="10"
      class="elevation-1"
      @click:row="clickEvent"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import logger from '~/plugins/logger'
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/api/v1/programs/now'
    const response = await app.$axios.get(path)
    logger.debug(response)
    const data = response.data.map((ele: any) => {
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
  },
  methods: {
    clickEvent (selected: any) {
      this.$store.commit('setProgram', selected)
      this.$store.commit('setCh', selected.channelRemoteControl)
      this.$router.push('/player')
    }
  }
})
</script>
