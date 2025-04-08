<template>
    <BaseLayout>
        <template v-slot:header>
            <ProjectHeader/>
        </template>
        <template v-slot:main>
            <!-- <div class="top-[2%] absolute left-[2%] w-[90%] h-[5%]">

                <button @click="selectTab('manager')" :class="{'font-bold text-gray-600 ml-4': activeTab === 'manager', 
                                                                'font-bold text-gray-400 hover:text-gray-600 ml-4': activeTab !== 'manager'}">
                                                                {{t('6')}}
                                                            </button>
                <button @click="selectTab('member')" :class="{'font-bold text-gray-600 ml-4': activeTab === 'member', 
                                                              'font-bold text-gray-400 hover:text-gray-600 ml-4': activeTab !== 'member'}">
                                                              {{t('7')}}
                                                            </button>
            </div> -->
            
            <div class="top-[2%] absolute left-[2%] w-[90%] h-[94%]">
                <ProjectComponent/>
            </div>
        </template>
    </BaseLayout>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import emitter from '@/emitter';

import BaseLayout from '@/components/layout/BaseLayout.vue';

import ProjectHeader from '@/components/header/ProjectHeader.vue';

import ProjectComponent from '@/components/class/ProjectComponent.vue';

import { getProjectsManager, getProjectsMember } from '@/api/fetchApi';


export default {
    components: {
        BaseLayout,
        ProjectHeader,
        ProjectComponent,
    },
    setup () {
        onMounted(() => {
            console.log(":::::MOUNT PROJECTS")
        })
        return { }
    }
}
</script>