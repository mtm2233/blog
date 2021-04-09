function archiver(val) {
    const data = val.map(v => ({
        ...v,
        addTime: v.addTime.toISOString().slice(0, 10).split('-').map(time => `${time} `)
    }));
    const filData = {};
    data.forEach(v => {
        let [y, m] = v.addTime;
        if (!(filData[y])) {
            filData[y] = {}
        }
        if (!(filData[y][m])) {
            filData[y][m] = [];
        }
        filData[y][m].push(v);
    })
    return filData;
}

module.exports = archiver