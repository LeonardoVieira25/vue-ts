<template>
  <div class="hello">
    <h1>{{ localMsg.text }}</h1>
    <h1>{{ localMsg.count }}</h1>

    <button @click="updateMessage">Change Message</button>

    <form @submit="console.log">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: {
    text: string;
    count: number;
  }
}>();

const emits = defineEmits({
  "update:modelValue": (newMsg: { text: string; count: number }) => true
});

// Create a local state for msg
const localMsg = ref({ ...props.modelValue });

// Watch for changes in props and update local state
watch(() => props.modelValue, (newVal) => {
  localMsg.value = { ...newVal };
});

// Method to update the local state and emit the changes
const updateMessage = () => {
  localMsg.value = { text: 'com ts', count: localMsg.value.count + 1 };
  emits('update:modelValue', localMsg.value);
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>