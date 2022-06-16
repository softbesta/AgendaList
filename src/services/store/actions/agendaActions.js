import {
  IS_LOADING,
  AGENDA_SET,
  AGENDA_ADD,
  AGENDA_DELETE,
  AGENDA_UPDATE,
  AGENDA_SELETED,
} from '../types';

export const _setLoading = (loading) => {
  return {
    type: IS_LOADING,
    payload: loading
  };
};

export const _setAgenda = (data) => {
  return {
    type: AGENDA_SET,
    payload: data
  };
}

export const _addAgenda = (item) => {
  return {
    type: AGENDA_ADD,
    payload: item
  };
}
export const _deleteAgenda = (ids) => {
  return {
    type: AGENDA_DELETE,
    payload: ids
  };
}
export const _updateAgenda = (item) => {
  return {
    type: AGENDA_UPDATE,
    payload: item
  };
}
export const _setSeletedAgenda = (items) => {
  return {
    type: AGENDA_SELETED,
    payload: items
  };
}

