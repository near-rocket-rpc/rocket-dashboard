<script>
import Login from './components/Login.vue';
import Deposit from './components/Deposit.vue';
import IconSupport from './components/icons/Icon.vue';
import Chart from './components/Chart.vue';
import List from './components/List.vue';
import Benchmark from './components/Benchmark.vue';
import { getWallet, loginPending } from './utils/near'
import { socket as getSocket } from './socketio';

const wallet = await getWallet();

const socket = await getSocket;
if (socket) {
  socket.on('call', data => {
    console.log(data);
  });
}

export default {
  components: {
    Login,
    Deposit,
    Chart,
    List,
    Benchmark,
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
    },
    alreadyLoggedIn() {
      return !loginPending();
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

    <div class="row main" v-if="alreadyLoggedIn()">
      <Login class="login" v-if="!loggedIn" />

      <div v-else>
        <Deposit />

        <Benchmark />

        <Chart />

        <List />
      </div>
    </div>

    <div class="row main" v-else>
      <h5>Generating JWT Token, please wait...</h5>
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
  margin-top: 60px;
}

</style>
