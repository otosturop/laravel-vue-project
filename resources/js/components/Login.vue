<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card p-3 border-success">
                <h3 class="text-center mb-3 mt-3 text-success">
                    Vue.js | Auth Giriş Yap
                </h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-posta Adresiniz</label>
                        <input v-model="user.email" type="email" class="form-control"
                               placeholder="E-posta adresinizi giriniz">
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input v-model="user.password" type="password" class="form-control" placeholder="Şifreniz...">
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" class="btn btn-block mb-2 btn-success">
                            Giriş Yap
                        </button>
                        <router-link class="text-secondary" tag="a" to="/uye-ol">
                            Üye değilim
                        </router-link>
                    </div>
                </form>
                <div class="row justify-content-center">
                    <ul class="list-group mb-3">
                        <li class="list-group-item list-group-item-danger" v-for="error in errors">
                            {{error}}
                        </li>
                    </ul>
                </div>
                <div class="row justify-content-center" v-if="invalidUser">
                    <div class="alert alert-danger" role="alert">
                        Hatalı Giriş Bilgileri
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    email: null,
                    password: null
                },
                errors: [],
                invalidUser: false
            }
        },
        methods: {
            onSubmit() {
                if(this.user.password && this.user.email && this.validEmail(this.user.email)){
                    this.$store.dispatch("login", {...this.user}).then( response => {
                        this.invalidUser = false;
                        this.$router.push('/dashboard')
                    }, () => {
                        this.invalidUser = true
                    });
                }
                this.errors = [];
                if(!this.user.email){
                    this.errors.push('E-posta Gereklidir')
                }else if(!this.validEmail(this.user.email)){
                    this.errors.push('Lütfen geçerli bir e-posta adresi giriniz.')
                }
                if(!this.user.password){
                    this.errors.push('Şifre Gereklidir')
                }
            },
            validEmail:function(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
        }
    }
</script>
