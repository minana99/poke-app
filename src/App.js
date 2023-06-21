import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import './App.css';
import Card from './components/Card/Card';
// useContext,useLayoutEffect,useRef,useCallback,useMemo

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [prevPageUrl, setPrevPageUrl] = useState('')

  const fetchPokemonData = async (url) => {
    setLoading(true)
    let res = await getAllPokemon(url);
    console.log(res);
    setNextPageUrl(res.next)
    setPrevPageUrl(res.previous)
    await loadPokemon(res.results);
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemonData(initialURL);
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  }

  // console.log(pokemonData);

  const handlePrevPage = () => {
    fetchPokemonData(prevPageUrl);
  }
  const handleNextPage = () => {
    fetchPokemonData(nextPageUrl);
  }

  return (
    <div className="App">
      {loading ?
        (<h1>Loading..</h1>) :
        (<>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}>Pokemon</Card>
            })}
          </div>
          <div className="btn">
            {prevPageUrl !== null &&
              <button onClick={handlePrevPage}>前へ</button>
            }
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>)}
    </div>
  );
}

export default App;
