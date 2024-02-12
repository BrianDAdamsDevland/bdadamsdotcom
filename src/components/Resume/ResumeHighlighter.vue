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
        { label: "Vue.js", value: "vue" },
        { label: ".NET", value: "dotnet" },
        { label: "Management", value: "manage" },
        { label: "Operations", value: "ops" },
        { label: "AWS", value: "aws" },
        { label: "Mobile", value: "mobile" },
        { label: "React", value: "react" },
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

<style scoped>
.highlight ::v-deep(p),
.highlight ::v-deep(li) {
  color: var(--color-text-very-light);
  transition: all 0.3s;
}

.highlight.vue ::v-deep(.vue),
.highlight.manage ::v-deep(.manage),
.highlight.ops ::v-deep(.ops),
.highlight.aws ::v-deep(.aws),
.highlight.dotnet ::v-deep(.dotnet),
.highlight.react ::v-deep(.react),
.highlight.astro ::v-deep(.astro),
.highlight.mobile ::v-deep(.mobile),
.highlight.db ::v-deep(.db) {
  color: var(--color-text);
  transition: all 0.3s;
}

.highlight-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.highlight-cats div {
  cursor: pointer;
  border: 1px solid var(--color-card-border);
  padding: 3px 7px;
  border-radius: 4px;
}

.highlight-cats div.active {
  background: var(--color-active-selection-background);
  color: var(--color-active-selection-text);
}

.highlight-control {
  background: var(--color-subcard-background);
  padding: 10px;
  margin: -8px;
  text-align: center;
}

.highlight-control h5 {
  margin-top: 0;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.5px;
}
</style>
