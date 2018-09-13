function init () {
    const ul = document.getElementById('info-items')
    if (ul) {
        var lis = ul.getElementsByTagName('li')
        for (let i = 0; i < lis.length; i++) {
            const li = lis.item(i)
            li.addEventListener('click', (e) => {
                showSubpage(e)
            })
        }
    }
}

function changeCompanyName (e) {
    var name = e.target.value
    // Set each input:
    document.getElementById('comp1').value = name
    document.getElementById('comp2').value = name
    document.getElementById('comp3').value = name
}

function showSubpage (event) {
    // Get ID of info div:
    const targetID = event.target.dataset.target
    // Show subpage & inf0 div:
    const sub = document.getElementById(targetID)
    sub.style.display = 'block'
    sub.style.zIndex = 10
    setTimeout(() => {
        sub.style.opacity = 1
    }, 20)

    // Hide main page:
    const main = document.getElementById('main-page')
    main.style.zIndex = -10
    main.style.opacity = 0
    setTimeout(() => {
        main.style.display = 'none'
    }, 500)
   
}

function closeSubpage (e) {
    // Show main page:
    const main = document.getElementById('main-page')
    main.style.display = 'block'
    main.style.zIndex = 10
    setTimeout(() => {
        main.style.opacity = 1
    }, 20)

    // Hide subpage:
    const sub = e.target.parentNode.parentNode
    console.log(sub)
    sub.style.zIndex = -10
    sub.style.opacity = 0
    setTimeout(() => {
        sub.style.display = 'none'
    }, 500)

    const sections = document.getElementsByClassName('info-section')
    if (sections) {
        for (let i = 0; i < sections.length; i++) {
            sections[i].style.display = 'none'
        }
    }
}