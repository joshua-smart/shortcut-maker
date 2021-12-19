function get_tab_info() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow:true}, tabs => {
            title = tabs[0].title;
            url = tabs[0].url;

            resolve([title, url]);
        });
    });
}

function assign_labels(title, url) {
    document.querySelector('#title').innerHTML = `${title}`;
    document.querySelector('#url').innerHTML = `${url}`;
}

function set_file_icon(url, validUrls) {
    for(validUrl of validUrls) {
        const re = new RegExp(`https?:\/\/${validUrl}.*`);
        if (!re.test(url)) continue;

        const cleanedUrl = validUrl.replace('/', '');
        const filepath = `icons/${cleanedUrl}.ico`;

        document.querySelector('#file-icon-img').src = filepath;
        document.querySelector('#file-icon').style.opacity = 1;

        return;
    }
}

function assign_download_callback(callback) {
    document.querySelector('#execute-button').addEventListener('click', () => {
        callback();
    });
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

async function main() {
    const [title, url] = await get_tab_info();
    assign_labels(title, url);

    assign_download_callback(() => {
        const content = `[InternetShortcut]\nURL=${url}\nIconFile=`
        download(`${title}.url`, content);
    });
}

main();
