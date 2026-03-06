"use strict";

var jobsListingSection = document.querySelector('.jobs-listings');
jobsListingSection.addEventListener('click', function (event) {
  var element = event.target;

  if (element.classList.contains('btn-apply-job')) {
    element.textContent = '¡Aplicado!';
    element.classList.add('is-applied');
    element.disabled = true;
  }
});
//# sourceMappingURL=script.dev.js.map
