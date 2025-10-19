<template>
  <div v-if="fixedLink" class="spacer"></div>

  <div
    id="menu-link"
    :class="{ float: fixedLink, open: isOpen }"
    @click.prevent="isOpen ? handleClose() : handleShow($event)"
    :aria-label="isOpen ? 'Close Menu' : 'Show Menu'"
    :aria-expanded="isOpen"
  >
    <h3>
      <div>
        <i
          :class="
            isOpen
              ? 'fa-sharp fa-solid fa-circle-xmark'
              : 'fa-sharp fa-solid fa-bars'
          "
        ></i>
        <span>Menu</span>
      </div>
    </h3>
  </div>

  <Teleport to="body">
    <div
      v-if="show"
      :class="{
        'menu-wrapper': true,
        animate: shouldAnimate,
        'float-menu': buttonPosition.isFloat,
        'center-menu': !buttonPosition.isFloat,
      }"
      :style="{
        '--menu-origin-x': buttonPosition.x + 'px',
        '--menu-origin-y': buttonPosition.y + 'px',
      }"
    >
      <div class="menu-backdrop" @click="handleClose"></div>
      <div class="menu" @click.self="handleClose">
        <div class="profile-section">
          <div class="profile-avatar">
            <img
              :src="headshotSrc"
              alt="Brian D. Adams"
              width="60"
              height="60"
            />
          </div>
          <div class="profile-initials">BDA</div>
        </div>
        <div class="top-action">
          <AnimatedEntrance type="slideInDown" :delay="0.03">
            <div class="accessory">
              <ThemeToggle />
            </div>
          </AnimatedEntrance>

          <AnimatedEntrance type="slideInDown" :delay="0.05">
            <a class="accessory" href="/search/" title="Search">
              <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
            </a>
          </AnimatedEntrance>

          <AnimatedEntrance type="slideInDown" :delay="0.07">
            <div class="accessory" @click="handleClose" title="Close Menu">
              <i class="fa-sharp fa-solid fa-circle-xmark"></i>
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
              <a :href="l.href" data-astro-prefetch="tap">{{ l.label }}</a>
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

        <div class="theme-toggle">
          <AnimatedEntrance type="slideInUp"> </AnimatedEntrance>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import AnimatedEntrance from "./AnimatedEntrance.vue";
