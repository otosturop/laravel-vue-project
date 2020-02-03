<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card p-3 border-primary">
                <h3 class="text-center mb-3 mt-3 text-primary">
                    Vue.js | Auth Üye OL
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
                    <div class="form-group">
                        <label>Şifre Tekrar</label>
                        <input v-model="user.password_confirmation" type="password" class="form-control" placeholder="Şifrenizi Tekrar Giriniz">
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" class="btn btn-block mb-2 btn-primary">
                            Kayıt Ol
                        </button>
                        <router-link class="text-secondary" tag="a" to="/">
                             Üyeliğim var
                        </router-link>
                    </div>
                </form>
                <div class="row justify-content-center" v-if="errors.length">
                    <ul class="list-group mb-3">
                        <li class="list-group-item list-group-item-danger" v-for="error in errors">
                            {{error}}
                        </li>
                    </ul>
                </div>
                <div class="row justify-content-center" v-if="res_err_status">
                    <ul class="list-group mb-3">
                        <li class="list-group-item list-group-item-danger" v-for="error in responseErrors">
                            {{error[0]}}
                        </li>
                    </ul>
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
                    password: null,
                    password_confirmation: null
                },
                errors: [],
                responseErrors: {
                    email : [],
                    password : [],
                    password_confirmation : []
                },
                res_err_status: false
            }
        },
        methods: {
            onSubmit() {
                if(this.user.password && this.user.email && this.validEmail(this.user.email) && this.user.password === this.user.password_confirmation){
                    this.$store.dispatch("register", {...this.user})
                        .then((response) => {
                            console.log(response);
                            this.res_err_status= false;
                            this.$router.push("/");
                        })
                        .catch( (error) => {
                            this.res_err_status= true;
                            this.responseErrors = error.response.data.errors;
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
                if(this.user.password !== this.user.password_confirmation){
                    this.errors.push('Şifreler birbirleriyle eşleşmiyor')
                }
            },
            validEmail:function(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
        }
    }
</script>
