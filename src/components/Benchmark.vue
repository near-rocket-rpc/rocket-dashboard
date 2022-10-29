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
            stop: false,
        }
    },
    methods: {
        async run() {
            setTimeout(() => {
                this.stop = true;
            }, 5000);

            while (!this.stop) {
                try {
                    rocketToken.ft_balance_of({
                        account_id: wallet.getAccountId()
                    });
                    rocketToken.ft_metadata();

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
    <div>
        <button
            type="button"
            class="btn btn-secondary" 
            @click="run"
        >
        Benchmark
        </button>
    </div>
</template>
