const button = document.querySelector("#btn");
button.addEventListener("click",function(event){
    if(document.querySelector("#pass").value == "user@123" && document.querySelector("#uname").value == "user")
    {
        event.preventDefault();
        window.location.href = "./main.html";
    }
    else{
        alert("Wrong credentials");
    }
}
);
const Register = document.querySelector("#register");
Register.addEventListener("click",function(){
    window.location.href = "./Register.html";
}
);