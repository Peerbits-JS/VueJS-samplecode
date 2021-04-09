import { ref, firebaseAuth } from "../config/firebaseConfig";

export const updateCart = ({ commit }, { item, quantity, isAdd }) => {
  // TODO: Call service
  commit("UPDATE_CART", { item, quantity, isAdd });
  if (isAdd) {
    let message_obj = {
      message: `Add ${item.title} to cart successfully`,
      messageClass: "success",
      autoClose: true,
    };
    commit("ADD_MESSAGE", message_obj);
  }
};

export const updateWishlist = ({ commit }, { item, quantity, isAdd }) => {
  // TODO: Call service
  commit("UPDATE_WISHLIST", { item, quantity, isAdd });
  if (isAdd) {
    let message_obj = {
      message: `Add ${item.title} to wishlist successfully`,
      messageClass: "success",
      autoClose: true,
    };
    commit("ADD_MESSAGE", message_obj);
  }
};

export const removeItemInCart = ({ commit }, { item }) => {
  commit("REMOVE_CART_ITEM", { item });
};

export const removeItemInWishlist = ({ commit }, { item }) => {
  commit("REMOVE_WISHLIST_ITEM", { item });
};

export const registerByEmail = (_, { email, password }) => {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
};

export const logout = ({ commit }) => {
  commit("SET_CART", []); // clear current cart
  commit("SET_WISHLIST", []); // clear current cart
  return firebaseAuth().signOut();
};

export function loginWithEmail(_, { email, password }) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function listenToProductList({ commit }) {
  return ref.child("products").on("value", (products) => {
    console.log(products, "products");
  });
}

export function getShoppingCart({ commit }, { uid, currentCart }) {
  if (uid) {
    return ref
      .child("cart/" + uid)
      .once("value")
      .then((cart) => {
        // console.log(cart.val());
        if (cart.val() && (!currentCart || currentCart.length == 0)) {
          commit("SET_CART", cart.val());
        }
      });
  } else {
    // console.log("User has not logged in");
  }
}

export function getShoppingWishList({ commit }, { uid, currentWishlist }) {
  if (uid) {
    return ref
      .child("wishlist/" + uid)
      .once("value")
      .then((wishlist) => {
        // console.log(wishlist.val());
        if (
          wishlist.val() &&
          (!currentWishlist || currentWishlist.length == 0)
        ) {
          commit("SET_WISHLIST", wishlist.val());
        }
      });
  } else {
    // console.log("User has not logged in");
  }
}

export function saveShoppingCart(_, { uid, cartItemList }) {
  // console.log("ACTIONS saveShoppingCart");
  // console.log("CART DATA", cartItemList);
  return ref.child("cart/" + uid).set(cartItemList);
}

export function saveShoppingWishlist(_, { uid, wishlist }) {
  // console.log("ACTIONS saveShoppingWishlist");
  // console.log("CART DATA", wishlist);
  return ref.child("wishlist/" + uid).set(wishlist);
}

export function saveToTransaction(_, { uid, cartItemList }) {
  let newTransactionKey = ref.child("transactions").push().key;
  var newTransaction = {};
  newTransaction[
    "/transactions/" + uid + "/" + newTransactionKey
  ] = cartItemList;
  return ref.update(newTransaction);
}
