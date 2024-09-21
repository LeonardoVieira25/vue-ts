import createTypedStore from ".";

export default createTypedStore({
    initState: {
        token: "",
    },
    mutationHandlers: {
        token: (state, payload) => payload
    }
})