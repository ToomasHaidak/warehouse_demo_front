<template>
<div>
  <table>
    <thead>
    <tr>
      <th>ID</th>
      <th>{{ warehouseName }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" @click="selectRow(user.nodeName)" :key="user.nodeName" :class="{'highlight': (user.nodeName == selectedUser)}">
      <td>{{ user.nodeID }}</td>
      <td>{{ user.nodeName }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: ['users', 'warehouseName'],
  data() {
    return {

    }
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