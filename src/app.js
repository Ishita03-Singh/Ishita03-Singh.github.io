const hamburgerButton=document.getElementById('hamburger')
const navList=document.getElementById('nav-List')

function toggleButton(){
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click',toggleButton)



