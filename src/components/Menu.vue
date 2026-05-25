<template>
  <div v-if="fixedLink" class="spacer"></div>

  <div
    id="menu-link"
    :class="{ float: fixedLink, open: isOpen }"
    @click.prevent="isOpen ? handleClose() : handleShow($event)"
    :aria-label="isOpen ? 'Close Menu' : 'Show Menu'"
    :aria-expanded="isOpen"
  >
    <div class="menu-trigger">
      <span class="bars" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span class="trigger-label">{{ isOpen ? 'CLOSE' : 'MENU' }}</span>
      <span class="trigger-dot" aria-hidden="true"></span>
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="show"
      :class="{
        'menu-wrapper': true,
        animate: shouldAnimate,
      }"
    >
      <div class="menu-backdrop" @click="handleClose"></div>

      <!-- Decorative shapes -->
      <div class="deco deco--wedge" aria-hidden="true"></div>
      <div class="deco deco--circle" aria-hidden="true"></div>
      <div class="deco deco--bar" aria-hidden="true"></div>
      <div class="deco deco--bar2" aria-hidden="true"></div>

      <div class="menu" @click.self="handleClose">

        <div class="masthead">
          <div class="masthead-l">
            <div class="profile-avatar">
              <img
                :src="headshotSrc"
                alt="Brian D. Adams"
                width="60"
                height="60"
              />
            </div>
            <div class="masthead-text">
              <div class="profile-initials">B·D·A</div>
              <div class="profile-sub">№ 001 / DEVLAND</div>
            </div>
          </div>
          <div class="top-action">
            <AnimatedEntrance type="slideInDown" :delay="0.03">
              <div class="accessory accessory--theme">
                <ThemeToggle />
              </div>
            </AnimatedEntrance>

            <AnimatedEntrance type="slideInDown" :delay="0.05">
              <a class="accessory" href="/search/" title="Search" aria-label="Search">
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
              </a>
            </AnimatedEntrance>

            <AnimatedEntrance type="slideInDown" :delay="0.07">
              <div class="accessory accessory--close" @click="handleClose" title="Close Menu" aria-label="Close Menu">
                <i class="fa-sharp fa-solid fa-xmark"></i>
              </div>
            </AnimatedEntrance>
          </div>
        </div>

        <div class="hash-rule" aria-hidden="true"></div>

        <div class="section-label">SECTIONS / РАЗДЕЛЫ</div>

        <div class="primary">
          <AnimatedEntrance
            v-for="(l, index) in primaryLinks"
            :key="l.label"
            type="zoomIn"
            :delay="0.05 * index"
          >
            <a class="primary-link" :href="l.href">
              <span class="primary-num">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="primary-label">{{ l.label }}</span>
              <span class="primary-arrow" aria-hidden="true">→</span>
            </a>
          </AnimatedEntrance>
        </div>

        <div class="section-label">CONNECT / СВЯЗЬ</div>

        <div class="external">
          <AnimatedEntrance
            v-for="(l, index) in externalLinks"
            :key="l.label"
            client:load
            type="zoomIn"
            :delay="(index + 1) * 0.07"
          >
            <a :href="l.href" class="external-link">
              <i :class="`${l.icon} fa-fw`"></i>
              <span>{{ l.label }}</span>
            </a>
          </AnimatedEntrance>
        </div>

        <div class="footer-stamp">
          <span>EDITION 2026</span>
          <span class="dot">●</span>
          <span>PROLETARII VSEKH STRAN</span>
          <span class="dot">●</span>
          <span>SOEDINYAYTES</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import AnimatedEntrance from "./AnimatedEntrance.vue";
