<template>
  <div>
  <component
    :is="titleWrapper"
    @click="collapsed = !collapsed"
    class="title-wrapper"
  >
    <i
      :class="{
        'fa-sharp fa-solid fa-chevron-right fa-sm': true,
        'fa-rotate-90': !collapsed,
      }"
    ></i>
    <div>
      {{ title }}
      <small>{{ subtitle }}</small>
    </div>
  </component>

  <div v-if="!collapsed" class="content">
    <AnimatedEntrance>
      <slot />
    </AnimatedEntrance>
    
  </div>
</div>
</template>

<script>
import AnimatedEntrance from './AnimatedEntrance.vue';

export default {
    name: "Collapser",
    props: {
        title: String,
        subtitle: String,
        titleWrapper: {
            type: String,
            default: "h3",
        },
    },
    data() {
        return {
            collapsed: false,
        };
    },
    components: { AnimatedEntrance }
};
</script>

<style scoped lang="scss">
.title-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;

    small {
      font-weight: 400;
    }
  }
}

h3 {
  position: sticky;
  top: 0;
  background-color: var(--color-card-background);
  z-index: 800;
  padding: 4px;
}

h4 {
  position: sticky;
  top: 30px;
  background-color: var(--color-card-background);
  z-index: 800;
  padding: 2px;
  margin-bottom: 0;
}

@media (min-width: 500px) {
  .content {
    margin-left: 24px;
  }
}
</style>
