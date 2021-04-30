import React, { ChangeEvent, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, TablePagination } from "@material-ui/core";
import FormComponent from "./FormComponent";
import { GlobalContext } from "../GlobalState/GlobalState";
import DeleteModalComponent from "./DeleteModalComponent";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import ViewPokemonComponent from "./ViewPokemonComponent";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableComponent() {
  const classes = useStyles();
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const { pokemons, findID, sortData } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState<string>("");
  const [showDeleteMsg, setShowDeleteMsg] = useState<boolean>(false);
  const [pokeID, setPokeID] = useState<string>("");
  const [pokeName, setPokeName] = useState<string>("");
  const [sortName, setSortName] = useState<string>("asc");
  const [sortType, setSortType] = useState<string>("asc");
  const [sortHP, setSortHP] = useState<string>("asc");
  const [sortAttack, setSortAttack] = useState<string>("asc");
  const [sortDefense, setSortDefense] = useState<string>("asc");
  const [viewCard, setViewCard] = useState<boolean>(false);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [formType, setFormType] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddForm = (typeForm: string, pokeID: string) => {
    setOpenAddForm(true);
    if (typeForm === "edit") {
      setFormType(typeForm);
      findID(pokeID);
    } else {
      setFormType(typeForm);
    }
  };
  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };
  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCloseDeleteMsg = () => {
    setShowDeleteMsg(false);
  };

  const handleOpenDeleteMsg = (id: string, name: string) => {
    setPokeName(name);
    setPokeID(id);
    setShowDeleteMsg(true);
  };

  const handleCloseCard = () => {
    setViewCard(false);
  };

  const handleOpenCard = (id: string, name: string) => {
    setViewCard(true);
    findID(id);
    setPokemonName(name);
  };

  return (
    <div className={"container"}>
      <ViewPokemonComponent
        open={viewCard}
        isClose={handleCloseCard}
        name={pokemonName}
      />
      <FormComponent
        closeModal={handleCloseAddForm}
        open={openAddForm}
        formType={formType}
      />
      <DeleteModalComponent
        open={showDeleteMsg}
        isClose={handleCloseDeleteMsg}
        id={pokeID}
        name={pokeName}
      />
      <div className={"fieldContainer"}>
        <div>
          <input
            type="text"
            className="txtField"
            placeholder="Search here"
            onChange={handleSearchText}
          />
        </div>
        <div>
          <Button
            className={"addBtn"}
            variant={"contained"}
            onClick={() => handleOpenAddForm("add", "")}
          >
            Add Pokemon
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  disableRipple={true}
                  style={{ background: "transparent" }}
                  endIcon={
                    sortName == "asc" ? <ArrowUpward /> : <ArrowDownward />
                  }
                  onClick={() => {
                    if (sortName == "asc") {
                      setSortName("desc");
                    } else {
                      setSortName("asc");
                    }
                    sortData("pName", sortName);
                  }}
                >
                  Pokemon Name
                </Button>
              </TableCell>
              <TableCell align={"right"}>
                <Button
                  disableRipple={true}
                  style={{ background: "transparent" }}
                  endIcon={
                    sortType == "asc" ? <ArrowUpward /> : <ArrowDownward />
                  }
                  onClick={() => {
                    if (sortType == "asc") {
                      setSortType("desc");
                    } else {
                      setSortType("asc");
                    }
                    sortData("type", sortType);
                  }}
                >
                  Pokemon Type
                </Button>
              </TableCell>
              <TableCell align={"right"}>
                <Button
                  disableRipple={true}
                  style={{ background: "transparent" }}
                  endIcon={
                    sortHP == "asc" ? <ArrowUpward /> : <ArrowDownward />
                  }
                  onClick={() => {
                    if (sortHP == "asc") {
                      setSortHP("desc");
                    } else {
                      setSortHP("asc");
                    }
                    sortData("hp", sortHP);
                  }}
                >
                  HP
                </Button>
              </TableCell>
              <TableCell align={"right"}>
                <Button
                  disableRipple={true}
                  style={{ background: "transparent" }}
                  endIcon={
                    sortAttack == "asc" ? <ArrowUpward /> : <ArrowDownward />
                  }
                  onClick={() => {
                    if (sortAttack == "asc") {
                      setSortAttack("desc");
                    } else {
                      setSortAttack("asc");
                    }
                    sortData("attack", sortAttack);
                  }}
                >
                  Attack
                </Button>
              </TableCell>
              <TableCell align={"right"}>
                <Button
                  disableRipple={true}
                  style={{ background: "transparent" }}
                  endIcon={
                    sortDefense == "asc" ? <ArrowUpward /> : <ArrowDownward />
                  }
                  onClick={() => {
                    if (sortDefense == "asc") {
                      setSortDefense("desc");
                    } else {
                      setSortDefense("asc");
                    }
                    sortData("defense", sortDefense);
                  }}
                >
                  Defense
                </Button>
              </TableCell>
              <TableCell align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons
              .filter((val: any) => {
                if (searchText === "") {
                  return val;
                } else if (
                  val.pName.toLowerCase().includes(searchText.toLowerCase()) ||
                  val.type.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pokemon: any) => (
                <TableRow key={pokemon.id} className={"tableRow"}>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => handleOpenCard(pokemon.id, pokemon.pName)}
                  >
                    {pokemon.pName.toLowerCase()}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => handleOpenCard(pokemon.id, pokemon.pName)}
                  >
                    {pokemon.type}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => handleOpenCard(pokemon.id, pokemon.pName)}
                  >
                    {pokemon.hp}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => handleOpenCard(pokemon.id, pokemon.pName)}
                  >
                    {pokemon.attack}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => handleOpenCard(pokemon.id, pokemon.pName)}
                  >
                    {pokemon.defense}
                  </TableCell>
                  <TableCell>
                    <Grid container={true} justify="center" spacing={2}>
                      <Grid item={true}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleOpenAddForm("edit", pokemon.id)}
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item={true}>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() =>
                            handleOpenDeleteMsg(pokemon.id, pokemon.pName)
                          }
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pokemons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {pokemons.length != 0 ? (
        <p>&nbsp;</p>
      ) : (
        <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
          <p>Table is empty!</p>
        </div>
      )}
    </div>
  );
}
