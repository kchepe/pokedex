import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { GlobalContext } from "../GlobalState/GlobalState";

interface deleteProps {
  open: boolean;
  isClose: () => void;
  id: string;
  name: string;
}

const DeleteModalComponent = (props: deleteProps) => {
  const { deletePokemon } = useContext(GlobalContext);
  const handleDelete = () => {
    deletePokemon(props.id);
    props.isClose();
  };
  return (
    <div
      className={"modalBackground"}
      style={{ display: props.open ? "block" : "none" }}
    >
      <div className={"modalContainer"} style={{ width: "30%" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h3>Delete {props.name}?</h3>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button color="primary" variant="contained" onClick={props.isClose}>
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalComponent;
