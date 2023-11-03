alert("Website Is Still Being Built Not All Functionalities Are Working Wait For Updates.");


//Create 3 Editors For Typing HTML , CSS and JavaScript Code...
var htmlEditor = ace.edit("htmlEditor");
htmlEditor.getSession().setMode("ace/mode/html");
htmlEditor.setTheme("ace/theme/monokai");
htmlEditor.getSession().setMode("ace/mode/html");
htmlEditor.getSession().setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <script src="script.js"></script>
</body>
</html>`);
var cssEditor = ace.edit("cssEditor");
cssEditor.getSession().setMode("ace/mode/css");
cssEditor.setTheme("ace/theme/monokai");
var jsEditor = ace.edit("jsEditor");
jsEditor.getSession().setMode("ace/mode/javascript");
jsEditor.setTheme("ace/theme/monokai");
var output = document.getElementById("output")


//To Produce Live Output Of The Written Code...
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
}
htmlEditor.getSession().on('change', updateoutput);
cssEditor.getSession().on('change', updateoutput);
jsEditor.getSession().on('change', updateoutput);


//To Prevent The Horizontal Scrollbar Displaying On The Menu Bar...
document.getElementById("check").addEventListener("click",function(){
    var ace_scrollbar = document.querySelectorAll(".ace_scrollbar-inner");
    console.log(ace_scrollbar)
    if(ace_scrollbar[1].style.display == "none"){
        clearTimeout();
        setTimeout(()=>{
            ace_scrollbar[1].style.display = "block";
        },500);
    }
    else
    {
        clearTimeout();
        ace_scrollbar[1].style.display = "none";
    }
});


//Toggle Between Editors...
var htmlEdit = document.getElementById("htmlEditor");
var cssEdit = document.getElementById("cssEditor");
var jsEdit = document.getElementById("jsEditor");
const indexEditor = document.querySelector("#indexEditor");
const styleEditor = document.querySelector("#styleEditor");
const scriptEditor = document.querySelector("#scriptEditor");
const tagSuggestions = document.querySelector("#tagSuggestions");
indexEditor.addEventListener("click", function(){
    htmlEdit.style.display = "block";
    cssEdit.style.display = "none";
    jsEdit.style.display = "none";
    if(tagSuggestions.style.display == "block")
        tagSuggestions.style.display = "block";
    indexEditor.classList.add("active");
    if (scriptEditor.classList.contains("active")) {
        scriptEditor.classList.remove("active");
    }
    if (styleEditor.classList.contains("active")) {
        styleEditor.classList.remove("active");
    }
})
styleEditor.addEventListener("click", function(){
    htmlEdit.style.display = "none";
    cssEdit.style.display = "block";
    jsEdit.style.display = "none";
    tagSuggestions.style.display = "none";
    styleEditor.classList.add("active");
    if (scriptEditor.classList.contains("active")) {
        scriptEditor.classList.remove("active");
    }
    if (indexEditor.classList.contains("active")) {
        indexEditor.classList.remove("active");
    }
})
document.querySelector("#scriptEditor").addEventListener("click", function(){
    htmlEdit.style.display = "none";
    cssEdit.style.display = "none";
    jsEdit.style.display = "block";
    tagSuggestions.style.display = "none";
    scriptEditor.classList.add("active");
    if (indexEditor.classList.contains("active")) {
        indexEditor.classList.remove("active");
    }
    if (styleEditor.classList.contains("active")) {
        styleEditor.classList.remove("active");
    }
})


//Change Theme Of THe Editor...
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


//Add Tag Option For Mobile Users For Faster Typing...
const tags = document.querySelectorAll('.dropdown-content a');
tags.forEach(tag => {
    tag.addEventListener('click', function(){
        htmlEditor.focus();
        var element;    
        var pos;
        switch(tag.textContent)
        {
            case 'div':
                element= '<div></div>'; pos = -6; break;
            case 'p':
                element= '<p></p>'; pos = -4; break;
            case 'a':
                element= '<a></a>'; pos = -4; break;
            case 'h1':
                element= '<h1></h1>'; pos = -5; break;
            case 'h2':
                element= '<h2></h2>'; pos = -5; break;
            case 'h3':
                element= '<h3></h3>'; pos = -5; break;
            case 'h4':
                element= '<h4></h4>'; pos = -5; break;
            case 'h5':
                element= '<h5></h5>'; pos = -5; break;
            case 'h6':
                element= '<h6></h6>'; pos = -5; break;
            case 'button':
                element= '<button></button>'; pos = -9; break;
            case 'input':
                element= '<input></input>'; pos = -8; break;
            case 'span':
                element= '<span></span>'; pos = -7; break;
            case 'ul':
                element= '<ul></ul>'; pos = -5; break;
            case 'li':
                element= '<li></li>'; pos = -5; break;
            case 'ol':
                element= '<ol></ol>'; pos = -5; break;
            case 'img':
                element= '<img src="Your-Image-Source" alt="Alternative-Text">'; pos = 0; break;

            //Atttributes
            case 'id': element= "id = ''"; pos = -1; break;
        }
        var cursor = htmlEditor.getCursorPosition();
        htmlEditor.session.insert(cursor, element);
        htmlEditor.selection.moveCursorBy(0 , pos);
        htmlEditor.selection.clearSelection();
        htmlEditor.focus();
    });
});