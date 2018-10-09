var fancyMode = false;

function init () {
    // var urlParams = new URLSearchParams(window.location.search);
    // var initCompany = urlParams.get("company");
    // changeCompanyName({target:{value: initCompany}});
    var ul = document.getElementById("info-items");
    if (ul) {
        var lis = ul.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var li = lis.item(i);
            li.addEventListener("click", function (e) {
                showSubpage(e);
            })
        }
    }

    var body = document.getElementsByTagName("body")
    body[0].addEventListener("click", function (e) {
        if (e.target.id === "main-page") {
           undoFancyStuff()
        }
    })
}

function changeCompanyName (e) {
    var name = e.target.value;
    // Set each input:
    document.getElementById("comp1").value = name;
    document.getElementById("comp2").value = name;
    document.getElementById("comp3").value = name;
}

function showSubpage (event) {
    // Get ID of info div:
    var targetID = event.target.dataset.target;
    // Show subpage & inf0 div:
    var sub = document.getElementById(targetID);
    sub.style.display = "block";
    sub.style.zIndex = 10;
    setTimeout(function () {
        sub.style.opacity = 1;
    }, 20);

    // Hide main page:
    var main = document.getElementById("main-page");
    main.style.zIndex = -10;
    main.style.opacity = 0;
    setTimeout(function () {
        main.style.display = "none";
    }, 500);
}

function closeSubpage (e) {
    // Show main page:
    var main = document.getElementById("main-page");
    main.style.display = "block";
    main.style.zIndex = 10;
    setTimeout(function () {
        main.style.opacity = 1;
    }, 20);

    // Hide subpage:
    var sub = e.target.parentNode.parentNode;
    sub.style.zIndex = -10;
    sub.style.opacity = 0;
    setTimeout(function () {
        sub.style.display = "none";
    }, 500);

    var sections = document.getElementsByClassName("info-section");
    if (sections) {
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.display = "none";
        }
    }
}

function doCoolStuff(event) {
    if (fancyMode) {
        undoFancyStuff()
    } else {
        document.body.style.backgroundColor = "white";
        document.getElementById("main-page").className = "outer-animation";
        document.getElementById("inner").className = "rotater shadowify";
        const els = document.querySelectorAll("#inner div");
        els.forEach(node => node.className ="inner-elements section" );
        document.getElementById("contact-box").className = "shadowify";
        fancyMode = true;
    }
}

function undoFancyStuff() {
    document.body.style.backgroundColor = "#171c28";
    document.getElementById("main-page").className = "";
    document.getElementById("inner").className = "";
    const els = document.querySelectorAll("#inner div");
    els.forEach(node => node.className ="section" );
    document.getElementById("contact-box").className = "";
    fancyMode = false;
}