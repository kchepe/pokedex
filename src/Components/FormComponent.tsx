import {
  Container,
  Grid,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../GlobalState/GlobalState";
import { IPokemon } from "../Interface/Pokemon";
import SnackBarComponent from "./SnackBarComponent";
import { types } from "../types";

interface formProps {
  open: boolean;
  closeModal: () => void;
  formType: string;
}

const FormComponent = (props: formProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPokemon>();
  const { addPokemon, pokemonID, updatePokemon } = useContext(GlobalContext);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  useEffect(() => {
    reset();
  }, [props.formType]);
  const handleSaveData = (data: IPokemon[], e: any) => {
    e.preventDefault();
    if (props.formType == "add") {
      addPokemon(data);
    } else {
      updatePokemon(data);
    }
    setOpenSnackBar(true);
    setTimeout(() => {
      props.closeModal();
    }, 500);
  };
  const handleCancel = (e: any) => {
    e.preventDefault();
    props.closeModal();
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  return (
    <div>
      <SnackBarComponent
        open={openSnackBar}
        isClose={handleCloseSnackBar}
        message={props.formType === "edit" ? "updated!" : "added!"}
      />
      <Modal
        onRendered={() => {
          reset();
        }}
        open={props.open}
        onClose={props.closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Container maxWidth="xs" className={"modalContainer"}>
            <form onSubmit={handleSubmit(handleSaveData)}>
              <Grid container={true} spacing={3} justify={"center"}>
                <Grid item={true}>
                  <h2>{props.formType.toLocaleUpperCase()} POKEMON</h2>
                </Grid>
                <Grid item={true} xs={12}>
                  {props.formType === "add" ? (
                    console.log("no id")
                  ) : (
                    <input
                      type="hidden"
                      {...register("id", { required: true })}
                      defaultValue={pokemonID?.id}
                    />
                  )}
                  <h4>Pokemon Name:</h4>
                  <input
                    type="text"
                    className="txtField"
                    placeholder="Pokemon Name"
                    {...register("pName", { required: true })}
                    defaultValue={
                      props.formType === "edit" ? pokemonID?.pName : ""
                    }
                  />
                  {errors.pName && (
                    <p className={"errorLabel"}>required field</p>
                  )}
                </Grid>
                <Grid item={true} xs={12}>
                  <h4>Pokemon Type:</h4>
                  <select
                    className="txtField"
                    {...register("type")}
                    defaultValue={
                      props.formType === "edit" ? pokemonID?.type : ""
                    }
                  >
                    {types.map((type: any, index: number) => (
                      <option value={type.value} key={index}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item={true} xs={12}>
                  <h4>HP:</h4>
                  <input
                    type="number"
                    min="0"
                    className="txtField"
                    placeholder="HP"
                    defaultValue={
                      props.formType === "edit" ? pokemonID?.hp : ""
                    }
                    {...register("hp", { required: true, valueAsNumber: true })}
                  />
                  {errors.pName && (
                    <p className={"errorLabel"}>required field</p>
                  )}
                </Grid>
                <Grid item={true} xs={12}>
                  <h4>Attack:</h4>
                  <input
                    type="number"
                    min="0"
                    className="txtField"
                    placeholder="Attack"
                    {...register("attack", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    defaultValue={
                      props.formType === "edit" ? pokemonID?.attack : ""
                    }
                  />
                  {errors.pName && (
                    <p className={"errorLabel"}>required field</p>
                  )}
                </Grid>
                <Grid item={true} xs={12}>
                  <h4>Defense:</h4>
                  <input
                    type="number"
                    min="0"
                    className="txtField"
                    placeholder="Defense"
                    {...register("defense", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    defaultValue={
                      props.formType === "edit" ? pokemonID?.defense : ""
                    }
                  />
                  {errors.pName && (
                    <p className={"errorLabel"}>required field</p>
                  )}
                </Grid>
                <Grid item={true} xs={6}>
                  <Button
                    onClick={handleCancel}
                    fullWidth
                    variant={"contained"}
                    color={"secondary"}
                    className={"cancelBtn"}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item={true} xs={6}>
                  <Button
                    fullWidth
                    variant={"contained"}
                    color={"primary"}
                    type={"submit"}
                  >
                    {props.formType === "edit" ? "Update" : "Save"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
};
export default FormComponent;
