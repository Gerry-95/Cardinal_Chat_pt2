var provider = new firebase.auth.GoogleAuthProvider();
var user;
var yourpost = document.getElementById("postfield");
var submitBtn = document.getElementById("submitBtn");
var firebaseRef = firebase.database();

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
        
        retrieveUserInfo();
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
    
};

function showHomePage() {
    $("#login").hide();
    $("#home").show();
    alert("Welcome, " + user.displayName + "! Have a look around and see what's changed.");
    firebase.database().ref('Users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
    });
        
}

function retrieveUserInfo() {
    $('#userName').text("" + user.displayName + "");
}

function showLatest() {
    console.log("Latest feed");
};

function filterPosts() {
    console.log("Posts from other users");
};

function commentate() {
    location.href="commentate.html"
    retrieveUserInfo();
};



function writeNewPost() {
    
    console.log("Send data to firebase")
    var postTitle = document.getElementById("postTitle").value;
    var postContent = document.getElementById("postContent").value;
    
    firebaseRef.ref().child(postTitle).set(postContent);
    console.log(postTitle)
    
    var newPost = document.createElement("li");
    document.getElementById("stream-items-id").appendChild(newPost)
    
    var h1 = document.createElement("h1");
    newPost.appendChild(h1);
    
    var p = document.createElement("p")
    newPost.appendChild(p);
    
    h1.innerHTML = postTitle;
    p.innerHTML = postContent;
};