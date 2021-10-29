import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Loader, Dimmer } from "semantic-ui-react";

function LoadModal(props) {
  return (
    <Modal show={props.show} centered className="load-modal">
      <Loader active size="massive"></Loader>
      <Button onClick={props.changeLoading}>show</Button>
    </Modal>
  );
}
export default LoadModal;
