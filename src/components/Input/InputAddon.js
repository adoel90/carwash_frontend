import React from 'react';
import classNames from 'classnames';

const InputAddon = props => {
      const {
            className,
            children
      } = props;

      return <div className="input-addon">{children}</div>
}

export default InputAddon;