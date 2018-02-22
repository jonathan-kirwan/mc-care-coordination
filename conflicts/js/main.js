var sidenavMenu = document.querySelector('.sidenav'),
    sidenavBars = document.querySelector('.fa-bars'),
    sidenavTimes = document.querySelector('.fa-times'),
    unallocatedShifts = document.querySelectorAll('.is-unallocated'),
    availableNurses = document.querySelector('#mcAvailableNurses'),
    availableNursesCards = document.querySelector('#mcAvailableNurses > div');

// Initialise Dragula (Drag and Drop Library)

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

(function () {
    // Populate Template

    function populateTemplate(responseAsJson) {
        if (!availableNurses) {
            return false;
        }
        console.log(responseAsJson);
        responseAsJson.forEach(arrayElement => {
            let nurseCard = document.createElement('div');
            nurseCard.classList.add('p-3', 'mb-2', 'bg-light', 'text-dark', 'rounded', 'nurse-card');
            nurseCard.innerHTML = makeNurseCard(arrayElement.Name, arrayElement.Profile, arrayElement.Location, arrayElement.Role);
            availableNurses.appendChild(nurseCard);
        });
    };

    function populateSchedule(responseAsJson) {
        let rows = document.querySelector('.schedule__rows');
        if (rows == null) {
            return false;
        }
        responseAsJson.forEach(arrayElement => {
            let row = document.createElement('tr');
            rows.appendChild(row);
            for (key in arrayElement) {
                let col = document.createElement('td');
                col.innerHTML = arrayElement[key];
                row.appendChild(col);
            }
        });
    };

    function populateReview(responseAsJson) {
        let rows = document.querySelector('.is-reviewed__rows');
        if (rows == null) {
            return false;
        }
        responseAsJson.forEach(obj => {
            let row = document.createElement('tr');
            rows.appendChild(row);
            for (key in obj) {

                let col = document.createElement('td');
                col.style.verticalAlign = "top";

                if (key === 'Patient') {
                    col.innerHTML = `${obj[key]}`;
                }
                if (obj[key] === "") {
                    col.innerHTML = ``;
                } else {
                    col.innerHTML = `
                        <div class="p-1 text-center bg-success">
                            <i class="fas fa-check text-success"></i>
                        </div>
                        <small>${obj[key]}</small>
                    `;
                }
                row.appendChild(col);
            }
        });
    };

    $('#profileModal').on('show.bs.modal', (e) => {
        let profile = e.relatedTarget.dataset.profile,
            name = e.relatedTarget.dataset.name,
            place = e.relatedTarget.dataset.place,
            role = e.relatedTarget.dataset.role,
            modalBody = document.querySelector('.profile-modal .modal-content');

        modalBody.innerHTML = `
            <div class="modal-header text-center">
                <h2 class="align-items-center d-flex font-weight-normal modal-title">
                    <img class="rounded-circle" alt="profile picture of ${name}" src="${profile}" /> ${name}
                </h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-center">
                <p class="lead">I'm a registered nurse working in the community in Lanarkshire, Scotland. I've been with Marie Curie for 10 years now</p>
                <p class="lead"><strong>Location</strong>: ${place}</p>
                <p class="lead"><strong>Role</strong>: ${role}</p>
            </div>
        `;
    });

    // Fetch Results (Nurses)

    fetch('./json/nurses.json')
        .then((response) => {
            let results = response.json()
            console.log(results);
            return results;
        })
        .then(responseAsJson => {
            populateTemplate(responseAsJson);
        })
        .catch(function (error) {
            console.log(error);
        });

    // Fetch Results (Schedule)

    fetch('./json/schedule.json')
        .then((response) => {
            let results = response.json()
            console.log(results);
            return results;
        })
        .then(responseAsJson => {
            populateSchedule(responseAsJson);
            populateReview(responseAsJson);
        })
        .catch(function (error) {
            console.log(error);
        });

    // Display Templates

    let name,
        profile,
        role,
        place;

    function makeNurseCard(name, profile, place, role) {
        return `
            <strong>
            ${profile == "" ? `<i class="bg-light text-dark fa-user fas p-2 rounded-circle"></i>` : `<img alt="${name}" src="${profile}" class="rounded-circle">` } ${name}
            </strong>
            <br>
            <small>${place}</small>
            <br>
            <small>${role}</small>
            <br>
            <a class="btn btn-sm btn-primary" href="#" data-name="${name}" data-profile="${profile}" data-place="${place}" data-role="${role}" data-toggle="modal" data-target="#profileModal">Profile</a>
        `;
    };

    var formData = localStorage.formData;
    console.log(formData);
})();