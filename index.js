/**
 * Created by fandonghan on 12/9/16.
 */
/**
 * Created by fandonghan on 11/11/16.
 */


function checkLetter()
{

    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123)
        || event.keyCode == 32)
        return true;
    else
    {
        alert("Please enter only letters");
        return false;

    }

}




function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var intervalID = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert("time is up!!");
            clearInterval(intervalID);
        }
    }, 1000);
}

function countDown(minutes) {
    var seconds = 60 * minutes,
        display = document.querySelector('#time');
    startTimer(seconds, display);
}

function initMap() {
    var uluru = {lat: 47.6062, lng: -122.3321};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}




function getStorage() {

    var storageImpl;

    try {
        localStorage.setItem("storage", "");
        localStorage.removeItem("storage");
        storageImpl = localStorage;
    }
    catch (err) {
        storageImpl = new LocalStorageAlternative();
    }

    return storageImpl;

}


function LocalStorageAlternative() {

    var structureLocalStorage = {};

    this.setItem = function (key, value) {
        structureLocalStorage[key] = value;
    }

    this.getItem = function (key) {
        if(typeof structureLocalStorage[key] !== "undefined" ) {
            return structureLocalStorage[key];
        }
        else {
            return null;
        }
    }

    this.removeItem = function (key) {
        structureLocalStorage[key] === "undefined";
    }
}

var fakeStorage = getStorage();

window.onload=function(){

    var id =fakeStorage.getItem("lastvisit");
    var lastvisit = "#"+id;
    var container = $("body").find(lastvisit);
    console.log(container);
    $('.maincontent').prepend(container);

}

function put(id){
    fakeStorage.setItem("lastvisit", id);
}


/*drag and drop*/
(function()
{
    if
    (
        !document.querySelectorAll
        ||
        !('draggable' in document.createElement('span'))
        ||
        window.opera
    )
    { return; }

    for(var
            items = document.querySelectorAll('[data-draggable="item"]'),
            len = items.length,
            i = 0; i < len; i ++)
    {
        items[i].setAttribute('draggable', 'true');
    }

    var item = null;

    document.addEventListener('dragstart', function(e)
    {

        item = e.target;
        e.dataTransfer.setData('text', '');

    }, false);

    document.addEventListener('dragover', function(e)
    {
        if(item)
        {
            e.preventDefault();
        }

    }, false);


    document.addEventListener('drop', function(e)
    {
        if(e.target.getAttribute('data-draggable') == 'target')
        {
            e.target.appendChild(item);

            e.preventDefault();
        }

    }, false);

    document.addEventListener('dragend', function(e)
    {
        item = null;

    }, false);

})();




