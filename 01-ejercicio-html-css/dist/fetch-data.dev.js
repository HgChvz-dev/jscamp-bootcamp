"use strict";

var container = document.querySelector('.jobs-listings');
var RESULTS_PER_PAGE = 3;
var currentPage = 1;
var allJobs = [];

function renderJobs(jobs) {
  container.innerHTML = '';
  var startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  var endIndex = startIndex + RESULTS_PER_PAGE;
  var jobsToShow = jobs.slice(startIndex, endIndex);
  jobsToShow.forEach(function (job) {
    var list = document.createElement('li');
    list.className = 'job-listing-card';
    list.dataset.modalidad = job.data.modalidad;
    list.dataset.nivel = job.data.nivel;
    list.dataset.technology = job.data.technology;
    list.dataset.contrato = job.data.contrato;
    list.innerHTML = "\n            <article>\n                <div>\n                    <h3>".concat(job.titulo, "</h3>\n                    <small>").concat(job.empresa, " | ").concat(job.ubicacion, "</small>\n                    <p>").concat(job.descripcion, "</p>\n                    <span class=\"job-tag\">Tecnologias: ").concat(job.data.technology, "</span>\n                    <span class=\"job-tag\">Contrato: ").concat(job.data.contrato, "</span>\n                    <span class=\"job-tag\">Nivel: ").concat(job.data.nivel, "</span>\n                </div>\n                <a href=\"detalles-ofertas.html\">\n                    <button class=\"btn-apply-job\">Aplicar</button>\n                </a>\n            </article>\n        ");
    container.appendChild(list);
  });
  renderPagination(jobs);
}

function renderPagination(jobs) {
  var paginationContainer = document.querySelector('.pagination');
  var totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);
  paginationContainer.innerHTML = '';

  var _loop = function _loop(i) {
    var pageButton = document.createElement('a');
    pageButton.textContent = i;
    pageButton.href = '#';
    if (i === currentPage) pageButton.classList.add('is-active');
    pageButton.addEventListener('click', function (btn) {
      btn.preventDefault();
      currentPage = i;
      renderJobs(jobs);
    });
    paginationContainer.appendChild(pageButton);
  };

  for (var i = 1; i <= totalPages; i++) {
    _loop(i);
  }
}

fetch("./data.json").then(function (response) {
  return response.json();
}).then(function (jobs) {
  allJobs = jobs;
  renderJobs(allJobs);
});
//# sourceMappingURL=fetch-data.dev.js.map
