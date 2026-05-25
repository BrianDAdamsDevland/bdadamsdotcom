<template>
  <div :class="wrapperClasses">
    <div class="highlight-control">
      <div class="hc-head">
        <span class="hc-stencil">FOCUS / ФОКУС</span>
        <h5>
          <i class="fa-sharp fa-regular fa-eye"></i>
          Filter dossier
        </h5>
      </div>
      <div class="highlight-cats">
        <div
          v-for="o in highlightCats"
          :key="o.label"
          @click="toggleHighlight(o.value)"
          :class="highlight === o.value ? 'cat active' : 'cat'"
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
        { label: "Astro", value: "astro" },
        { label: "Database", value: "db" },
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

    a { color: var(--color-text); }
  }
}

.highlight-control {
  background: var(--color-subcard-background);
  border: 2px solid var(--color-card-border);
  box-shadow: 5px 5px 0 var(--con-orange);
  padding: 14px 16px;
  margin: 0 0 22px;
  text-align: left;
  position: relative;
}

.hc-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.hc-stencil {
  background: var(--con-orange);
  color: var(--con-cream);
  padding: 3px 10px;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  letter-spacing: 0.22em;
  font-size: 0.7em;
}

h5 {
  margin: 0;
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 0.95em;
  color: var(--color-text);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.highlight-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.cat {
  cursor: pointer;
  border: 2px solid var(--color-card-border);
  background: var(--color-card-background);
  padding: 4px 10px;
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75em;
  font-weight: 500;
  transition: all 0.15s ease;
  color: var(--color-text);

  &:hover {
    background: var(--color-text);
    color: var(--color-card-background);
  }

  &.active {
    background: var(--con-orange);
    color: var(--con-cream);
    box-shadow: 3px 3px 0 var(--color-card-border);
    transform: translate(-1px, -1px);
  }
}
</style>
