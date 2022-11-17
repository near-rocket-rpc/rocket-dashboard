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
        changeMethods: ['ft_transfer_call', 'mint']
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
            accountId: '',
            minting: false,
        }
    },
    async mounted() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList]
            .map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        this.accountId = wallet.getAccountId();
        await this.updateBalance();
    },
    methods: {
        async updateBalance() {
            this.rpcBalance = await rocketToken.ft_balance_of({
                account_id: wallet.getAccountId()
            });
            this.depositBalance = await escrowContract.get_balance({
                account_id: wallet.getAccountId()
            });
        },
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
        },
        async mint() {
            try {
                this.minting = true;
                await rocketToken.mint({});
                await this.updateBalance();
            } catch (err) {
            } finally {
                this.minting = false;
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <h4>Welcome {{accountId}}</h4>
        </div>
        <div class="row">
            <div class="col">
                <h6>Your deposited RPC token balance: {{formatBalance(depositBalance)}}</h6>
                <h6>Your plan is: {{currentPlan()}}</h6>
            </div>

            <div class="col">
                <h6>RPC token balance in wallet: {{formatBalance(rpcBalance)}}</h6>
                <button 
                    type="button" 
                    class="btn btn-outline-primary btn-sm" 
                    @click="mint"
                    :disabled="minting"
                    data-bs-toggle="tooltip" data-bs-placement="bottom"
                    data-bs-title="Mint 1000 RPC tokens into your account"
                >{{minting ? 'Minting' : 'Mint'}}</button>
                <button 
                    type="button" 
                    class="btn btn-outline-primary btn-sm" 
                    @click="deposit(parseAmount(50))"
                    data-bs-toggle="tooltip" data-bs-placement="bottom"
                    data-bs-title="Deposit 200 RPC tokens into the escrow contract to pay for premium usage"
                >Deposit</button>
                <button type="button" class="btn btn-outline-primary btn-sm" @click="updateBalance">Refresh</button>
            </div>
        </div>

        <hr class="rounded">
    </div>
</template>

<style scoped>
h4 {
    margin-bottom: 20px;
}
hr {
    width: 770px;
}
hr.rounded {
  border-top: 4px solid #bbb;
  border-radius: 2px;
}
.btn {
    margin-right: 20px;
}
</style>
