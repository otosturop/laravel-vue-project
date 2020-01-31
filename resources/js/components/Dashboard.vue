<template>
    <div class="row">
        <sidebar-component></sidebar-component>
        <div class="col-md-6">
            <div class="card">
                <div class="alert alert-success text-center">
                    <strong>Hoşgeldiniz </strong> {{ user.name}}.
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import { mapGetters } from "vuex"
    export default {
        name: "Dashboard",
        computed: {
            ...mapGetters({ user: 'getUser' }),
        }
    }
</script>

<style scoped>

</style>
