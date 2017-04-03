var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;

$( document ).ready(function() {
    $("#home").hide();
});

function signIn() {
    console.log("sign in");
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        showHomePage();
        
        // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });
}

function showHomePage() {
        $("#login").hide();
        $("#home").show();
        alert("Welcome, " + user.displayName + "! Have a look around and see what's changed.");
        
}

function showLatest() {
    console.log("Latest feed");
};

function filterPosts() {
    console.log("Posts from other users");
};

function commentate() {
    location.href="commentate.html"
};



function postForm() {
    $("#postfield").on("change", function(event) {
    selectedFile = event.target.files[0];
    
});
    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/posts/' + filename);
    var message = document.getElementById("postfield").innerHTML;
    ref.putString(message).then(function(snapshot) {
        console.log("Uploaded a raw string");
    });
    var uploadTask = storageRef.put(selectedFile);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
            break;
            }
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
    });
};