var pagesPath = "pages/"
var lowBreakPoint = 550;

init();

function init() {
    //openPages(files);
    initializePages();
    var ham = document.getElementById("hamburger");
    $('#hamburger').one('mousedown', showBttns);

    // This logic ensures that the menu and hamburger reset when 
    // crossing over the breakpoint. This solves the issue where 
    // the x button would remain, as well as when the buttons would
    // not show when coming back over the breakpoint.
    $(window).resize(function() {
        if($(window).width() > lowBreakPoint) {
            if(ham.classList.contains("is-active")) {
               closeMenu(ham) }
            // show side menu
            $("#menu").css("display", "block");
            // Remove click outside of menu function
            $(document).off('click', clickedOutsideMenu);
        }
        else {
            if(!ham.classList.contains("is-active")) {
                $("#menu").css("display", "none"); }
        }
    });
}


function initializePages() {
    $('#container').children('.pages').each(function() {
        var id = this.id;
        var name = id.substring(0, id.length - 4);
        console.log(name)
        var $buttonDiv = "<div id='"+name+"Button' class='header-button'>"+name+"</div>"
        $('#menu').append($buttonDiv);
        $("#"+name+"Button").click(activateButton(name));
        $("#"+name+"Page").children(":first").css('margin-top', '0px');
        $("#"+name+"Page").children(":last").css('margin-bottom', '0px');
        if(!(name === "about")) {
            $("#" + name + "Page").css("display", "none");
        }
    })
}

function activateButton(name) {
    return function(e) {
        $(".pages").css("display", "none");
        $(".header-button").removeClass("header-button-active");
        $("#" + name + "Page").css("display", "block");
        $("#" + name + "Button").addClass("header-button-active");

        var ham = document.getElementById("hamburger");
        if(ham.classList.contains("is-active")) {
            closeMenu(ham);
        }
    }
}

function showBttns(e) {
    var ham = document.getElementById("hamburger");
    e.preventDefault();
    e.stopPropagation();

    // Open Menu
    if(!ham.classList.contains("is-active")) {
        ham.classList.add("is-active")
        $("#menu").css("display", "block");

        // Check for one click outside of the menu, and close it.
        $(document).one('mousedown', clickedOutsideMenu);
    }

}

function clickedOutsideMenu(e) {
    var el = e.target;
    console.log($(el).attr('class'));
    if(!$(el).hasClass('header-button')) {
        var ham = document.getElementById("hamburger");
        closeMenu(ham);
    }
}

function closeMenu(ham) {
    $("#menu").css("display", "none");
    ham.classList.remove("is-active");
    // Reattatch event listener.
    $('#hamburger').one('mousedown', showBttns);
}