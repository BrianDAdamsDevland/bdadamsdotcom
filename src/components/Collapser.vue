<template>
  <div class="collapser">
    <component
      :is="titleWrapper"
      @click="collapsed = !collapsed"
      class="title-wrapper"
      :class="{ collapsed }"
    >
      <span class="chev" aria-hidden="true">
        <i
          :class="{
            'fa-sharp fa-solid fa-chevron-right': true,
            'fa-rotate-90': !collapsed,
          }"
        ></i>
      </span>
      <span class="title-text">
        {{ title }}
        <small v-if="subtitle">{{ subtitle }}</small>
      </span>
      <span class="title-bar" aria-hidden="true"></span>
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
.collapser { margin-bottom: 18px; }

.title-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-card-background);
  padding: 6px 0;
  z-index: 800;
  position: sticky;
  top: 0;
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  user-select: none;

  .chev {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: var(--con-orange);
    color: var(--con-cream);
    border: 2px solid var(--color-card-border);
    font-size: 0.65em;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  .title-text {
    display: flex;
    flex-direction: column;
    line-height: 1.05;

    small {
      font-weight: 400;
      font-size: 0.65em;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
      text-transform: uppercase;
    }
  }

  .title-bar {
    flex: 1;
    height: 4px;
    background: repeating-linear-gradient(
      90deg,
      var(--color-text) 0 8px,
      transparent 8px 14px
    );
  }

  &:hover .chev {
    transform: rotate(-90deg);
    background: var(--con-black);
  }
  &:hover.collapsed .chev,
  &.collapsed:hover .chev { transform: rotate(0); }
}

h4.title-wrapper {
  top: 38px;
  font-size: 1.05em;

  .chev {
    width: 22px;
    height: 22px;
    background: var(--con-yellow);
    color: var(--con-black);
  }
}

.content {
  padding: 14px 0 4px;
}

@media screen and (min-width: 500px) {
  .content {
    margin-left: 30px;
  }
}
</style>