import ThemeToggle from "./ThemeToggle.vue";
import headshotImage from "../assets/headshot.png";

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
      isOpen: false,
      buttonPosition: { x: 0, y: 0, width: 0, height: 0, isFloat: true },
      headshotSrc: headshotImage.src,
    };
  },
  computed: {
    primaryLinks() {
      return [
        {
          label: "Resume",
          href: "/resume/",
        },
        {
          label: "Portfolio",
          href: "/portfolio/",
        },
        {
          label: "Blog",
          href: "/blog/",
        },
        {
          label: "Recommended",
          href: "/recommended/",
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
  mounted() {
    window.addEventListener("resize", this.updateMenuPosition);
    window.addEventListener("orientationchange", this.updateMenuPosition);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateMenuPosition);
    window.removeEventListener("orientationchange", this.updateMenuPosition);
  },
  methods: {
    handleShow(event) {
      // Calculate button position from the clicked element
      const button = event.currentTarget;
      if (button) {
        const rect = button.getBoundingClientRect();

        // Adjust positioning based on whether it's the float (fixed) button or centered button
        const isFloat = this.fixedLink;

        this.buttonPosition = {
          x: isFloat ? rect.right : rect.left + rect.width / 2,
          y: isFloat ? rect.bottom : rect.top - 10,
          width: rect.width,
          height: rect.height,
          isFloat: isFloat,
        };
      }

      this.show = true;
      this.isOpen = true;

      setTimeout(() => {
        this.shouldAnimate = true;
      }, 50);
    },
    updateMenuPosition() {
      if (this.show) {
        // Re-calculate position if menu is open and viewport changes
        const button = document.querySelector("#menu-link");
        if (button) {
          const rect = button.getBoundingClientRect();
          const isFloat = this.fixedLink;

          this.buttonPosition = {
            x: isFloat ? rect.right : rect.left + rect.width / 2,
            y: isFloat ? rect.bottom : rect.top - 10,
            width: rect.width,
            height: rect.height,
            isFloat: isFloat,
          };
        }
      }
    },
    handleClose() {
      this.shouldAnimate = false;
      this.isOpen = false;
      setTimeout(() => {
        this.show = false;
      }, 400);
    },
  },
  watch: {
    show() {
      if (!this.show) {
        document.body.style.overflow = "inherit";
      } else {
        document.body.style.overflow = "hidden";
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
    transition: all 0.3s ease;

    div {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }

  &:hover h3 {
    transform: scale(1.05);
  }

  &.open h3 {
    transform: scale(0.95);
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  z-index: 1100;
  font-size: 17px;
  pointer-events: none;

  &.animate {
    pointer-events: all;
  }
}

.menu-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  opacity: 0;
  transition: opacity 0.3s ease;

  .menu-wrapper.animate & {
    opacity: 1;
  }
}

.menu {
  position: fixed;
  width: 320px;
  max-width: calc(100vw - 20px);
  background: var(--color-menu-background);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--color-card-border);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  padding: 20px;
  transform: scale(0.1) rotate(-8deg) translateY(10px);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;

  /* Float button positioning (top-right) */
  top: calc(var(--menu-origin-y, 60px) - 10px);
  right: calc(100vw - var(--menu-origin-x, 60px) + 10px);
  transform-origin: top right;

  /* Center button positioning (above button, centered) */
  .center-menu & {
    bottom: calc(100vh - var(--menu-origin-y, 60px) + 20px);
    left: calc(var(--menu-origin-x, 50vw) - 160px);
    left: max(calc(var(--menu-origin-x, 50vw) - 160px), 15px);
    top: auto;
    right: auto;
    transform-origin: bottom center;
    transform: scale(0.1) rotate(-8deg) translateY(-10px);
  }

  .menu-wrapper.animate & {
    transform: scale(1) rotate(0deg) translateY(0);
    opacity: 1;
  }

  .menu-wrapper.animate .center-menu & {
    transform: scale(1) rotate(0deg) translateY(0);
  }

  @media screen and (max-width: 600px) {
    width: 280px;
    padding: 18px;
    gap: 18px;

    .primary h2 {
      font-size: 1.6em;
    }
  }

  @media screen and (max-width: 480px) {
    /* Simplified positioning - always center on small screens */
    left: 15px !important;
    right: 15px !important;
    top: 60px !important;
    bottom: auto !important;
    width: auto !important;
    transform-origin: top center !important;
    padding: 16px;
    gap: 16px;

    .primary {
      margin: 0 -16px;

      h2 {
        font-size: 1.4em;

        a {
          padding: 10px 16px;
        }
      }
    }
  }

  @media screen and (max-width: 380px) {
    left: 10px !important;
    right: 10px !important;
    top: 50px !important;
    padding: 14px;
    gap: 14px;

    .primary {
      margin: 0 -14px;

      h2 {
        font-size: 1.2em;

        a {
          padding: 8px 14px;
        }
      }
    }
  }

  .accessory {
    cursor: pointer;
    font-size: 1.35em;
    border-bottom: 0;

    &:hover {
      color: var(--color-primary);
      text-decoration: none;
      border-bottom: 0;
    }
  }

  a {
    text-decoration: none;
    transition: all 0.1s;

    &:hover {
      color: var(--color-primary);
      transition: all 0.1s;
    }
  }

  .profile-section {
    position: absolute;
    top: 15px;
    left: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transition: opacity 0.6s ease;
    transition-delay: 0.8s;
  }

  .profile-avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .profile-initials {
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.2);
    text-shadow:
      0 1px 0 rgba(255, 255, 255, 0.4),
      0 -1px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 0.05em;
  }

  .menu-wrapper.animate & .profile-section {
    opacity: 1;
  }

  .top-action {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--color-border);

    .accessory {
      transform: scale(0) rotate(180deg);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

      &:nth-child(1) {
        transition-delay: 0.2s;
      }
      &:nth-child(2) {
        transition-delay: 0.25s;
      }
      &:nth-child(3) {
        transition-delay: 0.3s;
      }
    }
  }

  .menu-wrapper.animate & .top-action .accessory {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }

  .primary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0 -25px;

    h2 {
      margin: 0;
      font-size: 1.8em;
      transform: translateY(-20px) rotate(-2deg);
      opacity: 0;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &:nth-child(1) {
        transition-delay: 0.1s;
      }
      &:nth-child(2) {
        transition-delay: 0.15s;
      }
      &:nth-child(3) {
        transition-delay: 0.2s;
      }
      &:nth-child(4) {
        transition-delay: 0.25s;
      }

      &:nth-child(even) {
        transform: translateY(-20px) rotate(1.5deg);
      }

      a {
        display: block;
        padding: 12px 20px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--color-primary);
          transition: left 0.4s ease;
          z-index: -1;
        }

        &:hover {
          color: white;
          //transform: rotate(0deg) scale(1.05);

          &::before {
            left: 0;
          }
        }
      }
    }
  }

  .menu-wrapper.animate & .primary h2 {
    transform: translateY(0) rotate(-2deg);
    opacity: 1;

    &:nth-child(even) {
      transform: translateY(0) rotate(1.5deg);
    }

    a:hover {
      //transform: rotate(0deg) scale(1.05);
    }
  }

  .external {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    border-top: 1px solid var(--color-border);
    padding-top: 15px;

    @media screen and (max-width: 380px) {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    a {
      display: flex;
      gap: 5px;
      align-items: center;
      border: none;
      padding: 6px 8px;
      border-radius: 6px;
      transition: transform 0.2s ease, opacity 0.2s ease;
      transform: translateY(20px);
      opacity: 0;
      font-size: 0.9em;
      position: relative;
      overflow: hidden;
      z-index: 1;

      @media screen and (max-width: 380px) {
        font-size: 0.85em;
        padding: 6px;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: var(--color-primary);
        transition: left 0.4s ease;
        z-index: -1;
        border-radius: 6px;
      }

      &:hover {
        transform: translateY(-2px);
        color: white;

        &::before {
          left: 0;
        }
      }

      &:nth-child(1) {
        transition-delay: 0.3s;
      }
      &:nth-child(2) {
        transition-delay: 0.35s;
      }
      &:nth-child(3) {
        transition-delay: 0.4s;
      }
      &:nth-child(4) {
        transition-delay: 0.45s;
      }
      &:nth-child(5) {
        transition-delay: 0.5s;
      }
    }
  }

  .menu-wrapper.animate & .external a {
    transform: translateY(0);
    opacity: 1;
  }
}

.spacer {
  height: 10px;
}

/* Dark mode overrides */
:root.dark .menu .primary h2 a::before {
  background: rgba(13, 71, 161, 0.95); /* Dark blue */
}

:root.dark .menu .external a::before {
  background: rgba(13, 71, 161, 0.95); /* Same dark blue as primary items */
}

:root.dark .menu .accessory:hover {
  color: rgba(13, 71, 161, 0.95) !important; /* Dark blue for dark mode */
}

:root.dark .menu a.accessory:hover {
  color: rgba(13, 71, 161, 0.95) !important; /* Dark blue for dark mode links */
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) .menu .primary h2 a::before {
    background: rgba(13, 71, 161, 0.95); /* Dark blue */
  }
  
  :root:not(.light) .menu .external a::before {
    background: rgba(13, 71, 161, 0.95); /* Same dark blue as primary items */
  }
  
  :root:not(.light) .menu .accessory:hover {
    color: rgba(13, 71, 161, 0.95) !important; /* Dark blue for dark mode */
  }
  
  :root:not(.light) .menu a.accessory:hover {
    color: rgba(13, 71, 161, 0.95) !important; /* Dark blue for dark mode links */
  }
}
</style>
