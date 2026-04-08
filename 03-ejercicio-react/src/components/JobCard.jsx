import {useState} from "react"

import styles from './JobCard.module.css';

export function JobCard({ job }) {

    const { titulo, empresa, ubicacion, descripcion, data } = job;

    const [isApplied, setIsApplied] = useState(false)
    const handleApplyClick = () => {setIsApplied(true)}
    const buttonClass = isApplied ? "btn-apply-job is-applied" : ""
    const buttonText = isApplied ? "Aplicado" : "Aplicar"

    return (
        <li className = {styles.jobListingCard} data-modalidad = {data.modalidad} data-nivel = {data.nivel} data-technology={data.technology?.join(',')} data-contrato = {data.contrato}>
          <article>
              <div>
                  <h3>{titulo}</h3>
                  <small>{empresa} | {ubicacion}</small>
                  <p>{descripcion}</p>
                  <span className='tag'>Tecnologias: {data.technology?.join(', ')}</span>
                  <span className='tag'>Nivel: {data.nivel}</span>
              </div>
              <a>
                  <button className={buttonClass} onClick={handleApplyClick}>{buttonText}</button>
              </a>
          </article>
        </li>
    )
}
