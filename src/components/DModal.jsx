import React from 'react';

function DModal({ show, onHandler, data }) {
  if (!show) return null;

  return (
    <>
      <div className="modal" style={{ display: 'block' }} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" aria-label="Close" onClick={() => onHandler(false)}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{data}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={() => onHandler(false)} />
    </>
  );
}

export default DModal;
