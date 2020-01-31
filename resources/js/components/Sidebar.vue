<template>
    <div class="col-md-2">
        <div class="list-group">
            <router-link class="list-group-item list-group-item-action flex-column align-items-start" tag="a" to="/dashboard">
                <div class="d-flex justify-content-start">
                    <i class="fas fa-home fa-lg"></i>
                    <h5 class="ml-3 mb-1"><b>Dashboard</b></h5>
                </div>
            </router-link>

            <router-link class="list-group-item list-group-item-action flex-column align-items-start" tag="a" to="/profile">
                <div class="d-flex justify-content-start">
                    <i class="fas fa-user-circle fa-lg"></i>
                    <h5 class="ml-3 mb-1"><b>Profil</b></h5>
                </div>
            </router-link>
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" @click.prevent="logout">
                <div class="d-flex justify-content-start">
                    <i class="fas fa-sign-out-alt fa-lg"></i>
                    <h5 class="ml-3 mb-1"><b>Çıkış</b></h5>
                </div>
            </a>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Sidebar",
        methods: {
            logout() {
                this.$store.dispatch("logout").then( response => {
                    this.$router.replace('/')
                })
            }
        }
    }
</script>
