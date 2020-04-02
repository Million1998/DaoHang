const $siteList = $('.siteList')
const $addButton = $('.addButton')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'B', url: 'https://www.bilibili.com' },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('.site').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
                    <li class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon" aria-hidden="true">
                                 <use xlink:href="#icon-baseline-close-px"></use>
                             </svg>
                        </div>
                    </li>
                `
        ).insertBefore($addButton)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址?')
        if (url.indexOf('https') !== 0) {
            url = 'https://www.' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    const hashMapString = JSON.stringify(hashMap)
    localStorage.setItem('x', hashMapString)
}

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})