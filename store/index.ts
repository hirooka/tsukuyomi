import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  program: undefined,
  ch: 1,
  m3u8: ''
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  program: state => state.program,
  ch: state => state.ch,
  m3u8: state => state.m3u8
}

export const mutations: MutationTree<RootState> = {
  setProgram: (state, program: any) => (state.program = program),
  setCh: (state, ch: number) => (state.ch = ch),
  setM3u8: (state, m3u8: string) => (state.m3u8 = m3u8)
}

export const actions: ActionTree<RootState, RootState> = {
  fetchProgram ({ commit }) {
    const program = this.$axios.$get('/api/...')
    commit('setProgram', program)
  }
}
