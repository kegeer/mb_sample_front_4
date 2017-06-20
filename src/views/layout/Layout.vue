<template lang="html">
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container"></Sidebar>
    </div>
    <div class="main-container">
      <Navbar></Navbar>
      <App-main></App-main>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from '@/views/layout'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: absolute;
  height: 100%;
  width: 100%;
  &.hiddenSidebar {
    .sidebar-wrapper {
      transform: translate(-140px, 0);
      .sidebar-container {
        transform: translate(132px, 0);
      }
      &:hover {
        transform: translate(0, 0);
        .sidebar-container {
            transform: translate(0, 0);
        }
      }
    }
    .main-container {
      margin-left: 40px;
    }
  }
  .sidebar-wrapper {
    width: 180px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    overflow-x: hidden;
    transition: all .28s ease-out;
    @include scrollBar;
  }
  .sidebar-container {
    transition: all .28s ease-out;
  }
  .main-container {
    min-height: 100%;
    transition: all .28s ease-out;
    margin-left: 180px;
  }
}
</style>
