import React from 'react';
import { PropTypes } from 'prop-types';

import { I18nContext } from '../../dist';

class TransWithoutParams extends React.Component {
  render() {
    return (
      <div>
        <span>{this.context.t('Hello')}</span>
      </div>
    );
  }
}

TransWithoutParams.contextTypes = {
  t: PropTypes.func.isRequired
};

TransWithoutParams.New = class extends React.Component {
  render() {
    return (
      <I18nContext.Consumer>
        {context => (
          <div>
            <span>{context.t('Hello')}</span>
          </div>
        )}
      </I18nContext.Consumer>
    );
  }
};

export default TransWithoutParams;
