export const state = () => ({
    list: []
})

export const mutations = {
    add(state:any, item:number):void {
        if(state.list.length < 6) state.list.push(item);
    },

    remove(state:any, item:number):void {
        state.list.splice(item, 1);
    },

    changeList(state:any, newlist:Array<number>):void {
        state.list = newlist;
    }
}