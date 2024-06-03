import {useEffect, useState} from "react";
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() =>{
    const fetchPokemonData = async () =>{
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      // console.log(res.results);
      loadPokemon(res.results);
      console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async(data) =>{
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const handleNextPage = async() => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    setNextURL(data.next);
    setPrevURL(data.previous);
    await loadPokemon(data.results);
    setLoading(false);
  };
  const handlePrevPage = async() => {
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    // console.log(data);
    setNextURL(data.next);
    setPrevURL(data.previous);
    await loadPokemon(data.results);
    setLoading(false);
  };
  
  return (
    <>
      <Navbar />
      <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className="pokemonCadContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key ={i} pokemon={pokemon} />;
            })}
          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;
