<script>
import Login from './components/Login.vue';
import IconSupport from './components/icons/Icon.vue';
import { getWallet } from './utils/near'

const wallet = await getWallet();

export default {
  components: {
    Login,
    IconSupport,
  },
  data() {
    return {
      loggedIn: false,
    }
  },
  mounted() {
    this.loggedIn = wallet.isSignedIn();
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <nav class="navbar navbar-expand-lg">
      <IconSupport class="logo" />
      <h5>Rocket RPC Dashboard</h5>
      </nav>
    </div>

    <div class="row main">
      <Login />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 60px;
  height: 60px;
}

.navbar {
  width: 1048px;
}

.main {
  margin-top: 200px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
