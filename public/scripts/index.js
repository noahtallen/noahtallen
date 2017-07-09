// for each file in pages folder
//   Create new, hidden div. 
//   create button to the side to show div.
//   fill the div with content generated via markdown
//   repeat until all files have links and content
// show the "about" div first.
var files = ['about.md', 'experience.md', 'projects.md'];
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
    })

    // $.ajax({
    //     url: folderName,
    //     async: false,
    //     success: (data) => {
    //         $(data).find("a").attr("href", function (i, path) {
    //             if( path.match(/\.(md|txt)$/) ) {
    //                 // Now, path equals the path without the folderName.
    //                 var contents = readFile(folderName+path);

                    
    //                 createHeaderButton(name);

    //                 createPage(name, contents);
    //             } 
    //         });
    //     }
    // });
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
    //$buttonDiv.click(activateButton(name+"Button"));
    $('#menu').append($buttonDiv);
}

function createPage(name, contents) {
    var $newPage = $("div", {id: (name + "Page"), "class": "pages"})
    $newPage.html(contents);
}

function activateButton(buttonName) {
    alert(buttonName + " is activated");
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