<template>
<div class="container" :class="{loadingItem: isProductLoading}">
  <div class="row text-center" v-if="isProductLoading">
    <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
  </div>
  <div v-else class="action-panel">
    <div class="d-flex flex-wrap align-items-center mb-4">
      <h1 class="h3">Category</h1>
      <div class="filter-group ml-auto ">
        <select class="custom-select custom-select-sm">
          <option>-- Sort By --</option>
          <option>Popularity</option>
          <option>Price low to high</option>
          <option>Price high to low</option>
          <option>Newest First</option>
        </select>
      </div>
      <div class="btn-group btn-group-sm ml-3">
				<button id="list" class="btn btn-outline-dark" @click.prevent="changeDisplay(true)">
          <i class="la la-list la-lg" aria-hidden="true"></i>
           <!-- List -->
				</button>
				<button id="grid" class="btn btn-outline-dark" @click.prevent="changeDisplay(false)">
          <i class="la la-th la-lg" aria-hidden="true"></i> 
          <!-- Grid -->
				</button>
      </div>
    </div>
  </div>
  <div class="row m-n2" v-if="!isProductLoading">
    <app-product-item v-for="prod in products" :item="prod" :key="prod.id" :displayList="displayList"></app-product-item>
  </div>
  <nav class="border-top pt-4 mt-4 d-flex justify-content-between align-items-center" aria-label="Page navigation example" v-if="!isProductLoading">
    <p>Page 1 of 7</p>
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item active"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from './product/ProductItem.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

export default {
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      displayList: false
    }
  },
  computed: {
    ...mapGetters(['products', 'isProductLoading']),
  },
  components: {
    appProductItem: ProductItem,
    GridLoader
  },
  methods: {
    changeDisplay(isList) {
      this.displayList = isList;
    }
  }
}
</script>

<style>
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>
