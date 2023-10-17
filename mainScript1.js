alert("Website Is Still Being Built Not All Functionalities Are Added Wait For New Features.")
editor1 = ace.edit("editor1");
editor1.setTheme("ace/theme/monokai");
editor1.getSession().setMode("ace/mode/html");
editor1.getSession().setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css" src="style.css"></style>
</head>
<body>
    
    <script type="text/javascript" src="script.js"></script>
</body>
</html>`);

editor2 = ace.edit("editor2");
editor2.setTheme("ace/theme/monokai");
editor2.getSession().setMode("ace/mode/css");

editor3 = ace.edit("editor3");
editor3.setTheme("ace/theme/monokai");
editor3.getSession().setMode("ace/mode/javascript");

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
    editor1.setTheme(`${themes[i++]}`);
    editor2.setTheme(`${themes[i++]}`);
    editor3.setTheme(`${themes[i++]}`);
    if(i == n)
        i = 0;
}
var output = document.getElementById("output");
function updateoutput(){
    var code = editor1.getSession().getValue();
    output.contentDocument.open();
    output.contentDocument.write(code);
    output.contentDocument.close();
    }
editor1.getSession().addEventListener('change', updateoutput);

document.getElementById("check").addEventListener("click",function(){
    var ace_scrollbar = document.querySelectorAll(".ace_scrollbar-inner");
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
var editor1 = document.getElementById("editor1");
var editor2 = document.getElementById("editor2");
var editor3 = document.getElementById("editor3");
document.querySelector("#indexEditor").addEventListener("click", function(){
    editor1.style.display = "block";
    editor2.style.display = "none";
    editor3.style.display = "none";
})
document.querySelector("#styleEditor").addEventListener("click", function(){
    editor1.style.display = "none";
    editor2.style.display = "block";
    editor3.style.display = "none";
})
document.querySelector("#scriptEditor").addEventListener("click", function(){
    editor1.style.display = "none";
    editor2.style.display = "none";
    editor3.style.display = "block";
})