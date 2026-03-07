/*========================
    Filter location
======================== 

const locationFilter = document.querySelector('#location-filter')

locationFilter?.addEventListener('change', function(){
    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = locationFilter.value;

    jobs.forEach(job => {
        const modalidad = job.getAttribute('data-modalidad')
        const isShown = selectedValue === '' || selectedValue === modalidad
        job.classList.toggle('is-hidden', isShown === false)
    });

})

/* ========================
    Filter technology
======================== 

const frontFilter = document.querySelector('#front-filter')
const backFilter = document.querySelector('#back-filter')
const dbFilter = document.querySelector('#db-filter')

function handleTechnologyFilter() {
    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValueFront = frontFilter.value
    const selectedValueBack = backFilter.value
    const selectedValueDb = dbFilter.value

    jobs.forEach(job => {
        const techs = job.getAttribute('data-technology').split(',')
        const selectedTechs = [selectedValueFront, selectedValueBack, selectedValueDb].filter(value => value !== '')
        
        const isShown = selectedTechs.length === 0 || selectedTechs.every(tech => techs.includes(tech))
        job.classList.toggle('is-hidden', !isShown)
    })
}

frontFilter?.addEventListener('change', handleTechnologyFilter)
backFilter?.addEventListener('change', handleTechnologyFilter)
dbFilter?.addEventListener('change', handleTechnologyFilter)

/* ========================
    Filter level
======================== 

const levelFilter = document.querySelector('#level-filter')

levelFilter?.addEventListener('change', function(){
    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = levelFilter.value;

    jobs.forEach(job => {
        const levelFilter = job.getAttribute('data-nivel')
        const isShown = selectedValue === '' || selectedValue === levelFilter
        job.classList.toggle('is-hidden', isShown === false)
    });

})

/* ========================
    Filter contract
======================== 

const contractFilter = document.querySelector('#contract-filter')

contractFilter?.addEventListener('change', function(){
    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = contractFilter.value;

    jobs.forEach(job => {
        const contract = job.getAttribute('data-contract')
        const isShown = selectedValue === '' || selectedValue === contract
        job.classList.toggle('is-hidden', isShown === false)
    });

})



/* ========================
    Filter search-jobs
======================== 

const searchInput = document.querySelector('#jobs-search-input')

searchInput?.addEventListener('input', function(){

    const jobs = document.querySelectorAll('.job-listing-card')
    const searchTerm = searchInput.value.toLowerCase()
    jobs.forEach(job => {
        const title = job.querySelector('h3').textContent.toLowerCase()
        const isShown = title.includes(searchTerm)
        job.classList.toggle('is-hidden', isShown === false)
    })

}) */

/* ========================
    Filter all
======================== */

const searchInput = document.querySelector('#jobs-search-input')
const locationFilter = document.querySelector('#location-filter')
const contractFilter = document.querySelector('#contract-filter')
const levelFilter = document.querySelector('#level-filter')
const frontFilter = document.querySelector('#front-filter')
const backFilter = document.querySelector('#back-filter')
const dbFilter = document.querySelector('#db-filter')

function filterJobs() {
    const jobs = document.querySelectorAll('.job-listing-card')
    const searchTerm = searchInput.value.toLowerCase().trim() // Agregamos un .trim() para evitar que el usuario busque espacios en blanco
    const selectedLocation = locationFilter.value
    const selectedContract = contractFilter.value
    const selectedLevel = levelFilter.value

    /* Muy bien pensado */
    const selectedTechs = [frontFilter.value, backFilter.value, dbFilter.value]
        .filter(value => value !== '')

    jobs.forEach(job => {
        const title = job.querySelector('h3').textContent.toLowerCase()
        const modalidad = job.getAttribute('data-modalidad')
        const contract = job.getAttribute('data-contrato')
        const level = job.getAttribute('data-nivel')
        const techs = job.getAttribute('data-technology').split(',')

        const matchesSearch = title.includes(searchTerm)
        const matchesLocation = selectedLocation === '' || selectedLocation === modalidad
        const matchesContract = selectedContract === '' || selectedContract === contract
        const matchesLevel = selectedLevel === '' || selectedLevel === level
        const matchesTechnology = selectedTechs.length === 0 ||
            selectedTechs.every(tech => techs.includes(tech))

        const isShown = matchesSearch && matchesLocation && matchesContract && matchesLevel && matchesTechnology
        job.classList.toggle('is-hidden', !isShown)
    })
}

/* Muy bien aplicado el optional chaining */
searchInput?.addEventListener('input', filterJobs)
locationFilter?.addEventListener('change', filterJobs)
contractFilter?.addEventListener('change', filterJobs)
levelFilter?.addEventListener('change', filterJobs)
frontFilter?.addEventListener('change', filterJobs)
backFilter?.addEventListener('change', filterJobs)
dbFilter?.addEventListener('change', filterJobs)