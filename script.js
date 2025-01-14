const photos = document.querySelectorAll('.photo.zoom > img');

photos.forEach(photo => {
    photo.addEventListener('click', open);
});

function open(e) {
    const pic = document.createElement('img');
    pic.src = e.target.src;
    pic.alt = e.target.alt;

    const quit = document.createElement('div');
    quit.classList.add('quit');
    quit.innerHTML = '&times;';

    const wrapper = document.createElement('div');
    wrapper.classList.add('photo', 'full');
    wrapper.appendChild(quit);
    wrapper.appendChild(pic);

    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.appendChild(wrapper);
    document.body.appendChild(modal);

    modal.addEventListener('click', close(modal));
};

function close(modal) {
    return function (e) {
        if (window.innerWidth < 768) {
            document.body.removeChild(modal);
        } else if (modal === e.target) {
            document.body.removeChild(modal);
        } else if (e.target.classList.contains('quit')) {
            document.body.removeChild(modal);
        }
    }
}

const main = document.querySelector('#main');
const sections = document.querySelectorAll('.section');

window.onhashchange = function () {
    const id = window.location.hash.split('#')[1];
    const target = document.getElementById(id);
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const width = window.innerWidth;
    if (target) {
        target.classList.add('active');
        if (width < 768) {
            main.style.display = 'none';
        } else {
            main.style.display = 'block';
        }
    } else {
        main.style.display = 'block';
    }
}

window.onresize = function () {
    const width = window.innerWidth;
    if (width >= 768) {
        main.style.display = 'block';
    } else {
        const hash = window.location.hash.split('#')[1];
        const target = document.getElementById(hash);
        if (!target) {
            main.style.display = 'block';
        } else {
            main.style.display = 'none';
        }
    }
}

if (window.location.hash) {
    window.onhashchange();
}

const backs = document.querySelectorAll('.back');

backs.forEach(back => {
    back.addEventListener('click', () => {
        window.location.hash = '';
    });
});