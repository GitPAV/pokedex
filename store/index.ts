export const state = () => ({
    list: []
})

export const mutations = {
    add(state:any, item:number) {
        console.log('pkm list before:', state.list)

        if(state.list.length < 6) {
            console.log("ne contient pas")
            state.list.push(item)
        }


        console.log('pkm list after:', state.list)
    }
}