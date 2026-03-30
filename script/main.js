    const navContainer = document.querySelector('.nav-container');
    const links = document.querySelectorAll('.link');

    function toggleNav() {
        navContainer.classList.toggle('active');
        links[0].classList.toggle('active');
        links[1].classList.toggle('active');
        navContainer.classList.add('clicked');
    }

    navContainer.addEventListener('click', (e) => {
        toggleNav();
    });