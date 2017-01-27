import React, { Component, PropTypes } from 'react';
import { _generateGuid } from '../utils/utils.js';

class AddItem extends Component {
  static displayName = 'AddItem';
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._createNewItem = this._createNewItem.bind(this);
  }

  _handleInputChange(e) {
    this.setState({ text: e.target.value });
  }

  _createNewItem() {
    const newItem = {
      guid: _generateGuid(),
      text: this.state.text,
      editable: false,
    };
    this.props.addItem(newItem);
    this.setState({ text: '' });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              <input className="form-control" type="text" value={this.state.text} onChange={this._handleInputChange} />
            </div>
            <div className="form-group">
              <input className="btn btn-default" type="button" value="Add" onClick={this._createNewItem} />
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default AddItem;
