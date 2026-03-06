const jobsApplyButtons = document.querySelector('.job-details')

jobsApplyButtons?.addEventListener('click', function(event){
    const element = event.target

    if(element.classList.contains('btn-apply-job')){
        element.textContent = '¡Aplicado!'
        element.classList.add('is-applied')
        element.disabled = true
    }
})
