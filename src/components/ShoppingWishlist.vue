<template>
  <div>
    <div class="container">
      <h1 class="h4 mb-4">My Wishlist</h1>
      <div class="table-responsive">
        <table id="cart" class="table table-hover">
          <thead>
            <tr>
              <th style="width:52%">Product</th>

              <!-- <th style="width:8%">Quantity</th>
              <th style="width:17%" class="text-right">Price</th>
              <th style="width:15%" class="text-right">Subtotal</th> -->
              <th style="width:8%" class="text-right"></th>
            </tr>
          </thead>

          <transition-group name="list-shopping-cart" tag="tbody">
            <app-wishlist-item
              v-for="wishlistItem in wishlist"
              :wishlist="wishlistItem"
              :key="wishlistItem.id"
            ></app-wishlist-item>
          </transition-group>

          <!-- <tfoot>
            <tr class="d-table-row d-sm-none">
              <td class="text-right" colspan="4">
                <strong>Total ${{ cartValue }}</strong>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td class="text-right">
                <strong class="d-none d-sm-block ">Total</strong>
              </td>
              <td class="text-right">
                <strong>${{ cartValue }}</strong>
              </td>
              <td></td>
            </tr>
          </tfoot> -->
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WishlistItem from "./wishlist/WishlistItem.vue";
export default {
  computed: {
    ...mapGetters([
      "wishlist",
      "isLoggedIn",
      "products",
      "currentUser",
      "cartValue",
    ]),
  },
  components: {
    appWishlistItem: WishlistItem,
  },
  methods: {
    ...mapActions([
      "saveShoppingCart",
      "addMessage",
      "saveToTransaction",
      "clearCart",
    ]),
    checkValidCart(itemList, prodList) {
      let isValid = true;
      let message = "";

      itemList.map((item) => {
        for (let prodIdx = 0; prodIdx < prodList.length; prodIdx++) {
          if (prodList[prodIdx].id == item.id) {
            if (prodList[prodIdx].quantity < item.quantity) {
              message = `Only ${prodList[prodIdx].quantity} ${item.title} available in stock`;
              isValid = false;
              return;
            }
            break;
          }
        }
      });
      return {
        isValid,
        message,
      };
    },
    saveShoppingCartLocal() {
      if (this.isLoggedIn) {
        let { isValid, message } = this.checkValidCart(
          this.wishlist,
          this.products
        );

        if (isValid) {
          this.saveShoppingCart({
            wishlist: this.wishlist,
            uid: this.currentUser.uid,
          }).then(() => {
            this.addMessage({
              messageClass: "success",
              message: "Your shopping cart is saved successfully",
            });
            this.$router.push("/");
          });
        } else {
          this.addMessage({
            messageClass: "danger",
            message: message,
          });
        }
      } else {
        this.addMessage({
          messageClass: "warning",
          message: "Please login to save your cart",
        });
      }
    },
    checkout() {
      if (this.isLoggedIn) {
        if (!this.wishlist || this.wishlist.length == 0) {
          this.addMessage({
            messageClass: "warning",
            message: "Your cart is empty!",
          });
          return;
        }
        let { isValid, message } = this.checkValidCart(
          this.wishlist,
          this.products
        );

        if (isValid) {
          this.saveToTransaction({
            wishlist: this.wishlist,
            uid: this.currentUser.uid,
          }).then(() => {
            this.addMessage({
              messageClass: "success",
              message: "Your order has been successfully processed!",
            });
            this.saveShoppingCart({
              wishlist: [],
              uid: this.currentUser.uid,
            });
            this.clearCart();
            this.$router.push("/");
          });
        } else {
          this.addMessage({
            messageClass: "danger",
            message: message,
          });
        }
      } else {
        this.addMessage({
          messageClass: "warning",
          message: "Please login to checkout",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-shopping-cart-leave-active {
  transition: all 0.4s;
}

.list-shopping-cart-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.table-sm {
  font-size: 0.875rem;
  ::v-deep h4 {
    font-size: 1.25rem;
  }
}
</style>
