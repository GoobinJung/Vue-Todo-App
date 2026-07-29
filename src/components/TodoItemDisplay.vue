<script setup>
import TodoServices from '@/services/TodoServices.js'
import { ref } from "vue"

const props = defineProps(["item", "listId"])
const emit = defineEmits(["itemUpdated"])

const itemName = ref(props.item.name)
const itemDescription = ref(props.item.description)
const itemStatus = ref(props.item.status)

function updateItem() {
  const data = {
    name: itemName.value,
    description: itemDescription.value,
    status: itemStatus.value
  }

  TodoServices.updateItem(props.listId, props.item.id, data)
    .then(() => {
      emit("itemUpdated")
    })
    .catch((error) => {
      console.log(error)
    })
}

function deleteItem() {
  if (confirm("Are you sure you want to delete this item?")) {
    TodoServices.deleteItem(props.listId, props.item.id)
      .then(() => {
        emit("itemUpdated")
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

function toggleStatus(event) {
  itemStatus.value = event.target.checked ? "complete" : "in-progress"
  updateItem()
}
</script>

<template>
  <tr>
    <td>
      <input 
        type="checkbox" 
        :checked="itemStatus === 'complete'" 
        @change="toggleStatus"
      >
    </td>
    <td>
      <input type="text" v-model="itemName" @change="updateItem">
    </td>
    <td>
      <input type="text" v-model="itemDescription" @change="updateItem">
    </td>
    <td>
      <button @click="deleteItem">Delete</button>
    </td>
  </tr>
</template>