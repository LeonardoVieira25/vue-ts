import { createStore } from "vuex";

export function createTypedStore<T>(
  {
    initState,
    mutationHandlers

  }:
    {
      initState: T,
      mutationHandlers: {
        [K in keyof T]: (state: T, payload: any) => any
      }
    }
) {


  const store = createStore({
    state: initState,
    mutations: {
      setState: (state, payload: {
        key: keyof T,
        value: any
      }) => {
        const newValue = (mutationHandlers[payload.key] as (state: any, payload: any) => any)(state, payload.value)
        state[payload.key] = newValue
      }
    },
  })

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const methods = {} as {
    [key: string]: (value: any) => void;
  };

  Object.keys(initState as unknown as object).forEach(key => {
    const capitalizedKey = capitalize(key)
    methods[`set${capitalizedKey}`] = (value: any) => {
      store.commit("setState", { key, value })
    }

  })



  // * Colocando isso aqui no retorno do objeto, é possível setar os valores com: typedStore.set("token", "123")
  // set: (key: keyof T, value: any) => {
  //   store.commit("setState", { key, value })
  // }
  return {
    store,
    state: store.state,
    ...methods
  } as {
    store: typeof store,
    state: T
  } & {
      [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void
    }
}

export const typedStore = createTypedStore({
  initState: {
    token: "",
  },
  mutationHandlers: {
    token: (state, payload) => payload
  }
})