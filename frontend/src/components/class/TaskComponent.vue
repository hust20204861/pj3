<template>
    <div class="w-full h-full overflow-hidden overflow-y-auto">
      <TaskDetails v-show="activeTab == 2"/>
      <TaskManagerVue v-show="activeTab == 1" />
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import emitter from '@/emitter'

import TaskManagerVue from '../list/TaskManager.vue';
import TaskDetails from '../task/TaskDetails.vue';
export default {
components: {
    TaskManagerVue,
    TaskDetails
},

setup(props) {
  const activeTab = ref(1)
  const taskId = ref(null)

  onMounted(() => {
    emitter.on('TASK_DETAILS', (taskId) => {
      activeTab.value = 2
      console.log(taskId)
    })
    emitter.on('CLOSE_TASK_DETAILS', () => {
      activeTab.value = 1
    })
  })


  return {
    activeTab,
  }
},

};
</script>
