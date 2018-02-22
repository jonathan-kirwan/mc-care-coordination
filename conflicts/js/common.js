/* common functions */

(function () {
    // scroll the scheduler on click

    let schedule = document.querySelector('.schedule'),
        prev = document.querySelector('[data-direction="prev"]'),
        next = document.querySelector('[data-direction="next"]');

    function right() {
        let currentVal = schedule.scrollLeft;
        schedule.scrollLeft = currentVal + 400;
    };

    next.addEventListener("click", right, false);

    function left() {
        let currentVal = schedule.scrollLeft;
        schedule.scrollLeft = currentVal - 400;
    };

    prev.addEventListener("click", left, false);
})();