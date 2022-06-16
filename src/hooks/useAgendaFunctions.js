import {
  _setLoading,
  _setAgenda,
  _addAgenda,
  _deleteAgenda,
  _updateAgenda,
  _setSeletedAgenda,
} from '../services/store/actions/agendaActions';
import { getStore } from '../services';

export default function useAgendaFunctions() {

  const importAgenda = (file) => {
    getStore().dispatch(_setLoading(true));

    const reader = new FileReader();
    let fileData = {};

    reader.readAsText(file, 'UTF-8');
    reader.onload = () => {
      fileData = reader.result;
      let res = {};
      try {
        res = JSON.parse(fileData);
      } catch (e) {
        console.log('File parsing error');
      }

      const data = [];
      if (!Array.isArray(res)) return;

      res.forEach(item => {
        if ( item.id && item.title ) {
          data.push({
            id: item.id,
            title: item.title ? item.title : '',
            description: item.description ? item.description : '',
            date: item.date ? item.date : ''
          });
        }
      });

      getStore().dispatch(_setAgenda(data));
      return data;
    }
  }
  const addAgenda = (item) => {
    if (!item.id) {
      item.id = Date.now();
    }
    getStore().dispatch(_addAgenda(item));
  };
  const deleteAgenda = (ids) => {
    getStore().dispatch(_deleteAgenda(ids));
  };
  const updateAgenda = (item) => {
    getStore().dispatch(_updateAgenda(item));
  };
  const setSelectedAgenda = (items) => {
    getStore().dispatch(_setSeletedAgenda(items));
  };

  const toReturn = {
    importAgenda,
    addAgenda,
    deleteAgenda,
    updateAgenda,
    setSelectedAgenda
  }
  return toReturn;
}

