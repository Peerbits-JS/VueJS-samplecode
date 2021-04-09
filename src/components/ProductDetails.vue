<template>
  <div class="container">
    <div v-if="isProductLoading" class="text-center">
      <grid-loader
        :loading="isProductLoading"
        :color="loaderColor"
        :size="loaderSize"
        class="d-inline-block"
      />
    </div>
    <div v-else>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="card intrinsic">
            <div class="card-body">
              <img
                class="img-fluid intrinsic-item"
                :src="item.thumbnail_url"
                alt=""
              />
            </div>
          </div>
          <div class="mt-3 form-row">
            <div class="col-md-6">
              <button
                class="btn btn-warning py-3 btn-block btn-lg mb-3"
                @click="addWishlistItem"
              >
                <i class="la la-heart-o la-lg"></i>
                Add to wishlist
              </button>
            </div>
            <div class="col-md-6 mb-3">
              <button
                class="btn btn-secondary btn-block py-3 btn-lg"
                @click="addItem"
                :disabled="item.quantity === 0"
              >
                <i class="la la-shopping-cart la-lg"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="caption-full">
            <h3 class="mb-3">{{ item.title }}</h3>
            <h6 class="card-subtitle mb-3 text-danger">
              {{ item.quantity }} left in stock
            </h6>
            <p>{{ item.description }}</p>
            <p class="text-success font-w-500">Extra ₹5000 off</p>
            <h4 class="mb-4">
              <span class="font-weight-bold">{{
                item.retail_price.formatted_value
              }}</span>
              <small class="product__price--strike text-muted ml-1">$210</small>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
  components: {
    GridLoader,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
    };
  },
  computed: {
    ...mapGetters(["isProductLoading", "products"]),
    item() {
      let id = this.$route.params.id;
      if (id) {
        let filterArr = this.products.filter((item) => {
          return item.uuid == id;
        });
        if (filterArr.length > 0) {
          return filterArr[0];
        }
      }
      return {};
    },
  },
  methods: {
    ...mapActions(["updateCart", "updateWishlist"]),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true,
      };
      // console.log(order);
      this.updateCart(order);
    },
    addWishlistItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true,
      };
      // console.log(order);
      this.updateWishlist(order);
    },
  },
};
</script>

<style scoped>
.caption-full {
}
.product__price--strike {
  text-decoration: line-through;
}
.ratings {
  padding-right: 10px;
  padding-left: 10px;
  color: #d17581;
}
</style>
