import React from "react";
import { Button, Modal } from "react-bootstrap";

export default class productDetailComponent extends React.Component {

    state = {
        open: false,
    }

    protected handleShow = () => {
        this.setState({open: true});
    }

    protected handleClose = () => {
        this.setState({open: false});
    }

    render(): React.ReactNode {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={this.state.open} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}