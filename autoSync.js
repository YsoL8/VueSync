$(document).ready(function() {

    let lastLocalValue = -1;
    let syncApp = new Vue({
        el: '#wrapper',
        data: {
            result: 0
        },
        watch: {
            result: function(newValue, oldValue) {
                let elem = $('#trace');

                if (oldValue == lastLocalValue) {
                    elem.append('<p>Synced from local '+newValue+' (simulated POST).</p>');
                }
            }
        }
    });

    $('#localData').keypress(function() {
        lastLocalValue = $(this).val();
    });

    //pretend to watch a periodically emitting service
    setInterval(function() {
        /*
            this is in fact hard mode.
            Any sensible application will apply its state changes directly to Vue's data object
            However I wanted to have two distinct on page data sources just to prove syncing works very clearly
         */
        let elem = $('#remoteData');
        elem.val(getRandomInt(10000));

        let e = document.createEvent('HTMLEvents');
        e.initEvent('input', true, true); //trigger Vue to notice this strange roundabout implementation
        elem[0].dispatchEvent(e);

        /*
            And the easy mode, at all sensible version of the above
         */
        //syncApp.result = getRandomInt(10000);

        $('#trace').append('<p>Synced from remote. (got value '+syncApp.result+'), simulated GET.</p>');
    }, 5000);

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

});