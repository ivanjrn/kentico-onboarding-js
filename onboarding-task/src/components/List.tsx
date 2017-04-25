import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
const Loader = require('react-loader');
import { ListItem } from '../containers/ListItem';
import { AddItem } from './AddItem';
import { List as ImmutableList, Set } from 'immutable';
import { ErrorBox } from './ErrorBox';
import { IAction } from '../actions/IAction';

interface IListProps {
  itemsOrder: Set<string>;
  onAddItem: (text: string) => Promise<any>;
  fetchItems: () => Promise<any>;
  loaded: boolean;
  errors: ImmutableList<string>;
  onDeleteError: (guid: number) => IAction;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';
  static propTypes = {
    itemsOrder: ImmutablePropTypes.orderedSet.isRequired,
    onAddItem: React.PropTypes.func.isRequired,
    fetchItems: React.PropTypes.func.isRequired,
    loaded: React.PropTypes.bool.isRequired,
    errors: ImmutablePropTypes.list.isRequired,
    onDeleteError: React.PropTypes.func.isRequired,
  };

  constructor(props: IListProps) {
    super(props);

  }

  componentWillMount() {
    this.props.fetchItems();
  }


  render() {
    const items = this.props.itemsOrder.valueSeq();
    return (
    <div className="row">
      {this.props.errors.map((error: string, index: number) =>
        <ErrorBox key={index} index={index} error={error} deleteError={this.props.onDeleteError} />
      )}
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <Loader loaded={this.props.loaded}>
          <table className="table table-bordered">
              <tbody>
            {items.map((guid: string, index: number) =>
              <ListItem guid={guid} key={guid} index={index} />
            )}
            <AddItem onItemAdd={this.props.onAddItem} />
            </tbody>
          </table>
        </Loader>
      </div>
    </div>
  );
  }
}

export { List };
