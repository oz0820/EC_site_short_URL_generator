javascript:
/*
APP_VERSION: 2.1
Github_Rep: https://github.com/oz0820/EC_site_short_URL_generator
referenced_site: https://webllica.com/copy-text-to-clipboard/
*/
(function () {
    const url = new URL(location.href)
    const url_raw = location.href
    const hostname = url.hostname
    const path = url.pathname

    const isAmazon = !!hostname.match(/amazon./)
    const isAliexpress = !!hostname.match(/aliexpress.com/)
    const isDLsite = !!hostname.match(/dlsite.com/)
    const isFanza = !!hostname.match(/dmm.co.jp/)

    let out_url = ''

    if (isAmazon) {
        const slim_hostname = hostname.slice(hostname.search(/amazon./))
        let item_id
        if (!!path.match(/\/dp\//)) {
            item_id = path.match(/\/dp\/[A-Z0-9]+\//)[0].slice('/dp/'.length, -1)
        } else if (!!path.match(/\/product\//)) {
            item_id = path.match(/\/product\/[A-Z0-9]+\//)[0].slice('/product/'.length, -1)
        }else if (!!path.match(/\/ASIN\//)) {
            item_id = path.match(/\/ASIN\/[A-Z0-9]+\//)[0].slice('/ASIN/'.length, -1)
        } else {
            location.href = url + "&emi=AN1VRQENFRJN5"
            return
        }
        out_url = url.protocol + '//' + slim_hostname + "/dp/" + item_id
        if (url.searchParams.has('smid')) {
            out_url += '?smid=' + url.searchParams.get('smid')
        }
    }

    if (isAliexpress) {
        if (!!url_raw.match(/\/item\//)) {
            out_url = url.origin + url.pathname
        } else {
            alert("The URL could not be shortened.")
            return
        }
    }

    if (isDLsite) {
        out_url = url.origin + url.pathname
    }

    if (isFanza) {
        out_url = url.origin + url.pathname
    }

    if (!(isAmazon || isAliexpress || isDLsite || isFanza)) {
        out_url = url_raw
    }

    // copy to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = out_url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
})
();