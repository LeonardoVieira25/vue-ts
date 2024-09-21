
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    count: number,
    token: string,
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}