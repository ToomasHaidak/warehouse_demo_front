<template>
  <div class="mainView">
    <h1>This is main warehouse view</h1>
    <br>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users[0].parentOf" @click="selectRow(user.id)" :key="user.id" :class="{'highlight': (user.id == selectedUser)}">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.parentOf }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UpdateWorkshopData',
  data: function () {
    return {
      users: [{
        "id": "1",
        "name": "esimene",
        "parentOf": [{
          "id": "2",
          "name": "teine",
          "parentOf": {
            "id": 3,
            "name": "kolmas"
          }
        },
          {
            "id": "4",
            "name": "neljas"
          }
        ]
      },
        {
          "id": "5",
          "name": "viies",
          "parentOf": [{
            "id": "6",
            "name": "kuues",
            "parentOf": {
              "id": "7",
              "name": "seitsmes"
            }
          },
            {
              "id": "8",
              "name": "kaheksas"
            }
          ]
        }
      ],
      selectedUser: null
    }
  },
  methods: {
    selectRow(user) {
      this.selectedUser = user;
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
