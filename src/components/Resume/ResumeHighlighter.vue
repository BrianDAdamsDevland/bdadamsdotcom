<template>
  <div :class="wrapperClasses">
    <div class="highlight-control">
      <h5>
        <i class="fa-sharp fa-regular fa-eye"></i>
        Focus On
      </h5>
      <div class="highlight-cats">
        <div
          v-for="o in highlightCats"
          :key="o.label"
          @click="toggleHighlight(o.value)"
          :class="highlight === o.value ? 'active' : ''"
        >
          {{ o.label }}
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  name: "ResumeHighlighter",
  data() {
    return {
      highlight: "",
    };
  },
  methods: {
    toggleHighlight(highlight) {
      if (this.highlight === highlight) {
        this.highlight = "";
      } else {
        this.highlight = highlight;
      }
    },
  },
  computed: {
    wrapperClasses() {
      return this.highlight ? `highlight ${this.highlight}` : "";
    },
    highlightCats() {
      return [
        {
          label: "Vue.js",
          value: "vue",
        },
        {
          label: ".NET",
          value: "dotnet",
        },
        {
          label: "Management",
          value: "manage",
        },
        {
          label: "Operations",
          value: "ops",
        },
        {
          label: "AWS",
          value: "aws",
        },
        {
          label: "Mobile",
          value: "mobile",
        },
        {
          label: "React",
          value: "react",
        },
        {
          label: "Astro",
          value: "astro",
        },
        {
          label: "Database",
          value: "db",
        },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.highlight {
  ::v-deep(p),
  ::v-deep(li),
  ::v-deep(a) {
    color: var(--color-text-very-light);
    transition: all 0.3s;
  }

  &.vue ::v-deep(.vue),
  &.manage ::v-deep(.manage),
  &.ops ::v-deep(.ops),
  &.aws ::v-deep(.aws),
  &.dotnet ::v-deep(.dotnet),
  &.react ::v-deep(.react),
  &.astro ::v-deep(.astro),
  &.mobile ::v-deep(.mobile),
  &.db ::v-deep(.db) {
    color: var(--color-text);
    transition: all 0.3s;

    a {
      color: var(--color-text);
    }
  }
}

.highlight-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;

  div {
    cursor: pointer;
    border: 1px solid var(--color-card-border);
    padding: 3px 7px;
    border-radius: 4px;

    &.active {
      background: var(--color-active-selection-background);
      color: var(--color-active-selection-text);
    }
  }
}

.highlight-control {
  background: var(--color-subcard-background);
  padding: 10px;
  margin: -8px;
  text-align: center;

  h5 {
    margin-top: 0;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 0.5px;
  }
}
</style>
