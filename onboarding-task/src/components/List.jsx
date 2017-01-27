import React, { Component } from 'react';
import ListItemEditable from './ListItemEditable.jsx';
import ListItemStatic from './ListItemStatic.jsx';
import AddItem from './AddItem.jsx';

class List extends Component {
  static displayName = 'List';

  constructor() {
    super();
    this.state = {
      items: [
        { guid: 22, text: 'serus', editable: false },
        { guid: 24, text: 'nazdar', editable: true }],
    };
    this._addItem = this._addItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._saveItem = this._saveItem.bind(this);
    this._toggleEditMode = this._toggleEditMode.bind(this);
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  _deleteItem(guid) {
    const items = this.state.items.filter(item => item.guid !== guid);
    this.setState({ items });
  }

  _addItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState({ items });
  }

  _saveItem(item, index) {
    const items = this.state.items;
    items[index] = item;
    this.setState({ items });
  }

  _toggleEditMode(item, index) {
    const items = this.state.items;
    items[index] = Object.assign({}, item, { editable: !item.editable });
    this.setState({ items });
  }

  _getItemToRender(item, index) {
    return (item.editable)
      ? (<ListItemEditable key={item.guid} item={item} onDelete={this._deleteItem} onSave={this._saveItem} onCancel={this._toggleEditMode} index={index} />)
      : (<ListItemStatic key={item.guid} item={item} onClick={this._toggleEditMode} index={index} />);
  }

  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <table className="table table-bordered">
            <tbody>
              {items.map(this._getItemToRender)}
              <AddItem addItem={this._addItem} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default List;
