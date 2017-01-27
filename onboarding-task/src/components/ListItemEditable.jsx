import React, { Component, PropTypes } from 'react';

class ListItemEditable extends Component {
  static displayName = 'ListItemEditable';
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { text: props.item.text };
    this._handleClick = this._handleClick.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleClick() {
    this.props.onCancel(this.props.item, this.props.index);
  }

  _handleUpdate() {
    const editedItem = { text: this.state.text, editable: false, guid: this.props.item.guid };
    this.props.onSave(editedItem, this.props.index);
  }

  _handleDelete() {
    this.props.onDelete(this.props.item.guid);
  }

  _handleInputChange(e) {
    this.setState({ text: e.target.value });
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
              <button className="btn btn-primary" onClick={this._handleUpdate}>Save</button>
              <button className="btn btn-default" onClick={this._handleClick}>Cancel</button>
              <button className="btn btn-danger" onClick={this._handleDelete}>Delete</button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default ListItemEditable;
