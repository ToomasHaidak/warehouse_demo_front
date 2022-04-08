<template>
  <div class="home">
    <h1>See on administraatori vaade</h1>
    <button v-on:click="logOut">Logi välja</button><br><br><br>

    <div id="userTabel">
      <table v-show="fullDataTable.length > 0">
        <tr>
          <th>Kasutaja ID</th>
          <th>Kasutaja nimi</th>
          <th>Kasutaja liik</th>
          <th>Asjade arv</th>
          <th>Tasuta asjade limiit</th>
          <th>Limiiti ületavate asjade arv</th>
          <th>Maksmisele kuuluv summa (EUR)</th>
          <th>Laoruumide arv</th>
          <th>Asjade kogukaal</th>
        </tr>
        <tr v-for="row in fullDataTable">
          <td>{{ row.userID }}</td>
          <td>{{ row.userName }}</td>
          <td>{{ row.userType }}</td>
          <td>{{ row.itemCount }}</td>
          <td>{{ row.freeItemLimit }}</td>
          <td>{{ row.nrItemsExceedingLimit }}</td>
          <td>{{ row.amountToPay }}</td>
          <td>{{ row.numberOfSlots }}</td>
          <td>{{ row.totalItemWeight }}</td>
        </tr>
      </table>
    </div>
    <br><br><br><br>
    <h1>Muuda kasutaja seadeid</h1>
    <div id="userSelector">
      <select class="form-control" @change="changeSelectedBusiness($event)">
        <option value="" selected disabled>Vali ärikasutaja</option>
        <option v-for="user in businessUserList" :value="user" :key="user">{{ user }}</option>
      </select>
      Valitud on: {{selectedBusinessUser}}
      <br><br>
      <div id="businessUserChangeSetting" v-show="selectedBusinessUser">
        <input v-model="maxFreeItems" placeholder="Sisesta tasuta asjade limiit">
        <button v-on:click="submitBusinessUserChanges">Sisesta</button>
      </div>
      <h1>Muuda uue kasutaja vaikesätteid</h1>
      <div id="defaultUserSettings">
        Uue ärikasutaja tasuta toodete limiit
        <input v-model="defaultFreeItemLimit">
        <button v-on:click="setDefaultFreeItemLimit">Sisesta</button><br>
        Uue ärikasutaja toote maksumus
        <input v-model="defaultItemCost">
        <button v-on:click="setDefaultItemCost">Sisesta</button><br>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'AdminView',
  data: function () {
    return {
      fullDataTable: '',
      userID: '',
      userName: '',
      userType: '',
      itemCount: '',
      freeItemLimit: '',
      nrItemsExceedingLimit: '',
      amountToPay: '',
      numberOfSlots: '',
      totalItemWeight: '',
      businessUserList: '',
      selectedBusinessUser: '',
      maxFreeItems: '',
      defaultFreeItemLimit: '',
      defaultItemCost: ''
    }
  },
  methods: {
    changeSelectedBusiness (event) {
      this.selectedBusinessUser = event.target.options[event.target.options.selectedIndex].text
    },
    submitBusinessUserChanges() {
      this.$http.put("/changeBusinessUserSettings/" + this.selectedBusinessUser + "/" + this.maxFreeItems)
          .then(response => {
            document.location.reload(true)
          }).catch((error) => {
        alert("Cant load data. No connection to the server")
      })
    },
    setDefaultFreeItemLimit() {
      console.log("limiit on " + this.defaultFreeItemLimit)
      this.$http.put("/api/setDefaultFreeItemLimit/" + this.defaultFreeItemLimit)
          .then(response => {

          }).catch((error) => {
        alert("Cant load data. No connection to the server")
      })
    },
    setDefaultItemCost() {
      this.$http.put("/api/setDefaultItemCost/" + this.defaultItemCost)
          .then(response => {

          }).catch((error) => {
        alert("Cant load data. No connection to the server")
      })
    },
    getDefaultFreeItemLimit() {
      this.$http.get("/api/getDefaultFreeItemLimit/")
          .then(response => {

          }).catch((error) => {
        alert("Cant load data. No connection to the server")
      })
    },
    getDefaultItemCost() {
      this.$http.get("/api/getDefaulItemCost/")
          .then(response => {

          }).catch((error) => {
        alert("Cant load data. No connection to the server")
      })
    },
    logOut() {
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-Name')
      this.$router.push('/')
    }

  },
  beforeMount() {
    this.$http.get("/getAllUsersData")
        .then(response => {
          this.fullDataTable = response.data;
        }).catch((error) => {
      alert("Cant load data. No connection to the server")
    }),
        this.$http.get("/getBusinessUserList")
            .then(response => {
              this.businessUserList = response.data;
            }).catch((error) => {
          alert("Cant load data. No connection to the server")
        }),
        this.$http.get("/api/getDefaultSettings")
            .then(response => {
              this.defaultFreeItemLimit = response.data.defaultFreeItemLimit;
              this.defaultItemCost = response.data.defaultItemCost;
            }).catch((error) => {
          alert("Cant load data. No connection to the server")
        })
  }
}
</script>

<!--localStorage.removeItem('user-token')-->
<!--location.reload-->