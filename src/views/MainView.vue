<template>
  <div class="mainView">

    <h1> Tere {{storedUserName}}. See on sinu isiklik lao vaade.</h1>
    Oma ettevõtte lao vaatamiseks logi välja ja sisene ärikliendina.
    <button v-on:click="logOut">Logi välja</button>

    <br><br><br>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Lao nimi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" @click="selectRow(user.nodeName)" :key="user.nodeName" :class="{'highlight': (user.nodeName == selectedUser)}">
        <td>{{ user.nodeID }}</td>
        <td>{{ user.nodeName }}</td>
      </tr>
      </tbody>
    </table>
    <TableComponent v-bind:users="users" v-bind:warehouseName="selectedUser"></TableComponent>

    <div>
    Valitud: {{selectedUser}}
    </div>



    <div class="logIn">
      <h1>Registreeri ärikasutaja</h1>
      <input placeholder="Sisesta ettevõtte nimi" v-model="newCompanyName"/> <br><br>
      <button v-on:click="registerBusinessUser">Registreeri</button>
    </div>


  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent";

export default {
  name: 'mainView',
  components: {TableComponent},
  data: function () {
    return {
      users: '',
      selectedUser: null,
      newCompanyName: '',
      storedUserName: localStorage.getItem('user-name')
    }
  },
  methods: {
    selectRow(user) {
      this.selectedUser = user;
    },
    registerBusinessUser() {
      this.$http.put("/registerUser/" + this.newCompanyName + "/none/Business/" + this.storedUserName)
          .then(response => {
          }).catch((error) => {
        alert("Cant load data. No connection to the server")
      })
    },
    logOut() {
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-Name')
      this.$router.push('/')
    },

  },
  beforeMount() {
    this.$http.get("/getNodesOfParentX/" + this.storedUserName + "/" + 0)
        .then(response => {
          this.users = response.data;
        }).catch((error) => {
      alert("Cant load data. No connection to the server")
    })
  }
}
</script>

<style>
.highlight {
  background-color: grey;
}
tr:hover{
  cursor: pointer;
}
</style>

