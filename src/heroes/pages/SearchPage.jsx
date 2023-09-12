import React from "react";
import { HeroCard } from "../components/HeroCard";
import { useForm } from "../../hooks/useForm";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { getHeroesByName } from "../helpers/getHeroesByName";
export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);


  const heroes = getHeroesByName(q);


  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    /* if (searchText.trim().length <= 1) return */
    navigate(`?q=${searchText.toLowerCase().trim()}`)
  }

  return (
    <>
      <h1>Busqueda</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscando...</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              className="form-control mt-4"
              name="searchText"
              placeholder="Buscar un heroe"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-4">
              Buscar
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados:</h4>
          <hr />
          {
            (q === '')
              ?
              <div className="alert alert-primary">
                Buscar un heroe
              </div>
              : (heroes.length === 0) ?
                <div className="alert alert-danger">
                  No hay heroes compatibles con <b>{q.toUpperCase()}</b>
                </div>
                : ''

          }

          {
            heroes.map(hero => (

              <HeroCard key={hero.id} {...hero}></HeroCard>

            ))
          }

        </div>
      </div>
    </>
  );
};
