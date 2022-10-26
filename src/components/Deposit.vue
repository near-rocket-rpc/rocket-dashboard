<script>
import { Contract } from "near-api-js";
import Big from 'big.js';
import { getWallet } from "../utils/near";

const wallet = await getWallet();
const rocketToken = new Contract(
    wallet.account(),
    'token.rocket0.testnet',
    {
        viewMethods: ['ft_balance_of'],
        changeMethods: ['ft_transfer_call']
    }
);
const escrowContract = new Contract(
    wallet.account(),
    'escrow.rocket0.testnet',
    {
        viewMethods: [
            'get_balance'
        ]
    }
)

export default {
    data() {
        return {
            rpcBalance: 0,
            depositBalance: 0,
        }
    },
    async mounted() {
        this.rpcBalance = await rocketToken.ft_balance_of({
            account_id: wallet.getAccountId()
        });
        this.depositBalance = await escrowContract.get_balance({
            account_id: wallet.getAccountId()
        });
    },
    methods: {
        formatBalance(b) {
            const bal = Big(b);
            return bal.div(1e18).toString();
        },
        parseAmount(a) {
            return Big(a).mul(1e18).toString();
        },
        currentPlan() {
            if (this.depositBalance == 0) {
                return 'Free';
            } else {
                return 'Premium';
            }
        },
        async deposit(amount) {
            await rocketToken.ft_transfer_call(
                {
                    receiver_id: escrowContract.contractId,
                    amount,
                    msg: ''
                },
                '300000000000000',
                '1'
            );
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h6>Your deposited RPC token balance: {{formatBalance(depositBalance)}}</h6>
                <h6>Your plan is: {{currentPlan()}}</h6>
            </div>

            <div class="col">
                <h6>RPC token balance in wallet: {{formatBalance(rpcBalance)}}</h6>
                <button type="button" class="btn btn-outline-primary btn-sm" @click="deposit(parseAmount(1))">Deposit</button>
            </div>
        </div>

    </div>
</template>
