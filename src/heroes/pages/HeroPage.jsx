import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroesById } from '../helpers/getHeroesById';

export const HeroPage = () => {


    const { heroId } = useParams();

    const navigate = useNavigate();

    const hero = useMemo(() => getHeroesById(heroId), [heroId]);

    const onNavigateBack = () => {
        navigate(-1);
    }


    if (!hero) {
        return <Navigate to="/marvel"></Navigate>
    }

    return (

        <div className='row mt-5 p-2'>

            <div className="col-4">
                <img src={`/assets/heroes/${heroId}.jpg`} className='img-thumbnail animate__animated animate__fadeInLeft' alt={hero.superhero} width="60%" />
            </div>



            <div className="col-8">
                <h3>{hero.superhero}</h3>
                <ul className='list-group list-group-flush'>
                    <li className='listo-group-item'><b>Protagonista:</b> {hero.alter_ego}</li>
                    <li className='listo-group-item'><b>Publicado:</b> {hero.publisher}</li>
                    <li className='listo-group-item'><b>Primera aparicion:</b> {hero.first_appearance}</li>
                </ul>
                <h5 className='mt-3'>Personajes</h5>
                <p>{hero.characters}</p>
                <button className='btn btn-outline-primary'
                    onClick={onNavigateBack}
                >
                    Volver
                </button>
            </div>
        </div>


    )
}
