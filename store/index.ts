export const state = () => ({
    list: []
})

export const mutations = {
    add(state:any, item:number):void {
        if(state.list.length < 6) {
            state.list.push(item);
        }
        localStorage.list = state.list
        console.log(localStorage.list)
    },

    remove(state:any, item:number):void {
        state.list.splice(item, 1);
        localStorage.list = state.list
    },

    changeList(state:any, newlist:Array<number>):void {
        state.list = newlist;
        localStorage.list = state.list
    }
}