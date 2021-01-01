function archiver(data) {

    for (ind in data) {
        let str = data[ind].addTime.toISOString().slice(0, 10)
        let arr = str.split('-')
        data[ind].addTime = arr
    }
    let arc = {}
    for (item of data) {
        let time = item.addTime
        if (!arc[time[0]]) {
            arc[time[0]] = {}
        }
        if (!arc[time[0]][time[1]]) {
            arc[time[0]][time[1]] = []
        }
        // if (!arc[time[0]][time[1]][time[2]]) {
        //     arc[time[0]][time[1]][time[2]] = []
        // }
        // arc[time[0]][time[1]][time[2]].push(item)
        arc[time[0]][time[1]].push(item)
        // return arc
    }
    return arc
}

module.exports = archiver