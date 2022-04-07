<template>
<div>
  <table>
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" @click="selectRow(user.nodeName)" :key="user.nodeName" :class="{'highlight': (user.nodeName == selectedUser)}">
      <td>{{ user.nodeID }}</td>
      <td>{{ user.nodeName }}</td>
      <td>{{ user.parentOf }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return {

    }
  }
}
</script>

<style>
.highlight {
  background-color: red;
}
tr:hover{
  cursor: pointer;
}
</style>