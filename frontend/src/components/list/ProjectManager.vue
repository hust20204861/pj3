<template>
  <div class="w-full h-full mx-auto p-4 overflow-hidden overflow-y-auto">
    <h1 class="text-2xl font-semibold mb-4">Project Task Timeline</h1>

    <div class="task-list mb-8">
      <h2 class="text-xl font-semibold mb-4">Task List</h2>
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border-b border-r text-left">Task Name</th>
            <th class="px-4 py-2 border-b border-r text-left">Status</th>
            <th class="px-4 py-2 border-b border-r text-left">Assigned To</th>
            <th class="px-4 py-2 border-b border-r text-left">Start Date</th>
            <th class="px-4 py-2 border-b border-r text-left">End Date</th>
            <th class="px-4 py-2 border-b border-r text-left">Dependencies</th>
            <th class="px-4 py-2 border-b border-r text-left">Priority</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task._id" class="odd:bg-white even:bg-gray-50">
            <td class="px-4 py-2 border-b border-r">{{ task.name }}</td>
            <td class="px-4 py-2 border-b border-r">
              <select 
                v-model="task.status" 
                class="bg-inherit focus:outline-none"
                :class="{
                    'text-red-500': task.status === 'TODO',
                    'text-green-500': task.status === 'DONE',
                    'text-blue-500': task.status === 'IN_PROGRESS',
                }"
                @change="updateTaskStatus(task._id, task.status)"
              >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
              </select>
            </td>
            <!-- <td class="px-4 py-2 border-b border-r">{{ task.assignedTo.map(user => user.name).join(', ') }}</td> -->
            <td class="px-4 py-2 border-b border-r">
              <div class="w-full h-full flex justify-between">
                <div>
                  <div v-if="task.assignedTo && task.assignedTo.length > 0" class="max-w-[200px] flex flex-wrap gap-2">
                    <!-- <span v-for="user in task.assignedTo" :key="user._id" class="px-2 py-1 rounded-full">
                      {{ tasks.find(t => t._id === dep)?.name ?? 'None' }} 
                    </span> -->
                    {{ task.assignedTo.map(user => user.name).join(', ') }}
                  </div>
                  
                  <div v-else class="max-w-[200px] flex flex-wrap gap-2">
                    <span class="px-2 py-1 rounded-full">
                      None
                    </span>
                  </div>
                </div>
                
                
                <button 
                  @click="onDropdownSelectUser(task)" 
                  class="ml-2 relative"
                >
                  <span v-if="dropdownOpenUser[task._id]">▲</span>
                  <span v-else>▼</span>

                  <select 
                    v-if="dropdownOpenUser[task._id]" 
                    v-model="task.assignedTo" 
                    class="w-[200px] max-h-[200px] border bg-white absolute top-10 right-5 z-[50]"
                    multiple
                    @change="UpdateTaskAssignedTo(task._id, task.assignedTo)"
                  >
                    <option v-for="user in users" :key="user._id" :value="user._id">
                      {{ user.name }}
                    </option>
                  </select>
                </button>

                
                </div>
            </td>
            <!-- <td class="px-4 py-2 border-b border-r">{{ formatDate(task.startAt) }}</td> -->
            <td class="px-4 py-2 border-b border-r">
              <input
                type="datetime-local"
                v-model="task.startAt"
                @change="UpdateTaskStartDate(task._id, task.startAt)"
              />
            </td>
            <!-- <td class="px-4 py-2 border-b border-r">{{ formatDate(task.endAt) }}</td> -->
            <td class="px-4 py-2 border-b border-r">
              <input
                type="datetime-local"
                v-model="task.endAt"
                @change="UpdateTaskEndDate(task._id, task.endAt)"
              />
            </td>
            <td class="px-4 py-2 border-b border-r">
              <div class="w-full h-full flex justify-between">
                <div>
                  <div v-if="task.dependencies && task.dependencies.length > 0" class="max-w-[200px] flex flex-wrap gap-2">
                    <span v-for="dep in task.dependencies" :key="dep" class="px-2 py-1 rounded-full">
                      {{ tasks.find(t => t._id === dep)?.name ?? 'None' }} 
                    </span>
                  </div>
                  
                  <div v-else class="max-w-[200px] flex flex-wrap gap-2">
                    <span class="px-2 py-1 rounded-full">
                      None
                    </span>
                  </div>
                </div>
                
                
                <button 
                  @click="onDropdownSelect(task)" 
                  class="ml-2 relative"
                >
                  <span v-if="dropdownOpen[task._id]">▲</span>
                  <span v-else>▼</span>

                  <select 
                    v-if="dropdownOpen[task._id]" 
                    v-model="task.dependencies" 
                    class="w-[200px] max-h-[200px] border bg-white absolute top-10 right-5 z-[50]"
                    multiple
                    @change="UpdateTaskDependencies(task._id, task.dependencies)"
                  >
                    <option v-for="task in tasks" :key="task._id" :value="task._id">
                      {{ task.name }}
                    </option>
                  </select>
                </button>

                
                </div>
            </td>

            <td class="px-4 py-2 border-b border-r">
              <select 
                v-model="task.priority" 
                class="bg-inherit focus:outline-none"
                :class="{
                    'text-red-500': task.priority === 'HIGH',
                    'text-green-500': task.priority === 'LOW',
                    'text-blue-500': task.priority === 'MEDIUM',
                }"
                @change="UpdateTaskPriority(task._id, task.priority)"
              >
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
              </select>
            </td>
          </tr>
           <tr class="odd:bg-white even:bg-gray-50">
            <td class="px-4 py-2 border-b border-r"><button class="w-full h-full" @click="openTaskModal">New Task</button></td>
            <td class="px-4 py-2 border-b border-r">NONE</td>
            <td class="px-4 py-2 border-b border-r">NONE</td>
            <td class="px-4 py-2 border-b border-r">NONE</td>
            <td class="px-4 py-2 border-b border-r">NONE</td>
            <td class="px-4 py-2 border-b border-r">NONE</td>
            <td class="px-4 py-2 border-b border-r">NONE</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="timeline">
      <h2 class="text-xl font-semibold mb-4">Task Timeline</h2>
      <div class="timeline-container relative w-full h-[600px] border border-gray-300 bg-gray-100 overflow-x-auto overflow-y-auto">
        <svg :width="`${widthSVG}px`" :height="`${heightSVG}px`">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>

          <g  v-for="dependency in dependencies" :key="dependency.id">
            <!-- <line
              :x1="dependency.startX"
              :y1="dependency.startY"
              :x2="dependency.endX"
              :y2="dependency.endY"
              stroke="black"
              stroke-width="2"
              marker-start="url(#arrowhead)"
            /> -->

            <line
              :x1="dependency.endX"
              :y1="dependency.startY"
              :x2="dependency.endX"
              :y2="dependency.endY"
              stroke="blue"
              stroke-width="3"
            />

            <line
              :x1="dependency.startX"
              :y1="dependency.startY"
              :x2="dependency.endX"
              :y2="dependency.startY"
              stroke="blue"
              stroke-width="3"
            />
          </g>
          <g v-for="date in getTimelineDates()" :key="date">
            <text 
              :x="getTimelineStyleForDate(date).left+25" 
              y="20" 
              font-size="14" 
              fill="black" 
              text-anchor="middle"
            >
              {{ date }}
            </text>
            <line 
              :x1="getTimelineStyleForDate(date).left-25" 
              :y1="0" 
              :x2="getTimelineStyleForDate(date).left-25" 
              :y2="80000" 
              stroke="gray" 
              stroke-width="1" 
            />
            <line 
              :x1="0" 
              :y1="30" 
              :x2="widthSVG" 
              :y2="30" 
              stroke="black" 
              stroke-width="1" 
            />
            <line 
              :x1="0" 
              :y1="0" 
              :x2="widthSVG" 
              :y2="0" 
              stroke="black" 
              stroke-width="1" 
            />
            <line 
              :x1="0" 
              :y1="0" 
              :x2="0" 
              :y2="heightSVG" 
              stroke="black" 
              stroke-width="1" 
            />
          </g>
        </svg>


        <div v-for="task in tasks" :key="task._id" class="absolute h-8 rounded-md text-white text-center leading-8" :style="getTimelineStyle(task)">
          <div class="px-2 font-bold">{{ task.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import { getProjectTask, 
        updateTask, 
        updateTaskPriority, 
        updateTaskDependencies,
        getMembersOfProject,
        updateTaskAssignedTo,
        updateTaskStartDate,
        updateTaskEndDate,
 } from '@/api/fetchApi';

import emitter from '@/emitter'

export default {
  setup() {
    const dropdownOpen = ref({});
    const dropdownOpenUser = ref({});
    const dependencies = ref([]);

    const widthSVG = ref(500)
    const heightSVG = ref(800)

    const tasks = ref([])

    const projectId = ref([])
    const projectDetails = ref()

    const users = ref([])

    onMounted(async() => {
        init()

    })

        const init = () => {
            emitter.on('*', async(type, ev) => {
                switch (type) {
                    case 'PJ_DETAILS':
                      console.log(ev)
                        const data = await getProjectTask(ev)
                        const pj = await getMembersOfProject(ev)
                        projectId.value = ev

                        projectDetails.value = pj
                        tasks.value = data.tasks

                        console.log(projectDetails.value)

                        getDependenciesLine()

                        break
                      case 'RELOAD_TASK':
                        const dataReload = await getProjectTask(ev)

                        tasks.value = dataReload.tasks

                        console.log(tasks.value)

                        getDependenciesLine()
                        break
                }
            })

        }

    watch(tasks, (n, o) => {

      let depLines = [];
      n.forEach((task, index) => {
        task.dependencies.forEach((id) => {
          const depTask = n.find(t => t._id === id);
          if (depTask) {
            const taskStyle = getTimelineNumericStyle(task);
            const depStyle = getTimelineNumericStyle(depTask);

            const startX = taskStyle.left;
            const endX = depStyle.left + depStyle.width;
            const startY = taskStyle.top + 15;
            const endY = depStyle.top + 15;

            depLines.push({
              id: depTask._id,
              startX,
              endX,
              startY,
              endY
            });
          }
        });
      });
      dependencies.value = depLines;
    })

    const updateTaskStatus = async(taskId, status) => {
      try {
        const data = await updateTask({taskId, status})

        if(data.status === "failed"){
          emitter.emit('NOTIFICATION', data)

          const dataTasks = await getProjectTask(projectId.value)

          tasks.value = dataTasks.tasks
          return
        }
          const dataTasks = await getProjectTask(projectId.value)

          tasks.value = dataTasks.tasks
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    };

    const UpdateTaskPriority = async(taskId, priority) => {
      try {
        const data = await updateTaskPriority({taskId, priority})
        console.log(data)
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    };

    const UpdateTaskDependencies = async(taskId, dependencies) => {
      try {
        const data = await updateTaskDependencies({taskId, dependencies})

        if(data.status === "failed"){
          emitter.emit('NOTIFICATION', data)

          const dataTasks = await getProjectTask(projectId.value)

          tasks.value = dataTasks.tasks
          return
        }
          const dataTasks = await getProjectTask(projectId.value)

          tasks.value = dataTasks.tasks

      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    };

    const UpdateTaskAssignedTo = async(taskId, assignedTo) => { 
      console.log(taskId, assignedTo)
      try {
        const data = await updateTaskAssignedTo({taskId, assignedTo})
        console.log(data)

        const dataTasks = await getProjectTask(projectId.value)

        tasks.value = dataTasks.tasks
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    };

     const UpdateTaskStartDate = async(taskId, startAt) => { 
      const startAtDate = new Date(startAt);
      try {
        const data = await updateTaskStartDate({taskId, startAt: startAtDate.toISOString()})
        console.log(data)

        const dataTasks = await getProjectTask(projectId.value)

        tasks.value = dataTasks.tasks
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    };

     const UpdateTaskEndDate = async(taskId, endAt) => { 
      const endAtDate = new Date(endAt);
      try {
        const data = await updateTaskEndDate({taskId, endAt: endAtDate.toISOString()})
        if(data.status === "failed"){
          emitter.emit('NOTIFICATION', data)

          const dataTasks = await getProjectTask(projectId.value)

          tasks.value = dataTasks.tasks
          return
        }
          const dataTasks = await getProjectTask(projectId.value)

          tasks.value = dataTasks.tasks
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    };
    const getDependenciesLine = () => {
      let depLines = [];
      tasks.value.forEach((task, index) => {
        task.dependencies.forEach((id) => {
          const depTask = tasks.value.find(t => t._id === id);
          if (depTask) {
            const taskStyle = getTimelineNumericStyle(task);
            const depStyle = getTimelineNumericStyle(depTask);

            const startX = taskStyle.left;
            const endX = depStyle.left + depStyle.width;
            const startY = taskStyle.top + 20;
            const endY = depStyle.top + 20;

            depLines.push({
              id: depTask._id,
              startX,
              endX,
              startY,
              endY
            });
          }
        });
      });
      dependencies.value = depLines;

    }
    const getProjectStartDate = () => {
      const startDates = tasks.value.map(task => new Date(task.startAt).getTime()); 
      const earliestStartDate = Math.min(...startDates); 
      return new Date(earliestStartDate); 
    };
    
    const getTimelineNumericStyle = (task) => {
      const startDate = new Date(task.startAt);
      const endDate = new Date(task.endAt);
      const projectStartDate = getProjectStartDate(); 

      const startPosition = (startDate - projectStartDate) / (300 * 60 * 60 * 24);
      const endPosition = (endDate - projectStartDate) / (300 * 60 * 60 * 24);
      const duration = endPosition - startPosition;

      return {
        left: startPosition * 30,
        width: duration * 30,
        top: (tasks.value.indexOf(task) + 1) * 50
      };
    }

    const getTimelineStyle = (task) => {
      const style = getTimelineNumericStyle(task);
      return {
        left: `${style.left}px`,
        width: `${style.width}px`,
        top: `${style.top}px`,
        backgroundColor:
          task.priority === "LOW"
            ? "#00AB72"
            : task.priority === "MEDIUM"
            ? "#0092FE"
            : "#EF3361"
      };
    }

    const getTimelineDates = () => {
      const projectStartDate = getProjectStartDate(); 
      const dates = [];

      let projectEndDate = projectStartDate;
      tasks.value.forEach(task => {
        const endDate = new Date(task.endAt);
        if (endDate > projectEndDate) {
          projectEndDate = endDate;
        }
      });

      let currentDate = new Date(projectStartDate);;
      console.log(projectEndDate, currentDate)
      while (currentDate <= projectEndDate) {
        const dateStr = currentDate.toISOString().split('T')[0]; 
        dates.push(dateStr);
        currentDate.setDate(currentDate.getDate() + 1); 
      }

      widthSVG.value = dates.length * 100
      heightSVG.value = tasks.value.length * 50 + 400
      console.log(widthSVG.value, heightSVG.value)
      return dates;
    };

    const getTimelineStyleForDate = (date) => {
      const projectStartDate = getProjectStartDate(); 
      const currentDate = new Date(date);

      const diffInTime = currentDate - projectStartDate;
      const diffInDays = diffInTime / (300 * 3600 * 24); 

      return {
        left: diffInDays * 30,  
      };
    };


    const onDropdownSelect = (task) => {
      dropdownOpen.value[task._id] = !dropdownOpen.value[task._id];
    }

    const onDropdownSelectUser = async(task) => {
      if(!dropdownOpenUser.value[task._id]){
          const data = await getMembersOfProject(projectId.value);
          users.value = data.data.members;
      }
      dropdownOpenUser.value[task._id] = !dropdownOpenUser.value[task._id];
    }

    const openTaskModal = () => {
        emitter.emit('OPEN_TASK_MODAL')
    }

    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getHours()}:${d.getMinutes()} ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }

      return {
        dropdownOpen,
        dropdownOpenUser,
        tasks,
        users,
        getTimelineStyle,
        dependencies,
        onDropdownSelect,
        onDropdownSelectUser,
        getTimelineDates,
        getTimelineStyleForDate,
        widthSVG,
        heightSVG,
        openTaskModal,
        updateTaskStatus,
        UpdateTaskPriority,
        UpdateTaskDependencies,
        UpdateTaskAssignedTo,
        UpdateTaskStartDate,
        UpdateTaskEndDate,
        formatDate
      }
  }
};
</script>
