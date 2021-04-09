<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary" role="navigation">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <router-link to="/" class="navbar-brand mr-auto"
        >Online Store</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTop"
        aria-controls="navbarTop"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarTop"
        :class="{ show: isNavOpen }"
      >
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="nav navbar-nav align-items-md-center">
          <!-- <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
          <a class="nav-link">Login</a>
        </router-link>
        <li v-if="isLoggedIn" class="li-pointer nav-item">
          <a @click="logout" class="nav-link">Logout {{ userEmail }}</a>
        </li>
        <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
          <a class="nav-link">Register</a>
        </router-link> -->
          <li class="nav-item">
            <router-link to="/wishlist" class="nav-link navbar-btn" tag="a">
              <i class="la la-heart-o la-2x align-middle"></i> Wishlist
              <span class="badge badge-light badge-pill"
                >{{ numWishItems }}
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link navbar-btn" tag="a">
              <i class="la la-shopping-cart la-2x align-middle"></i> Cart
              <span class="badge badge-light ml-1"
                >{{ numCartItems }} ($ {{ cartValue }})</span
              >
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- /.container -->
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isNavOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "currentUser",
      "cartItemList",
      "wishlist",
      "cartValue",
    ]),
    numCartItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total;
      }, 0);
    },
    numWishItems() {
      return this.wishlist.length;
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
  },
  methods: {
    ...mapActions(["logout"]),
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>

<style scoped lange="sass">
.navbar-btn a {
  color: white;
}

.li-pointer {
  cursor: pointer;
}

.li-pointer:hover {
  cursor: pointer;
}
</style>
