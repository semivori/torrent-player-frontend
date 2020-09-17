import axios from "axios"

const torrentInstans = axios.create({
    baseURL: 'http://localhost:8080/',
})

const torrentAxios = {
    info: infoHash => torrentInstans.get(`/info?torrentId=${infoHash}`).then(res => {
        const data = res.data
        if (data.files) {
            data.files = data.files.map(item => {
                return {
                    ...item,
                    source: makeServePath(data.infoHash, item.index)
                }
            })
        }

        return new Promise((resolve, reject) => {
            resolve({
                ...res,
                data: data
            })
        })
    }),
}

const makeServePath = (infoHash, fileIndex = null) => {
    let path = `http://localhost:8080/serve/${infoHash}`

    if (fileIndex) {
        path += `?fileIndex=${fileIndex}`
    }

    return path
}

const rutorInstans = axios.create({
    baseURL: 'http://localhost:8080/rutor',
})

const rutorAxios = {
    search: needle => rutorInstans.get(`/search?search=${needle}`),
    history: () => rutorInstans.get(`/history`),
    delHistory: id => rutorInstans.delete("/history", {
        params: { id: id }
    }),
}

const playerInstans = axios.create({
    baseURL: 'http://localhost:8080/player',
})

const playerAxios = {
    history: () => playerInstans.get(`/history`),
    delHistory: id => playerInstans.delete("/history", {
        data: { id: id }
    }),
    saveTime: (file, time) => {
        const params = new URLSearchParams();
        params.append('file', JSON.stringify(file));
        params.append('time', time);

        playerInstans.get(`/save-time`, {
            params: params
        })
    },
}

export {
    torrentAxios,
    rutorAxios as rutor,
    playerAxios as player,
    makeServePath
}