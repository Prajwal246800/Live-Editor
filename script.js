var editor = document.getElementById('editor');
editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
editor.getSession().setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css"></style>
</head>
<body>
    
</body>
</html>`);

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
    editor.setTheme(`${themes[i++]}`);
    if(i == n)
        i = 0;
    
}

function updateoutput(){
    output.style.backgroundColor = "white";
    output.style.borderColor = "black";
    var code = editor.getSession().getValue();
    output.contentDocument.open();
    output.contentDocument.write(code);
    output.contentDocument.close();
}
editor.getSession().addEventListener('change', updateoutput);