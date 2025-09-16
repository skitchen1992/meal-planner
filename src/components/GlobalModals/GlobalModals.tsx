import { Fragment } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createDish, removeDish, updateDish } from '../../features/dishes/dishesSlice';
import {
  closeModal,
  selectAddDishModal,
  selectConfirmDeleteDishModal,
} from '../../features/ui/uiSlice';

import AddDishDialog from './AddDishDialog';
import ConfirmDeleteDishDialog from './ConfirmDeleteDishDialog';

function GlobalModals() {
  const dispatch = useAppDispatch();

  const addDishModal = useAppSelector(selectAddDishModal);
  const confirmDeleteDishModal = useAppSelector(selectConfirmDeleteDishModal);

  return (
    <Fragment>
      <AddDishDialog
        open={addDishModal.opened}
        onClose={() => dispatch(closeModal({ type: 'addDish' }))}
        mode={typeof addDishModal.data?.index === 'number' ? 'edit' : 'add'}
        initialValues={addDishModal.data?.dish}
        onSubmit={(dish) => {
          const data = addDishModal.data;
          if (data && typeof data.index === 'number') {
            dispatch(updateDish({ index: data.index, dish }));
          } else {
            dispatch(createDish(dish));
          }
          dispatch(closeModal({ type: 'addDish' }));
        }}
      />

      <ConfirmDeleteDishDialog
        open={confirmDeleteDishModal.opened}
        name={confirmDeleteDishModal.data?.name ?? 'блюдо'}
        onCancel={() => dispatch(closeModal({ type: 'confirmDeleteDish' }))}
        onConfirm={() => {
          const data = confirmDeleteDishModal.data;
          if (data && typeof data.index === 'number') {
            dispatch(removeDish(data.index));
          }
          dispatch(closeModal({ type: 'confirmDeleteDish' }));
        }}
      />
    </Fragment>
  );
}

export default GlobalModals;
