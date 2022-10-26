<script>
import { getWallet } from '../utils/near';
const wallet = await getWallet();
export default {
    data () {
        return {}
    },
    methods: {
        async signIn() {
            console.log('request signin...');
            await wallet.requestSignIn({
                contractId: 'token.rocket0.testnet',
            });
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <h5>Please connect your NEAR wallet</h5>
        </div>

        <div class="row">
        <button type="button" class="btn btn-primary btn-lg" @click="signIn">Connect Wallet</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-left: 200px;
}

.row {
    max-width: 400px;
}
</style>
