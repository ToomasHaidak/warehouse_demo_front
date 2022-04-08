<template>
  <div class="businessView">

    <h1> Tere {{storedUserName}}. See on sinu ettevõtte lao vaade.</h1>
    Oma isikliku lao vaatamiseks logi välja ja sisene erakliendina.
    <button v-on:click="logOut">Logi välja</button>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      storedUserName: localStorage.getItem('user-name')
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-Name')
      this.$router.push('/')
    },
  }
}
</script>