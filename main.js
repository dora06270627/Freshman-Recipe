/**
 * Created by fandonghan on 11/11/16.
 */

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


/* create account*/



function store() {

    var addUser = document.getElementById('create_username');
    var pw = document.getElementById('create_password');

    localStorage.setItem('create_username', addUser.value);
    localStorage.setItem('create_password', pw.value);

}


function check() {
    var url = window.location.pathname;
    var storedName = localStorage.getItem('create_username');
    var storedPw = localStorage.getItem('create_password');



    var userName = document.getElementById('username');
    var userPw = document.getElementById('userpassword');

    if( userName.value == storedName || userPw.value == storedPw) {
        alert('You are loged in.');
        window.location.href = "index.html";

    }else {
        alert('ERROR');
    }
}

// recipe recommandation
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
        if(typeof structureLocalStorage[key] != 'undefined' ) {
            return structureLocalStorage[key];
        }
        else {
            return null;
        }
    }

    this.removeItem = function (key) {
        structureLocalStorage[key] = undefined;
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
