<script>
import Login from './components/Login.vue';
import Deposit from './components/Deposit.vue';
import IconSupport from './components/icons/Icon.vue';
import Chart from './components/Chart.vue';
import { getWallet } from './utils/near'
import { socket as getSocket } from './socketio';

const wallet = await getWallet();

const socket = await getSocket;
socket.on('call', data => {
  console.log(data);
})

export default {
  components: {
    Login,
    Deposit,
    Chart,
    IconSupport,
  },
  data() {
    return {
      loggedIn: false,
    }
  },
  mounted() {
    this.loggedIn = wallet.isSignedIn();
  },
  methods: {
    logout() {
      wallet.signOut()
      this.loggedIn = false;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <nav class="navbar navbar-expand-lg">
      <IconSupport class="logo" />
      <h5>Rocket RPC Dashboard</h5>

      <button v-if="loggedIn" type="button" class="btn btn-secondary signout" @click="logout">Sign out</button>
      </nav>
    </div>

    <div class="row main">
      <Login class="login" v-if="!loggedIn" />

      <div v-else>
        <Deposit />

        <Chart />
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.container {
  width: 100%;
}

.logo {
  display: block;
  margin-right: 20px;
  width: 60px;
  height: 60px;
}

.navbar {
  width: 1048px;
}

.login {
  margin-top: 200px;
}

.signout {
  margin-left: 500px;
}

.main {
  margin-top: 100px;
}

</style>
