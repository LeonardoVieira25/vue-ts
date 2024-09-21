import { createStore } from "vuex";

export default function createTypedStore<T, A extends {
  [key: string]: (state: T) => Promise<void>
}>(
  {
    initState,
    mutationHandlers,
    actionHandlers
  }:
    {
      initState: T,
      mutationHandlers: {
        [K in keyof T]: (state: T, payload: any) => any
      },
      actionHandlers: A
    }
) {

  console.log("actionHandlers")
  console.log(actionHandlers)


  type StateType = T & {
    actionState: {
      [A in keyof typeof actionHandlers]: "loading" | "success" | "error";
    },
    actionError: {
      [A in keyof typeof actionHandlers]: unknown;
    }
  }



  const store = createStore({
    state: { ...initState, actionState: {}, actionError: {} } as StateType,
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

  console.log("actionHandlers")

  console.log(actionHandlers)

  actionHandlers && Object.keys(actionHandlers as unknown as object).forEach(key => {
    methods[key] = async () => {
      store.state.actionState[key as keyof A] = "loading"

      try {
        await actionHandlers[key](store.state);
        store.state.actionState[key as keyof A] = "success";
      } catch (error) {
        store.state.actionState[key as keyof A] = "error";
        store.state.actionError[key as keyof A] = error;

      }
    }
  })



  return {
    store,
    state: store.state,
    ...methods
  } as unknown as {
    store: typeof store,
    state: StateType
  } & {
      [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
    } & {
      [K in keyof A]: () => Promise<void>;
    }
}