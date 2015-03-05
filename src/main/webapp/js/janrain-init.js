(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};

    janrain.settings.tokenUrl = 'http://counted.it/janrain/token';
    //janrain.settings.tokenUrl = 'http://localhost:8080/janrain/token';

    function isReady() {
        janrain.ready = true;
    };

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
        window.attachEvent('onload', isReady);
    }

    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.id = 'janrainAuthWidget';

    if (document.location.protocol === 'https:') {
        e.src = '/js/engage.js';
    } else {
        e.src = '/js/engage.js';
    }


    janrain.settings.width = "200";
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);



})();

function janrainWidgetOnload() {

    janrain.events.onProviderLoginComplete.addHandler(function() {
    });

}