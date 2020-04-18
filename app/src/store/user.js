import axios from '../config/axios';

export default {
  namespaced: true,
  state: {
    users: [],
    totalPages: 0,
    errors: [],
    loading: false,
    showCreateDialog: false,
    isStoring: false,
    showEditDialog: false,
    isUpdating: false,
    userToEdit: {},
    showDeleteDialog: false,
    isDeleting: false,
    userToDelete: {},
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setTotalPages(state, payload) {
      state.totalPages = payload;
    },
    pushUser(state, payload) {
      state.users.unshift(payload);
    },
    setShowCreateDialog(state, payload) {
      state.showCreateDialog = payload;
    },
    setIsStoring(state, payload) {
      state.isStoring = payload;
    },
    setShowEditDialog(state, payload) {
      state.showEditDialog = payload;
    },
    setIsUpdating(state, payload) {
      state.isUpdating = payload;
    },
    setUserToEdit(state, payload) {
      state.userToEdit = payload
    },
    updateUser(state, payload) {
      Object.assign(state.users[payload.index], payload);
    },
    setShowDeleteDialog(state, payload) {
      state.showDeleteDialog = payload;
    },
    setIsDeleting(state, payload) {
      state.isDeleting = payload;
    },
    setUserToDelete(state, payload) {
      state.userToDelete = payload
    },
    deleteUser(state, payload) {
      state.users.splice(payload, 1);
    },
    setErrors(state, payload) {
      state.errors = payload;
    }
  },
  actions: {
    async index({commit}, payload) {
      try {
        commit('setLoading', true);
        const response = await axios.get(`/users?page=${payload.page}`);
        commit('setUsers', response.data.users);
        commit('setTotalPages', response.data.meta.links.length);
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
      }
    },
    showCreateDialog({commit}, payload) {
      commit('setErrors', []);
      commit('setShowCreateDialog', payload);
    },
    async store({commit}, payload) {
      try {
        commit('setIsStoring', true);
        const response = await axios.post('/users', payload);
        commit('pushUser', response.data);
        commit('setIsStoring', false);
        commit('setShowCreateDialog', false);
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsStoring', false);
      }
    },
    showEditDialog({commit}, payload) {
      commit('setErrors', []);
      commit('setShowEditDialog', payload);
    },
    setUserToEdit({commit}, payload) {
      commit('setUserToEdit', payload);
    },
    async update({commit}, payload) {
      try {
        commit('setIsUpdating', true);
        const response = await axios.put(`/users/${payload.id}`, payload);
        let userUpdated = response.data;
        userUpdated.index = payload.index;
        commit('setIsUpdating', false);
        commit('setShowEditDialog', false);
        commit('updateUser', userUpdated);
        commit('setUserToEdit', {});
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsUpdating', false);
      }
    },
    showDeleteDialog({commit}, payload) {
      commit('setErrors', []);
      commit('setShowDeleteDialog', payload);
    },
    setUserToDelete({commit}, payload) {
      commit('setUserToDelete', payload);
    },
    async destroy({dispatch, commit, getters}, payload) {
      try {
        commit('setIsDeleting', true);
        await axios.delete(`users/${payload.id}`);
        commit('setIsDeleting', false);
        commit('setShowDeleteDialog', false);
        commit('deleteUser', payload.index);
        if(getters.getCount === 0) {
          dispatch('index', {page: 1});
        }
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsDeleting', false);
      }
    }
  },
  getters: {
    getCount: state => state.users.length
  }
}
