// for each file in pages folder
//   Create new, hidden div. 
//   create button to the side to show div.
//   fill the div with content generated via markdown
//   repeat until all files have links and content
// show the "about" div first.

init();

function init() {
    openFilesIn("pages/");
}

function openFilesIn(folderName) {
    $.ajax({
        url: folderName,
        async: false,
        success: function (data) {
            $(data).find("a").attr("href", function (i, path) {
                if( path.match(/\.(md|txt)$/) ) {
                    // Now, path equals the path without the folderName.
                    var contents = readFile(folderName+path);

                    var name = path.split(".")[0];
                    createHeaderButton(name);

                    createPage(name, contents);
                } 
            });
        }
    });
}

function readFile(path) {
    var fileContents;
    $.ajax({
        url: path,
        async: false,
        success: function(data) {
            fileContents = data;
        }
    })
    return fileContents;
}

function createHeaderButton(name) {
    var $buttonDiv = $("div", {id: (name + "Button"), "class": "header-button"});
    $buttonDiv.click(activateButton(name+"Button"));
    $buttonDiv.text(name);
    $('menu').append(buttonDiv);
}

function createPage(name, contents) {
    var $newPage = $("div", {id: (name + "Page"), "class": "pages"})
    $newPage.html(contents);
}

function activateButton(buttonName) {
    alert(buttonName + " is activated");
}

function showBttns() {
    var ham = document.getElementById("hamburger");

    // Close Menu
    if(ham.classList.contains("is-active")) {
        ham.classList.remove("is-active")
        $("#menu").css("display", "none");
    }
    // Open Menu
    else {
        ham.classList.add("is-active")
        $("#menu").css("display", "block");
    }
}