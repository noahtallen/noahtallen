// The first file in this array will be the default shown. Please add all 
// file names from the 'pages' directory into this array if you want them
// shown on the firebase site.
var files = ['test.md' /*about.md', 'experience.md', 'projects.md'*/];
var pagesPath = "pages/"
var lowBreakPoint = 550;

init();

function init() {
    openPages(files);

    var ham = document.getElementById("hamburger");
    $('#hamburger').click(showBttns);

    // This logic ensures that the menu and hamburger reset when 
    // crossing over the breakpoint. This solves the issue where 
    // the x button would remain, as well as when the buttons would
    // not show when coming back over the breakpoint.
    $(window).resize(function() {
        if($(window).width() > lowBreakPoint) {
            if(ham.classList.contains("is-active")) {
               ham.classList.remove("is-active"); }
            $("#menu").css("display", "block");
        }
        else {
            if(!ham.classList.contains("is-active")) {
                $("#menu").css("display", "none"); }
        }
    });
}

function openPages(files) {

    files.forEach(function(file) {
        var contents = readFile(pagesPath + file);

        var name = file.split(".")[0];
        createHeaderButton(name);
        createPage(name, contents);
    });
 
    var def = files[0].split(".")[0];  
    var n = activateButton(def); // saves the closure then immediately calls it.
    n('');
}

function readFile(path) {
    var fileContents;
    $.ajax({
        url: path,
        async: false,
        success: (data) => fileContents = data
    })
    return fileContents;
}

function createHeaderButton(name) {
    var $buttonDiv = "<div id='"+name+"Button' class='header-button'>"+name+"</div>"
    
    $('#menu').append($buttonDiv);
    $("#"+name+"Button").click(activateButton(name));
}

function createPage(name, contents) {
    var $newPage = "<div id='"+name+"Page' class='pages'>"+mdToHtml(contents)+"</div>"
    $("#container").prepend($newPage);

    // Get rid of the top and bottom margins so that they align with the page padding.
    $("#"+name+"Page").first().css('margin-top', '0px');
    $("#"+name+"Page").last().css('margin-bottom', '0px');
}

// this function takes in text formatted in .md and returns it as .html.
function mdToHtml(contentsToConvert) {
    var converter = new showdown.Converter(),
        html      = converter.makeHtml(contentsToConvert);
    
    return html;
}

function activateButton(name) {
    return function(e) {
        $(".pages").css("display", "none");
        $(".header-button").removeClass("header-button-active");
        $("#" + name + "Page").css("display", "block");
        $("#" + name + "Button").addClass("header-button-active");
    }
}

function showBttns(e) {
    var ham = document.getElementById("hamburger");
    e.preventDefault();
    e.stopPropagation();

    // Close Menu
    if(ham.classList.contains("is-active")) {
        closeMenu(ham);
    }
    // Open Menu
    else {
        ham.classList.add("is-active")
        $("#menu").css("display", "block");

        // Check for one click outside of the menu, and close it.
        $(document).one('click', clickedOutsideMenu);
    }
}

function clickedOutsideMenu(e) {
    var el = e.target;
    var ham = document.getElementById("hamburger");
    if(!$.contains($('#menu'), el)) {
        closeMenu(ham);
    }
}

function closeMenu(ham) {
    $("#menu").css("display", "none");
    ham.classList.remove("is-active");
}