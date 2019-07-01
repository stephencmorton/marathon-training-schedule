import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

class DModal extends Component {
   
  
    render() {
      debugger;
      var {props} = this;
      return (
        <div>
          <Modal show={props.show} onHide={props.onHandler.bind(this,false)} className="modal-dialog-centered">
            
            <Modal.Header closeButton>
            </Modal.Header>
            
            <Modal.Body>
                {props.data}
            </Modal.Body>
          
          </Modal>
        </div>
      );
    }
  }
  

DModal.propTypes = {
  data: PropTypes.string.isRequired,
  onHandler : PropTypes.func.isRequired,
  show:PropTypes.bool.isRequired
};

export default DModal;
