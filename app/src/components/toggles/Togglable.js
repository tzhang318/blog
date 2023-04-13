import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import './Togglable.scss';

// forwardRef allows this component know what refs are assigned to it
export const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  // this hook makes toggle availabe outside of this component
  // the ref from whichever component can toggle now
  useImperativeHandle(refs, () => {
    return {
      toggle
    };
  });

  return (
    <div className='togglable'>
      <div style={hideWhenVisible}>
        <button className='button' onClick={toggle}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='button' onClick={toggle}>{props.cancelLabel}</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired
};
