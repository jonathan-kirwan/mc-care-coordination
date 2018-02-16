var sidenavMenu = document.querySelector('.sidenav'),
    sidenavBars = document.querySelector('.fa-bars'),
    sidenavTimes = document.querySelector('.fa-times'),
    unallocatedShifts = document.querySelectorAll('.is-unallocated'),
    availableNurses = document.querySelector('#mcAvailableNurses');
availableNursesCards = document.querySelector('#mcAvailableNurses > div');

// initialise dragula (drag and drop library)

dragula([
    document.querySelector('.col1'),
    document.querySelector('.col2'),
    document.querySelector('.col3'),
    document.querySelector('.col4'),
    document.querySelector('.col5'),
    document.querySelector('.col6'),
    document.querySelector('.col7'),
    document.querySelector('.col8'),
    document.querySelector('.col9'),
    document.querySelector('.col10'),
    document.querySelector('.col11'),
    document.querySelector('.col12'),
    document.querySelector('.col13'),
    document.querySelector('.col14'),
    document.querySelector('.col15'),
    document.querySelector('.col16'),
    document.querySelector('.col17'),
    document.querySelector('.col18'),
    document.querySelector('.col19'),
    document.querySelector('.col20'),
    document.querySelector('.col21'),
    document.querySelector('.col22'),
    document.querySelector('.col23'),
    document.querySelector('.col24'),
    availableNurses
], {
    accepts: function (el, target, source, sibling) {
        if (target.classList.contains('is-unallocated')) {
            console.log(target);
            console.log("unallocated");
            target.classList.remove('bg-danger');
            target.classList.remove('is-unallocated');
            target.classList.add('bg-light', 'is-allocated');
        } else if (source.classList.contains('is-allocated')) {
            console.log(target);
            console.log("allocated");
            source.classList.add('bg-danger');
            source.classList.add('is-unallocated');
            source.classList.remove('bg-light', 'is-allocated');
            source.innerHTML = '';
        }

        var messagePanel = document.querySelector('.messages');

        messagePanel.classList.add('is-shown', 'visible');
        messagePanel.classList.remove('invisible');

        return true; // elements can be dropped in any of the 'containers' by default
    }
});

// show side menu

function showMenu(e) {
    sidenavMenu.classList.add('is-active');
    sidenavBars.classList.add('d-none');
    sidenavTimes.classList.add('d-inline-block');
    sidenavBars.classList.remove('d-inline-block');
    sidenavTimes.classList.remove('d-none');

    if (e.target.classList.contains('is-unavailable')) {
        document.querySelector('.sidenav-options').classList.add('invisible');
        document.querySelector('.sidenav-options').classList.remove('visible');
        document.querySelector('.sidenav-options').classList.add('d-none');
        document.querySelector('.sidenav-options').classList.remove('d-block');
        document.querySelector('.sidenav-show-unavailable-message').classList.add('visible');
        document.querySelector('.sidenav-show-unavailable-message').classList.remove('invisible');
        document.querySelector('.sidenav-show-unavailable-message').classList.add('d-block');
        document.querySelector('.sidenav-show-unavailable-message').classList.remove('d-none');
    } else {
        document.querySelector('.sidenav-options').classList.add('visible');
        document.querySelector('.sidenav-options').classList.remove('invisible');
        document.querySelector('.sidenav-options').classList.add('d-block');
        document.querySelector('.sidenav-options').classList.remove('d-none');
        document.querySelector('.sidenav-show-unavailable-message').classList.add('invisible');
        document.querySelector('.sidenav-show-unavailable-message').classList.remove('visible');
        document.querySelector('.sidenav-show-unavailable-message').classList.add('d-none');
        document.querySelector('.sidenav-show-unavailable-message').classList.remove('d-block');
    }

};

sidenavBars.addEventListener('click', showMenu, false);

// show side menu each time an unallocated shift is clicked

arrayShifts = Array.from(unallocatedShifts);
arrayShifts.forEach(function (item) {
    item.addEventListener('click', showMenu, false);
});

// hide side menu

function hideMenu() {
    sidenavMenu.classList.remove('is-active');
    sidenavTimes.classList.add('d-none');
    sidenavTimes.classList.remove('d-inline-block');
    sidenavBars.classList.remove('d-none');
    sidenavBars.classList.add('d-inline-block');
};

sidenavTimes.addEventListener('click', hideMenu, false);

// scroll the scheduler on click

var schedule = $('.schedule');

function scrollRight(e) {
    $('.schedule').animate({
        scrollLeft: '+=400',
    }, 200)
};

$('#scrollRight').on("click", scrollRight);

function scrollLeft(e) {
    $('.schedule').animate({
        scrollLeft: '-=400',
    }, 200)
};

$('#scrollLeft').on("click", scrollLeft);