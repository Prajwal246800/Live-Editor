alert("Website Is Still Being Built Not All Functionalities Are Working Wait For Updates.");
var htmlEditor = ace.edit("htmlEditor");
htmlEditor.getSession().setMode("ace/mode/html");
htmlEditor = ace.edit("htmlEditor");
htmlEditor.setTheme("ace/theme/monokai");
htmlEditor.getSession().setMode("ace/mode/html");
htmlEditor.getSession().setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`);
var cssEditor = ace.edit("cssEditor");
cssEditor.getSession().setMode("ace/mode/css");
cssEditor.setTheme("ace/theme/monokai");
var jsEditor = ace.edit("jsEditor");
jsEditor.getSession().setMode("ace/mode/javascript");
jsEditor.setTheme("ace/theme/monokai");
var output = document.getElementById("output")

function updateoutput(){
    var htmlCode = htmlEditor.getValue();
    var cssCode = cssEditor.getValue();
    var jsCode = jsEditor.getValue();
    output.contentDocument.open();
    output.contentDocument.write(htmlCode);
    output.contentDocument.close();
    var styleElement = document.createElement('style');
    styleElement.innerHTML = cssCode;
    output.contentDocument.head.appendChild(styleElement);
    var scriptElement = document.createElement('script');
    scriptElement.innerHTML = jsCode;
    output.contentDocument.body.appendChild(scriptElement);
    console.log(htmlCode);
}
htmlEditor.getSession().on('change', updateoutput);
cssEditor.getSession().on('change', updateoutput);
jsEditor.getSession().on('change', updateoutput);

document.getElementById("check").addEventListener("click",function(){
    var ace_scrollbar = document.querySelectorAll(".ace_scrollbar-inner");
    console.log(ace_scrollbar)
    if(ace_scrollbar[1].style.display == "none"){
        setTimeout(()=>{
            ace_scrollbar[1].style.display = "block";
        },500);
    }
    else
    {
        ace_scrollbar[1].style.display = "none";
    }
});

var htmlEdit = document.getElementById("htmlEditor");
var cssEdit = document.getElementById("cssEditor");
var jsEdit = document.getElementById("jsEditor");
document.querySelector("#indexEditor").addEventListener("click", function(){
    htmlEdit.style.display = "block";
    cssEdit.style.display = "none";
    jsEdit.style.display = "none";
})
document.querySelector("#styleEditor").addEventListener("click", function(){
    htmlEdit.style.display = "none";
    cssEdit.style.display = "block";
    jsEdit.style.display = "none";
})
document.querySelector("#scriptEditor").addEventListener("click", function(){
    htmlEdit.style.display = "none";
    cssEdit.style.display = "none";
    jsEdit.style.display = "block";
})

var themes = [
    "ace/theme/ambiance",
    "ace/theme/chaos",
    "ace/theme/chrome",
    "ace/theme/clouds",
    "ace/theme/clouds_midnight",
    "ace/theme/cobalt",
    "ace/theme/crimson_editor",
    "ace/theme/dawn",
    "ace/theme/dracula",
    "ace/theme/dreamweaver",
    "ace/theme/eclipse",
    "ace/theme/github",
    "ace/theme/gob",
    "ace/theme/gruvbox",
    "ace/theme/idle_fingers",
    "ace/theme/iplastic",
    "ace/theme/katzenmilch",
    "ace/theme/kr_theme",
    "ace/theme/kuroir",
    "ace/theme/merbivore",
    "ace/theme/merbivore_soft",
    "ace/theme/monokai",
    "ace/theme/pastel_on_dark",
    "ace/theme/solarized_dark",
    "ace/theme/solarized_light",
    "ace/theme/sqlserver",
    "ace/theme/terminal",
    "ace/theme/textmate",
    "ace/theme/tomorrow",
    "ace/theme/tomorrow_night",
    "ace/theme/tomorrow_night_blue",
    "ace/theme/tomorrow_night_bright",
    "ace/theme/tomorrow_night_eighties",
    "ace/theme/twilight",
    "ace/theme/vibrant_ink",
    "ace/theme/xcode"
];
var n = 36 , i = 0;
document.getElementById("changeTheme").addEventListener("click",changeTheme);
function changeTheme(){
    htmlEditor.setTheme(`${themes[i]}`);
    cssEditor.setTheme(`${themes[i]}`);
    jsEditor.setTheme(`${themes[i++]}`);
    if(i == n)
        i = 0;
    
}