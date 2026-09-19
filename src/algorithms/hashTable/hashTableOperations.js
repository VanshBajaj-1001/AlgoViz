function hash(key, size) {
    return key % size
}
function insert(table, key, value) {
    const steps = []
    const newTable = table.map(bucket => [...bucket])
    const index = hash(key, newTable.length)
    steps.push({
        type: "hash",
        key,
        index
    })
    const bucket = newTable[index]
    const existing = bucket.find(item => item.key === key)
    if (existing) {
        existing.value = value
        steps.push({
            type: "update",
            index,
            key
        })
    } else {
        bucket.push({
            key,
            value
        })
        steps.push({
            type: "insert",
            index,
            key
        })
    }
    return {
        table: newTable,
        steps
    }
}
function search(table, key) {
    const steps = []
    const index = hash(key, table.length)
    steps.push({
        type: "hash",
        key,
        index
    })
    const bucket = table[index]
    for (let i = 0; i < bucket.length; i++) {
        steps.push({
            type: "compare",
            index,
            bucketIndex: i,
            key: bucket[i].key
        })
        if (bucket[i].key === key) {

            steps.push({
                type: "found",
                index,
                bucketIndex: i,
                key
            })
            return {
                table,
                steps
            }
        }
    }
    steps.push({
        type: "notFound",
        index,
        key
    })
    return {
        table,
        steps
    }
}
function deleteKey(table, key) {
    const steps = []
    const newTable = table.map(bucket => [...bucket])
    const index = hash(key, newTable.length)
    steps.push({
        type: "hash",
        key,
        index
    })
    const bucket = newTable[index]
    const bucketIndex = bucket.findIndex(
        item => item.key === key
    )
    if (bucketIndex === -1) {
        steps.push({
            type: "notFound",
            index,
            key
        })
        return {
            table: newTable,
            steps
        }
    }
    bucket.splice(bucketIndex, 1)
    steps.push({
        type: "delete",
        index,
        bucketIndex,
        key
    })
    return {
        table: newTable,
        steps
    }
}
function clearTable(table) {
    const steps = []
    steps.push({
        type: "clear"
    })
    const newTable = table.map(() => [])
    return {
        table: newTable,
        steps
    }
}
export {
    hash,
    insert,
    search,
    deleteKey,
    clearTable
}