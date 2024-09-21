import createTypedStore from ".";

export default createTypedStore({
    initState: {
        token: "",

        posts: [] as Array<{
            id: number,
            title: string,
            body: string,
            userId: number
        }>,
    },
    mutationHandlers: {
        token: (state, payload) => payload,
        posts: (state, payload) => payload
    },
    actionHandlers: {
        logIn: async (state) => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!res.ok) {
                state.token = ""
                throw new Error("Network response was not ok");
            }
            state.token = "123"
            const data = await res.json();
            state.posts = data;

        },
        logOut: async (state) => {
            state.token = ""
        }
    }
})