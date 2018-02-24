/* review */

(function () {
    // clear contents of local storage;
    localStorage.setItem('comments', "");

    let comments = document.querySelector('.review-comments'),
        commentsValue = document.querySelector('.review-comments').value,
        commit = document.querySelector('.commit-schedule');

    // on focus clear value of review-comments
    comments.addEventListener('click', function () {
        this.value = "";
    }, false);

    // on click get value of review-comments and add key to the local storage
    commit.addEventListener('click', function () {
        commentsValue = document.querySelector('.review-comments').value;
        localStorage.setItem('comments', commentsValue);
    }, false);

    // when success modal is shown get value of review-comments and append to modal body
    $('#successModal').on('show.bs.modal', function (e) {
        let successModal = document.querySelector('#successModal .modal-body');
        let p = document.createElement('p');
        p.innerHTML = localStorage.getItem('comments');
        p.classList.add('lead');
        successModal.appendChild(p);
    })
})();
