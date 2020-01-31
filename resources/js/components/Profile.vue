<template>
    <div class="row">
        <sidebar-component></sidebar-component>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            Profile Düzenle
                        </div>
                        <div v-if="successUpdate">
                            <small class="ml-3 mt-2 text-success">
                                Güncelleme işlemi başarılı
                            </small>
                        </div>
                    </div>
                    <div class="card-body align-items-center">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="full-name">İsim Soyisim</label>
                                <input type="text" id="full-name" class="form-control"
                                       placeholder="Ad Soyad" v-model="user.name">
                            </div>
                        </div>
                        <div class="col-md-12">
                           <div class="form-group">
                               <label for="e-mail">E-posta</label>
                               <input type="text" id="e-mail" v-model="user.email" class="form-control" placeholder="Email">
                               <div v-if="errorEmail">
                                   <small class="ml-3 mt-2 text-danger">
                                       {{ errorEmail}}
                                   </small>
                               </div>
                           </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="phone">Telefon</label>
                                <input type="text" id="phone" v-model="user.phone" v-mask="'##-###-###-##-##'" class="form-control" placeholder="telefon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            Profile Resmi Düzenle
                        </div>
                    </div>
                    <div class="card-body text-center d-flex align-items-center flex-column">
                        <img height="200" class="img-responsive text-center mb-3"
                             :src="user.user_img === null ? './images/avatar.jpg' : user.user_img">
                        <input ref="file" style="display: none;" type="file" @change="onChange" class="form-control">
                        <button class="btn btn-outline-secondary" type="button" @click="$refs.file.click()">
                            Resim Seç
                        </button>
                        <div v-if="errorImage">
                            <small class="ml-3 mt-2 text-danger">
                                {{ errorImage}}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 mt-3">
                <div class="text-center d-flex align-items-center flex-column">
                    <button class="btn btn-success" @click="updateUser">
                        Güncelle
                    </button>
                </div>
            </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    export default {
        name: "Profile",
        data: function() {
            return {
                imageFile: null,
                errorEmail: false,
                errorImage: false,
                successUpdate: false
            }
        },
        computed: {
            ...mapGetters({ user: 'getUser' })
        },
        methods: {
            onChange(e) {
                this.imageFile = e.target.files[0];
                this.user.user_img = URL.createObjectURL(this.imageFile);
            },
            updateUser() {

                let formData = new FormData()
                if(this.imageFile !== null){
                    formData.append('image', this.imageFile);
                }
                formData.append('phone', this.user.phone);
                formData.append('email', this.user.email);
                formData.append('name', this.user.name);
                formData.append('id', this.user.id);
                this.$store.dispatch("profileUpdate", formData).then( response => {
                    this.successUpdate = true
                }).catch(error => {
                    console.log(error.response.data)
                    this.errorEmail = error.response.data.errors.email[0]
                    this.errorImage = error.response.data.errors.image[0]
                });
            }
        }
    }
</script>

<style scoped>

</style>
