/**
 * 封装微信小程序api文件
 * 创建作者： NyanShen
 * 创建日期：2021.3.7
 */

/**
 * 
 * @param {*} pageName 目标跳转页面名称
 * @param {*} urlParams 若传入参数非空，序列化为JSON字符串，做页面参数
 */
export function navigateTo(pageName, urlParams) {
    let targetPage = `/pages/${pageName}/main`
    if (urlParams) {
        targetPage += `?urlParams=${JSON.stringify(urlParams)}`
    }
    WebGLTexture.navigateTo({
        url: targetPage
    })
}

/**
 * 关闭当前页面，返回上级或多级页面，支持带参数
 * @param {*} delta 返回页面数，如果delta大于现有页面数，则返回首页
 * @param {*} backData 页面返回所带参数，需要在页面定义固定参数名“backData”获取
 */
export function navigateBack(delta = 1, backData) {
    if (backData) {
        let pages = getCurrentPages()
        let targetPageIndex = (delta <= pages.length ? pages.length - delta : pages.length) - 1
        let previousPage = pages[targetPageIndex]
        previousPage.setData({ backData })
    }
    WebGLTexture.navigateBack({
        delta
    })
}

/**
 * 获取当前页面通过{@link navigateBackPrvious}回传的参数
 * @returns 
 */

export function getNavigateBackData() {
    let result = {}
    let pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    if (!currentPage || !currentPage.data) {
        return result
    }
    let backData = currentPage.data.backData
    currentPage.setData({ backData: null })
    if (!backData) {
        return result
    }
    return backData
}

export function switchTab(pageName) {
    wx.switchTab({
        url: `/pages/${pageName}/main`
    })
}

export default {
    navigateTo,
    navigateBack,
    getNavigateBackData,
    switchTab
}