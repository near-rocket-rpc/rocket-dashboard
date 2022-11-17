<script>
import { Contract } from 'near-api-js';
import { getWallet } from '../utils/near'

const wallet = await getWallet();
const rocketToken = new Contract(
    wallet.account(),
    'token.rocket0.testnet',
    {
        viewMethods: [
            'ft_balance_of',
            'ft_metadata'
        ]
    }
)

export default {
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        async run() {
            this.count = 0;

            while (this.count < 50) {
                try {
                    rocketToken.ft_balance_of({
                        account_id: wallet.getAccountId()
                    });
                    rocketToken.ft_metadata();
                    this.count += 2;

                    await new Promise((res, _) => {
                        setTimeout(res, 100);
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}
</script>

<template>
    <div class="container benchmark">
        <button
            type="button"
            class="btn btn-secondary" 
            @click="run"
        >
        Benchmark
        </button>
    </div>
</template>

<style scoped>
.benchmark {
    margin-top: 22px;
}
</style>
