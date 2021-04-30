import React, { createContext, useEffect, useState } from "react";
import { IPokemon } from "../Interface/Pokemon";
import firebase from "../firebase";

export const GlobalContext = createContext<any>(null);

const db = firebase.firestore();

export const GlobalProvider = (props: any) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokemonID, setPokemonID] = useState<any>();
  const [sortID, setSortID] = useState<string>("pName");
  const [sortOption, setSortOption] = useState<any>("asc");

  useEffect(() => {
    db.collection("pokemons")
      .orderBy(sortID, sortOption)
      .onSnapshot((snapshot) => {
        const pokeData: any = [];
        snapshot.forEach((doc) => pokeData.push({ ...doc.data(), id: doc.id }));
        setPokemons(pokeData);
      });
  }, [sortID, sortOption]);

  const addPokemon = (data: IPokemon[]) => {
    db.collection("pokemons").add(data);
    console.log(data);
  };

  const deletePokemon = (id: string) => {
    db.collection("pokemons").doc(id).delete();
  };

  const findID = (id: string) => {
    const data = pokemons.find((pokemon) => pokemon.id === id);
    setPokemonID(data);
  };
  const updatePokemon = (data: any) => {
    db.collection("pokemons").doc(data.id).set(data);
  };

  const sortData = (id: string, option: any) => {
    setSortID(id);
    setSortOption(option);
  };

  return (
    <GlobalContext.Provider
      value={{
        pokemons,
        addPokemon,
        deletePokemon,
        findID,
        pokemonID,
        updatePokemon,
        sortData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
