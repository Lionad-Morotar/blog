/** Utils | Common Functions */

// TODO doc
function loadAssets(assets, config) {
    config = Object.assign(
        {
            delay: 0,
            method: 'sync',
            retryCount: 3
        },
        config
    )

    // 将资源按照 sort 字段排序
    const sortedAssets = Object.values(assets).sort((b, a) => (a.sort || 0) - (b.sort || 0))

    return new Promise((resolve, reject) => {
        Promise.all(
            sortedAssets.map(raw => {
                return new Promise((resolve, reject) => {
                    const { value, type, cb = () => {}, delay = 0 } = raw
                    const assetsType = type || 'image'
                    const cbWithDelay = (...args) => setTimeout(() => cb(...args), delay)

                    switch (assetsType) {
                        case 'image':
                            function loadImage() {
                                return new Promise((resolve, reject) => {
                                    const image = new Image()
                                    image.src = value
                                    image.onload = () => {
                                        resolve()
                                    }
                                    image.onerror = error => {
                                        reject(error)
                                    }
                                })
                            }
                            // 如果加载图片失败则尝试重新加载
                            function retryOnError(retryCount) {
                                loadImage()
                                    .then(_ => {
                                        resolve(cbWithDelay())
                                    })
                                    .catch(error => {
                                        if (retryCount > 0) {
                                            setTimeout(() => {
                                                retryOnError(retryCount - 1)
                                            }, 0)
                                        } else {
                                            reject('Image Load Error')
                                        }
                                    })
                            }
                            retryOnError(config.retryCount)
                            break
                        default:
                            throw new Error('Unknown required data type' + raw)
                    }
                })
                    .then(_ => resolve(_))
                    .catch(error => {
                        throw new Error(error)
                    })
            })
        )
            .then(_ => {
                console.log('All tasks done')
                resolve()
            })
            .catch(error => {
                console.log('All tasks done with error : ', error)
                reject()
            })
    })
}

export default {
    loadAssets
}
