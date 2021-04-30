import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalState/GlobalState";

interface ViewPokemon {
  open: boolean;
  isClose: () => void;
  name: string;
}

const ViewPokemonComponent = (props: ViewPokemon) => {
  const { pokemonID } = useContext(GlobalContext);
  const [pokemons, setPokemons] = useState<any>({});
  let poke: string = props.name;
  const [image, setImage] = useState<string>("");
  const url =
    poke === ""
      ? "https://pokeapi.co/api/v2/pokemon/"
      : `https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`;
  const [abilities, setAbilities] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    getPokemon();
  }, [poke]);

  const getPokemon = async () => {
    const response = await fetch(url);
    const data = await response.json();
    if (poke != "") {
      setImage(data.sprites.other.dream_world.front_default);
      setItems(data.held_items);
      setAbilities(data.abilities);
      setPokemons(data);
    }
  };
  return (
    <div
      className={"modalBackground"}
      onClick={props.isClose}
      style={{ display: props.open ? "block" : "none" }}
    >
      <Container className={"modalContainer"} fixed={true} maxWidth={"xs"}>
        <Grid container={true} alignItems="center">
          <Grid item={true} xs={6}>
            {pokemonID?.pName.toLowerCase() == pokemons.name ? (
              <img src={image} width="150" height="150"></img>
            ) : (
              <p style={{ fontSize: "12px", paddingLeft: "25px" }}>
                Image not found
              </p>
            )}
          </Grid>
          <Grid item={true} xs={6}>
            <h2>{pokemonID?.pName.toUpperCase()}</h2>
            <p className={"info"}>
              <b>Type:</b> {pokemonID?.type}
            </p>
            <p className={"info"}>
              <b>HP:</b> {pokemonID?.hp}
            </p>
            <p className={"info"}>
              <b>Attack:</b> {pokemonID?.attack}
            </p>
            <p className={"info"}>
              <b>Defense:</b> {pokemonID?.defense}
            </p>
            <p className={"info"}>
              <b>Abilities: </b>
              {pokemonID?.pName.toLowerCase() == pokemons.name ? (
                abilities.map((ability: any, index: number) => (
                  <span key={index}> {ability.ability.name} </span>
                ))
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
            <p className={"info"}>
              <b>Held Items:</b>
              {pokemonID?.pName.toLowerCase() == pokemons.name ? (
                items.map((item: any, index: number) => (
                  <span key={index}> {item.item.name} </span>
                ))
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ViewPokemonComponent;
