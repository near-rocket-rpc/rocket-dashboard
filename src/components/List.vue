<script>
import 'animate.css';
import { socket as getSocket } from '../socketio';

export default {
    data() {
        return {
            items: []
        }
    },
    async mounted() {
        const socket = await getSocket;
        if (!socket) return;
        socket.on('call', data => {
            console.log(data);
            if (data.method === 'query' && data.params.request_type === 'call_function') {
                this.items.push({
                    contractId: data.params.account_id,
                    method: data.params.method_name
                });
            }
        })
    }
}

</script>

<template>
    <div>
        <h5>RPC calls</h5>
        <ul>
            <li 
                class="animate__animated animate__fadeInLeftBig" 
                v-for="item in items"
            >
                {{item.contractId}} - {{item.method}}
            </li>
        </ul>
    </div>
</template>

<style scoped>
li {
    font-size: 14pt;
}
</style>
