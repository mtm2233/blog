// 右侧导航tree
function menus(data) {
    if (data.length == 0) {
        return
    }
    let type = {}, tree = {}
    for (item of data) {
        if (!type[item.parentId]) {
            type[item.parentId] = [];
        }
        type[item.parentId].push(item)
    }
    tree = type[0];
    //递归实现添加children节点
    function addChildren(tree, type) {
        let item
        for (item of tree) {
            let typeId = item.typeId;
            for (let index in type) {
                if (typeId == index) {
                    item.children = type[index];
                    break;
                }
            }
            if (item.children) {
                addChildren(item.children, type);
            }
        }
    }
    addChildren(tree, type);
    return tree
}
function renderTime(data) {
    for (index in data) {
        let dateee = new Date(data[index].replyTime).toJSON();
        let dates = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        data[index].replyTime = dates
    }
    return data
}
// 评论tree
function reply(data) {
    if (data.length == 0) {
        return
    }
    renderTime(data)
    let type = {}, tree = {}
    for (item of data) {
        if (!type[item.parentId]) {
            type[item.parentId] = [];
        }
        type[item.parentId].push(item)
    }
    tree = type[0];
    //递归实现添加children节点
    function addChildren(tree, type) {
        let item
        for (item of tree) {
            let typeId = item.replyId;
            for (let index in type) {
                if (typeId == index) {
                    item.children = type[index];
                    break;
                }
            }
            if (item.children) {
                addChildren(item.children, type);
            }
        }
    }
    addChildren(tree, type);
    return tree
}
module.exports = { menus, reply, renderTime }