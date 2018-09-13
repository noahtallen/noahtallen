function init () {
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
    }, 20)

    // Hide main page:
    var main = document.getElementById("main-page");
    main.style.zIndex = -10;
    main.style.opacity = 0;
    setTimeout(function () {
        main.style.display = "none";
    }, 500)
}

function closeSubpage (e) {
    // Show main page:
    var main = document.getElementById("main-page");
    main.style.display = "block";
    main.style.zIndex = 10;
    setTimeout(function () {
        main.style.opacity = 1;
    }, 20)

    // Hide subpage:
    var sub = e.target.parentNode.parentNode;
    sub.style.zIndex = -10;
    sub.style.opacity = 0;
    setTimeout(function () {
        sub.style.display = "none";
    }, 500)

    var sections = document.getElementsByClassName("info-section");
    if (sections) {
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.display = "none";
        }
    }
}