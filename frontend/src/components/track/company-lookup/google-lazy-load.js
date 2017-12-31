

if(window.google === undefined || window.google.maps === undefined) {
    elements.push({
        scope: scope,
        element: element,
        savedHtml: savedHtml[elements.length],
    });


    window.lazyLoadCallback = function () {
        console.log('Google maps script loaded:', mapsUrl);
        $timeout(function () { /* give some time to load */
                /* do thing once loaded */
        }, 100);
    };

    var scriptEl = document.createElement('script');
    console.log('Prelinking script loaded,' + src);

    scriptEl.src = mapsUrl +
        (mapsUrl.indexOf('?') > -1 ? '&' : '?') +
        'callback=lazyLoadCallback';

    if (!document.querySelector('script[src="' + scriptEl.src + '"]')) {
        document.body.appendChild(scriptEl);
    }
}