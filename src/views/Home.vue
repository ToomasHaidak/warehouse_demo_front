<template>
  <div class="home">
    <div class="logIn">
    <h1>Logi sisse</h1>
      <select class="form-control" @change="changeSelectedUserType($event)">
        <option value="" selected disabled>Vali kasutaja tüüp</option>
        <option :value="Private" :key="Private">Private</option>
        <option :value="Business" :key="Business">Business</option>
        <option :value="Admin" :key="Admin">Admin</option>
      </select><br><br>
    <input placeholder="Sisesta kasutajanimi" v-model="userName"/> <br><br>
    <input placeholder="Sisesta parool" v-model="userPassword"/> <br><br>
    <button v-on:click="logIn">Logi sisse</button>
    </div><br><br><br><br>

    <div class="logIn">
    <h1>Registreeri kasutaja</h1>
    <input placeholder="Sisesta kasutajanimi" v-model="newUserName"/> <br><br>
    <input placeholder="Sisesta parool" v-model="newUserPassword"/> <br><br>
    <button v-on:click="registerUser">Registreeri</button>
    </div>

  </div>
</template>

<script>
export default {

  name: 'AdminView',
  data: function () {
    return {
      userName: '',
      userPassword: '',
      token: '',
      newUserName: '',
      newUserPassword: '',
      selectedUserType: ''
    }
  },
  methods: {
    changeSelectedUserType (event) {
      this.selectedUserType = event.target.options[event.target.options.selectedIndex].text
    },
    registerUser() {
      this.$http.put("/registerUser/" + this.newUserPassword + "/" + this.newUserPassword + "/Private/na")
          .then(response => {
          }).catch((error) => {
        alert("Cant load data. No connection to the server")
      })
    },
    logIn() {
      this.$http.get("/login/" + this.userName + "/" + this.userPassword + "/" + this.selectedUserType)
          .then(response => {
            this.token = response.data
            localStorage.setItem('user-token', this.token)
            localStorage.setItem('user-name', this.userName)
            this.$http.defaults.headers.common['Authorization']="Bearer " + this.token
            if(this.selectedUserType === 'Admin') {
              console.log(this.selectedUserType + "on admin")
              this.$router.push('/admin')
            } else if(this.selectedUserType === 'Business') {
              console.log("on business")
              this.$router.push('/business')
            } else {
              console.log("on private")
              this.$router.push('/main')
            }

          }).catch((error) => {

      })
    }

  }
}

</script>
