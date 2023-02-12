javascript:
const referenced_site = "https://webllica.com/copy-text-to-clipboard/";
const version = "Ver.1.2";
const url = location.href;
const url_split = url.split("/", 3);
const fqdn = url_split[2];

const isAmazon = /amazon./.test(fqdn);
const isAliexpress = /aliexpress.com/.test(fqdn);
const isDLsite = /dlsite.com/.test(fqdn);
const isFanza = /dmm.co.jp/.test(fqdn);

let out_url = "";

if (isAmazon) {
    const out_fqdn = fqdn.slice(fqdn.search(/amazon./));
    let item_id;
    if (url.search(/\/dp\//) !== -1) {
        item_id = url.substr( url.search(/\/dp\//)+4, 10);
    } else if (url.search(/\/product\//) !== -1) {
        item_id = url.substr( url.search(/\/product\//)+9, 10);
    } else if (url.search(/\/ASIN\//) !== -1) {
        item_id = url.substr(url.search(/\/ASIN\//)+6, 10);
    } else {
        location.href = url + "&emi=AN1VRQENFRJN5";
        exit;
    }
    out_url = "https://" + out_fqdn + "/dp/" + item_id + "/";
}

if (isAliexpress) {
    const out_fqdn = fqdn.slice(fqdn.search(/aliexpress.com/));
    let item_id;
    if (url.search(/\/item\//) !== -1) {
        item_id = url.slice(url.search(/\/item\//)+1, url.search(/.html/)+5);
    } else {
        alert("The URL could not be shortened.");
        exit;
    }
    out_url = "https://" + out_fqdn + "/" + item_id;
}

if (isDLsite) {
    out_url = url.split('?')[0];
}

if (isFanza) {
    out_url = url.split('?')[0];
}

if (!(isAmazon || isAliexpress || isDLsite || isFanza)) {
    out_url = url;
}

let copyForm = document.createElement("textarea");
copyForm.textContent = out_url;

let bodyElm = document.getElementsByTagName("body")[0];
bodyElm.appendChild(copyForm);

copyForm.select();

const retVal = document.execCommand("copy");
bodyElm.removeChild(copyForm);

exit;
