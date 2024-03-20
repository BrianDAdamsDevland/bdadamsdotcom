<template>
  <div v-if="fixedLink" class="spacer"></div>

  <div
    id="menu-link"
    :class="{ float: fixedLink }"
    @click.prevent="handleShow"
    aria-label="Show Menu"
  >
    <h3>
      <div>
        <i class="fa-sharp fa-solid fa-bars"></i>
        <span>Menu</span>
      </div>
    </h3>
  </div>

  <Teleport to="body">
    <div v-if="show" :class="{ 'menu-wrapper': true, animate: shouldAnimate }">
      <div class="menu" @click.self="show = false">
        <div class="top-action">
          <AnimatedEntrance type="slideInDown">
            <ThemeToggle />
          </AnimatedEntrance>

          <AnimatedEntrance type="slideInDown" :delay="0.07">
            <div class="close" @click="show = false">
              <i class="fa-sharp fa-solid fa-x"></i>
            </div>
          </AnimatedEntrance>
        </div>

        <div class="primary">
          <AnimatedEntrance
            v-for="(l, index) in primaryLinks"
            :key="l.label"
            type="zoomIn"
            :delay="0.05 * index"
          >
            <h2>
              <a :href="l.href">{{ l.label }}</a>
            </h2>
          </AnimatedEntrance>
        </div>

        <div class="external">
          <AnimatedEntrance
            v-for="(l, index) in externalLinks"
            :key="l.label"
            client:load
            type="zoomIn"
            :delay="(index + 1) * 0.07"
          >
            <a :href="l.href">
              <i :class="`${l.icon} fa-fw`"></i>
              {{ l.label }}
            </a>
          </AnimatedEntrance>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import AnimatedEntrance from "./AnimatedEntrance.vue";
import ThemeToggle from "./ThemeToggle.vue";

export default {
  name: "Menu",
  props: {
    fixedLink: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
      shouldAnimate: false,
    };
  },
  computed: {
    primaryLinks() {
      return [
        {
          label: "Gallery",
          href: "/gallery/",
        },
        {
          label: "Resume",
          href: "/resume/",
        },
        {
          label: "Blog",
          href: "/blog/",
        },
      ];
    },
    externalLinks() {
      return [
        {
          label: "Email",
          href: "mailto:brian@bdadams.com",
          icon: "fa-sharp fa-solid fa-envelope",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/brian-d-adams-dev/",
          icon: "fa-brands fa-linkedin",
        },
        {
          label: "GitHub",
          href: "https://github.com/briandadams85",
          icon: "fa-brands fa-github",
        },
        {
          label: "Mastodon",
          href: "https://mstdn.party/@briandadams",
          icon: "fa-brands fa-mastodon",
        },
        {
          label: "Letterboxd",
          href: "https://letterboxd.com/briandadams/",
          icon: "fa-brands fa-letterboxd",
        },
      ];
    },
  },
  components: { AnimatedEntrance, ThemeToggle },
  methods: {
    handleShow() {
      this.show = true;

      setTimeout(() => {
        this.shouldAnimate = true;
      }, 10);
    },
  },
  watch: {
    show() {
      if (!this.show) {
        this.shouldAnimate = false;
        document.body.style.overflow = "inherit";
      } else {
        document.body.style.overflow = "hidden";
      }
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  font-size: 2em;
  margin-bottom: 10px;
}

#menu-link {
  text-align: center;
  margin: 0 auto;
  z-index: 1000;
  font-size: 17px;

  span {
    font-size: 0.75em;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.4px;
  }

  h3 {
    margin: 0;
    text-decoration: none;
    padding: 10px 40px;
    background: var(--color-menu-link-background);
    border-radius: 20px;
    color: var(--color-menu-link-text);
    text-align: center;

    font-size: 1.4em;
    line-height: 0;
    cursor: pointer;
    display: inline-block;

    div {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }

  &.float {
    position: fixed;
    right: 12px;
    top: 5px;
    text-shadow: 1px 1px 10px rgba(black, 0.2);
    font-size: 0.75em;
    transition: all 0.2s;

    h3 {
      padding: 7px 20px;
    }

    @media screen and (min-width: 1100px) {
      font-size: 0.95em;
    }
  }
}

.menu-wrapper {
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;

  transition: all 0.5s;
  opacity: 0;
  z-index: 1100;
  font-size: 17px;
  overflow-y: scroll;

  &.animate {
    background-color: var(--color-menu-background);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    opacity: 1;
  }
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100dvh;

  .close {
    background: var(--color-text);
    color: var(--color-active-selection-text);
    padding: 7px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  a {
    text-decoration: none;
    transition: all 0.1s;
    border-bottom: 5px solid transparent;

    &:hover {
      color: var(--color-primary);
      border-bottom: 4px solid;
      transition: all 0.1s;
    }
  }

  .top-action {
    padding: 10px;
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .primary {
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .external {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 20px;
    flex-shrink: 1;
    padding: 35px 0;

    a {
      display: flex;
      gap: 5px;
      align-items: center;
      border-bottom: 2px solid transparent;

      &:hover {
        border-bottom: 2px solid;
      }
    }
  }
}

.spacer {
  height: 10px;
}
</style>
