const container = document.querySelector('.jobs-listings')
const RESULTS_PER_PAGE = 3
let currentPage = 1
let allJobs = []

function renderJobs(jobs) {
    container.innerHTML = ''

    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
    const endIndex = startIndex + RESULTS_PER_PAGE
    const jobsToShow = jobs.slice(startIndex, endIndex)

    const jobsDocumentFragment = document.createDocumentFragment()

    jobsToShow.forEach(job => {
        const list = document.createElement('li')
        list.className = 'job-listing-card'
        list.dataset.modalidad = job.data.modalidad
        list.dataset.nivel = job.data.nivel
        list.dataset.technology = job.data.technology
        list.dataset.contrato = job.data.contrato
        list.innerHTML = `
            <article>
                <div>
                    <h3>${job.titulo}</h3>
                    <small>${job.empresa} | ${job.ubicacion}</small>
                    <p>${job.descripcion}</p>
                    <span class="job-tag">Tecnologias: ${job.data.technology}</span>
                    <span class="job-tag">Contrato: ${job.data.contrato}</span>
                    <span class="job-tag">Nivel: ${job.data.nivel}</span>
                </div>
                <a href="detalles-ofertas.html">
                    <button class="btn-apply-job">Aplicar</button>
                </a>
            </article>
        `
        jobsDocumentFragment.appendChild(list)
    })

    container.appendChild(jobsDocumentFragment)
    renderPagination(jobs)
}

function renderPagination(jobs) {
    const paginationContainer = document.querySelector('.pagination')
    const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)
    paginationContainer.innerHTML = ''

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('a')
        pageButton.textContent = i
        pageButton.href = '#'
        if (i === currentPage) pageButton.classList.add('is-active')

        pageButton.addEventListener('click', (btn) => {
            btn.preventDefault()
            currentPage = i
            renderJobs(jobs)
        })

        paginationContainer.appendChild(pageButton)
    }
}

fetch("./data.json")
    .then(response => response.json())
    .then(jobs => {
        allJobs = jobs
        renderJobs(allJobs)
    })