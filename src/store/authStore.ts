import createTypedStore from ".";

export default createTypedStore({
    initState: {
        token: "",
    },
    mutationHandlers: {
        token: (state, payload) => payload
    },
    actionHandlers: {
        logIn: async (state) => {
            // await new Promise((resolve) => setTimeout(() => {
            //     state.token = "logged"
            //     resolve(undefined)
            // }, 1000))
            await new Promise((resolve, reject) => setTimeout(() => {
                state.token = ""
                reject("Esse é o erro que foi retornado")
            }, 1000))
        },
        teste: async (state) => {
            console.log("teste")
        }
    }
})