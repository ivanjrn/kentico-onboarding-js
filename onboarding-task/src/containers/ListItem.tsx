import * as memoize from 'memoizee';
import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { toggleEditMode, updateItemText, deleteItem } from '../actions/actionCreators';
import { IItemRecord } from '../models/ItemRecord';
import { IAppState } from '../models/IAppState';
import { Dispatch } from '../actions/Dispatch';

interface IListItemOwnProps {
  index: number;
  guid: string;
}

const selectViewItem = (itemData: IItemRecord, itemFlags: IItemFlags, index: number) => ({
  guid: itemData.guid,
  text: itemData.text,
  isEdited: itemFlags.isEdited,
  index,
});
const memoizedSelectViewItem = memoize(selectViewItem);

const mapStateToProps = (state: IAppState, ownProps: IListItemOwnProps) => {
  const itemData = state.itemsById.get(ownProps.guid);
  const itemFlags = state.itemsFlags.get(ownProps.guid);
  const index = ownProps.index;

  return {
    item: memoizedSelectViewItem(itemData, itemFlags, index),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemOwnProps) => {
  return {
    onToggleEditMode: () => dispatch(toggleEditMode(ownProps.guid)),
    onUpdateText: (text: string) => dispatch(updateItemText(ownProps.guid, text)),
    onDelete: () => dispatch(deleteItem(ownProps.guid)),
  };
};

const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);

export { ListItem, selectViewItem };
