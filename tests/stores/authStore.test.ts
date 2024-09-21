

import authStore from "../../src/store/authStore";

beforeEach(async () => {
    await authStore.logIn()
    expect(authStore.state.token).toBeTruthy()
})



describe("authStore", () => {
    test("logIn", async () => {
        expect(authStore.state.posts.length).toBeGreaterThan(0)
    })
    test("logOut", async () => {
        await authStore.logOut()
        expect(authStore.state.token).toBeFalsy()
    })
    test("logIn error", async () => {
        await authStore.logOut()
        try {
            await authStore.logIn()
        } catch (error) {
            expect(authStore.state.token).toBeFalsy()
        }
    })
    test("logOut error", async () => {
        try {
            await authStore.logOut()
        } catch (error) {
            expect(authStore.state.token).toBeTruthy()
        }
    })
})