import ThemeToggle from "./ThemeToggle.vue";
import headshotImage from "../assets/headshot-halftone.png";

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
      headshotSrc: headshotImage.src,
    };
  },
  computed: {
    primaryLinks() {
      return [
        { label: "Resume", href: "/resume/" },
        { label: "Portfolio", href: "/portfolio/" },
        { label: "Blog", href: "/blog/" },
        { label: "Recommended", href: "/recommended/" },
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
      this.isOpen = true;
      setTimeout(() => {
        this.shouldAnimate = true;
      }, 30);
    },
    handleClose() {
      this.shouldAnimate = false;
      this.isOpen = false;
      setTimeout(() => {
        this.show = false;
      }, 350);
    },
  },
  watch: {
    show() {
      if (typeof document === "undefined") return;
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
  z-index: 1000;
  cursor: pointer;

  .menu-trigger {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px 10px 14px;
    background: var(--con-black);
    color: var(--con-cream);
    border: 3px solid var(--color-card-border);
    box-shadow: 5px 5px 0 var(--con-orange);
    transition: all 0.2s ease;
    position: relative;

    .bars {
      display: inline-flex;
      flex-direction: column;
      gap: 3px;
      width: 18px;
    }
    .bars span {
      height: 2px;
      background: var(--con-cream);
      width: 100%;
      display: block;
    }
    .bars span:nth-child(2) { width: 70%; }
    .bars span:nth-child(3) { background: var(--con-orange); }

    .trigger-label {
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      letter-spacing: 0.22em;
      font-size: 0.85em;
      text-transform: uppercase;
    }

    .trigger-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--con-orange);
      box-shadow: 0 0 0 2px var(--con-cream);
    }
  }

  &:hover .menu-trigger {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 var(--con-orange);
  }

  &.open .menu-trigger {
    background: var(--con-orange);
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--con-black);
  }
  &.open .menu-trigger .bars span:nth-child(3) { background: var(--con-cream); }

  &.float {
    position: fixed;
    right: 14px;
    top: 14px;
    transition: all 0.2s;

    .menu-trigger {
      padding: 8px 14px;
      font-size: 0.75em;
    }
  }
}

.spacer { height: 0; }

/* ════════ Menu overlay ════════ */
.menu-wrapper {
  position: fixed;
  inset: 0;
  z-index: 1100;
  pointer-events: none;
  font-family: "Oswald", "Arial Narrow", sans-serif;
  overflow: hidden;

  &.animate { pointer-events: all; }
}

.menu-backdrop {
  position: absolute;
  inset: 0;
  background: var(--color-menu-background);
  opacity: 0;
  transition: opacity 0.35s ease;
  .menu-wrapper.animate & { opacity: 0.97; }
}

/* Background decorations */
.deco {
  position: absolute;
  pointer-events: none;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease;
  opacity: 0;
}
.menu-wrapper.animate .deco { opacity: 1; }

.deco--wedge {
  bottom: -12%;
  right: -12%;
  width: clamp(280px, 50vw, 700px);
  aspect-ratio: 1;
  background: var(--con-orange);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  transform: translate(40%, 40%);
}
.menu-wrapper.animate .deco--wedge { transform: translate(0, 0); }

.deco--circle {
  top: 8%;
  right: 4%;
  width: clamp(80px, 14vw, 180px);
  aspect-ratio: 1;
  background: var(--con-yellow);
  border-radius: 50%;
  border: 4px solid var(--color-card-border);
  transform: translateY(-200%);
}
.menu-wrapper.animate .deco--circle { transform: translateY(0); }

.deco--bar {
  position: absolute;
  top: 35%;
  left: -10%;
  width: 60%;
  height: 22px;
  background: var(--con-orange);
  transform: rotate(-12deg) translateX(-110%);
}
.menu-wrapper.animate .deco--bar { transform: rotate(-12deg) translateX(0); }

.deco--bar2 {
  position: absolute;
  top: calc(35% + 30px);
  left: -10%;
  width: 30%;
  height: 8px;
  background: var(--con-black);
  transform: rotate(-12deg) translateX(-110%);
  transition-delay: 0.1s;
}
.menu-wrapper.animate .deco--bar2 { transform: rotate(-12deg) translateX(0); }

