<template>
  <tr>
    <td data-th="Product">
      <div class="row">
        <div class="col-sm-2 d-none d-sm-block">
          <img :src="wishlist.thumbnail_url" alt="..." class="img-fluid" />
        </div>
        <div class="col-sm-10">
          <h5>{{ wishlist.title }}</h5>
          <p>{{ wishlist.description }}</p>
        </div>
      </div>
    </td>
    <!-- <td data-th="Quantity">
      <input
        type="number"
        class="form-control text-center"
        :value="wishlist.quantity"
        @input="updateQuantity"
        min="0"
      />
    </td> -->
    <td data-th="Price" class="text-right">{{ wishlist.price }}</td>

    <td data-th="Subtotal" class="text-right">${{ subtotal }}</td>
    <td class="actions text-right" data-th="">
      <button class="btn btn-link text-muted btn-sm" @click="removeItem()">
        <i class="la la-trash-o la-lg"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["wishlist"],
  computed: {
    subtotal() {
      return this.wishlist.quantity * this.wishlist.price;
    },
  },
  methods: {
    ...mapActions(["updateWishlist", "removeItemInWishlist"]),
    removeItem() {
      let vm = this;
      this.removeItemInWishlist({
        item: vm.wishlist,
      });
    },
    updateQuantity(event) {
      let vm = this;
      this.updateWishlist({
        item: vm.wishlist,
        quantity: parseInt(event.target.value),
        isAdd: false,
      });
    },
  },
};
</script>
