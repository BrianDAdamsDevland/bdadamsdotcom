<template>
  <div class="demo-card">
    <h4>Test Component (Vue)</h4>

    <input type="search" placeholder="Filter Table" v-model="query" />

    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in filteredData">
          <td>{{ d.firstName }}</td>
          <td>{{ d.lastName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "VueExperiment",
  data() {
    return {
      query: "",
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasQuery() {
      return !!this.query.trim();
    },
    filteredData() {
      if (!this.hasQuery) return this.data;

      const queryTerms = this.query.toLowerCase().split(" ");

      return this.data.filter((d) =>
        queryTerms.every(
          (qt) =>
            d.firstName.toLowerCase().includes(qt) ||
            d.lastName.toLowerCase().includes(qt)
        )
      );
    },
  },
};
</script>
