<template>
  <div class="home">
    <p>This is admin view</p>

    <div id="userTabel">
      <table v-show="fullDataTable.length > 0">
        <tr>
          <th>User ID</th>
          <th>User name</th>
          <th>User type</th>
          <th>Item count</th>
          <th>Free item limit</th>
          <th>Nr of items exceeding limit</th>
          <th>Amount to pay</th>
          <th>Number of slots</th>
          <th>Total item weight</th>
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
    <p>Change settings for business user</p>
    <div id="userSelector">
      <select class="form-control" @change="changeSelectedBusiness($event)">
        <option value="" selected disabled>Vali ärikasutaja</option>
        <option v-for="user in businessUserList" :value="user" :key="user">{{ user }}</option>
      </select>
      Valitud on: {{selectedBusinessUser}}
      <br><br>
      <div id="businessUserChangeSetting" v-show="selectedBusinessUser">
        <input v-model="maxFreeItems" placeholder="Sisesta tasuta asjade max">
        <button v-on:click="submitBusinessUserChanges">Sisesta</button>
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
      maxFreeItems: ''
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
        })
  }
}
</script>
