"use strict";

var RESULT_PER_PAGE = 5;
var currentPage = 1;
var startIndex = (currentPage - 1) * RESULT_PER_PAGE;
var endIndex = startIndex + RESULT_PER_PAGE;
var jobsToShow = jobs.slice(startIndex, endIndex);
var totalPages = Math.ceil(jobs.length / RESULT_PER_PAGE);
var paginationContainer = document.querySelector('.pagination');
paginationContainer.innerHTML = '';

for (var i = 1; i <= totalPages; i++) {
  var pageButton = document.createElement('button');
  pageButton.textContent = i;
  pageButton.className = 'pagination-button';
  if (i === currentPage) pageButton.classList.add('active');
  paginationContainer.appendChild(pageButton);
}
//# sourceMappingURL=pagination-jobs.dev.js.map
