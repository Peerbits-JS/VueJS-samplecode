const state = {
  wishlist: [],
};

const mutations = {
  UPDATE_WISHLIST(state, { item, quantity, isAdd }) {
    const record = state.wishlist.find((element) => element.id == item.id);
    if (record) {
      if (isAdd) {
        record.quantity += 1;
      } else {
        record.quantity = 1;
      }
    } else {
      state.wishlist.push({
        ...item,
        quantity,
      });
    }
  },
  SET_WISHLIST(state, productList) {
    if (productList) {
      state.wishlist = productList;
    }
  },
  REMOVE_WISHLIST_ITEM(state, { item }) {
    const record = state.wishlist.find((element) => element.id == item.id);
    state.wishlist.splice(state.wishlist.indexOf(record), 1);
  },
};

const actions = {
  clearCart: ({ commit }) => {
    commit("SET_WISHLIST", []);
  },
};

const getters = {
  wishlist: (state) => {
    return state.wishlist;
  },
  wishlistValue: (state) => {
    let res = 0;
    state.wishlist.map((item) => {
      res += item.price * item.quantity;
    });
    return res;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
