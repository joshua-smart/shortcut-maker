let title, url;

chrome.tabs.query({active: true, currentWindow:true}, tabs => {
    title = tabs[0].title;
    url = tabs[0].url;

    document.querySelector('#title').innerHTML = `${title}`;
    document.querySelector('#url').innerHTML = `${url}`;


});

document.querySelector('#executeButton').addEventListener('click', () => {
    const content = `[InternetShortcut]\nURL=${url}`;
    download(`${title}.url`, content);
});

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