/* ════════ Menu content ════════ */
.menu {
  position: relative;
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  margin: 16px auto;
  background: var(--color-card-background);
  color: var(--color-text);
  border: 3px solid var(--color-card-border);
  box-shadow: 12px 12px 0 var(--con-orange), 12px 12px 0 1px var(--color-card-border);
  padding: 24px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  transform: translateY(-30px) rotate(-1deg);
  opacity: 0;
  transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);

  .menu-wrapper.animate & {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }

  /* Corner stamp */
  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: 56px;
    height: 18px;
    background: var(--con-orange);
    border-right: 3px solid var(--color-card-border);
    border-bottom: 3px solid var(--color-card-border);
  }
}

.masthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.masthead-l {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 44px;
  height: 44px;
  overflow: hidden;
  border: 2px solid var(--color-card-border);
  background: var(--con-orange);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: contrast(1.15) saturate(0.85);
    mix-blend-mode: luminosity;
  }
}

.masthead-text { line-height: 1.1; }

.profile-initials {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 1.1em;
  letter-spacing: 0.18em;
  color: var(--color-text);
}
.profile-sub {
  font-size: 0.65em;
  letter-spacing: 0.22em;
  color: var(--color-text-muted);
}

.top-action {
  display: flex;
  gap: 8px;
  align-items: center;

  .accessory {
    cursor: pointer;
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--color-subcard-background);
    border: 2px solid var(--color-card-border);
    color: var(--color-text);
    font-size: 0.95em;
    transition: all 0.15s ease;
    text-decoration: none;

    &:hover {
      background: var(--con-orange);
      color: var(--con-cream);
    }
  }
  .accessory--close:hover {
    background: var(--con-black);
    color: var(--con-cream);
  }
}

.hash-rule {
  height: 8px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-text) 0 8px,
    transparent 8px 14px
  );
}

.section-label {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  letter-spacing: 0.28em;
  font-size: 0.65em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: "";
    flex: 1;
    height: 2px;
    background: var(--color-text);
  }
}

.primary {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.primary-link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  text-decoration: none;
  color: var(--color-text);
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 1.5em;
  background: var(--color-subcard-background);
  border: 2px solid var(--color-card-border);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  .primary-num {
    font-size: 0.55em;
    background: var(--con-black);
    color: var(--con-cream);
    padding: 2px 8px;
    letter-spacing: 0.1em;
    transition: all 0.2s ease;
  }

  .primary-arrow {
    font-size: 0.7em;
    color: var(--con-orange);
    transition: transform 0.2s ease;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--con-orange);
    transform: translateX(-101%);
    transition: transform 0.25s cubic-bezier(0.65, 0, 0.35, 1);
    z-index: 0;
  }
  .primary-num, .primary-label, .primary-arrow { position: relative; z-index: 1; }

  &:hover {
    color: var(--con-cream);
    border-color: var(--color-card-border);

    &::before { transform: translateX(0); }
    .primary-num { background: var(--con-cream); color: var(--con-black); }
    .primary-arrow { color: var(--con-cream); transform: translateX(4px); }
  }
}

.external {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  font-family: "IBM Plex Sans", sans-serif;
}

.external-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--color-subcard-background);
  border: 2px solid var(--color-card-border);
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9em;
  font-weight: 500;
  letter-spacing: 0.04em;
  transition: all 0.15s ease;

  i { color: var(--con-orange); }

  &:hover {
    background: var(--con-orange);
    color: var(--con-cream);
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 var(--color-card-border);
    i { color: var(--con-cream); }
  }
}

.footer-stamp {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  font-family: "Oswald", sans-serif;
  font-size: 0.6em;
  letter-spacing: 0.25em;
  color: var(--color-text-muted);
  padding-top: 8px;
  border-top: 2px dashed var(--color-text-very-light);

  .dot { color: var(--con-orange); }
}

@media (max-width: 480px) {
  .menu {
    padding: 18px 18px 22px;
    width: calc(100vw - 16px);
    margin: 8px auto;
  }
  .external { grid-template-columns: 1fr; }
  .primary-link { font-size: 1.2em; padding: 12px 14px; }
}
</style>
