const button = document.querySelector("#btn");
button.addEventListener("click",function(){
    if(document.querySelector("#pass").value == "user@123" && document.querySelector("#uname").value == "user")
    {
        window.open("./main.html");
    }
    else{
        alert("Wrong credentials");
    }
}
);
const Register = document.querySelector("#register");
Register.addEventListener("click",function(){
    window.open("./Register.html");
}
);