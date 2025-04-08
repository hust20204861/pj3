<template>
    <BaseLayout>
        <template v-slot:header>
            <DashBoardHeader/>
        </template>
    </BaseLayout>
</template>

<script>
import DashBoardHeader from '@/components/header/DashBoardHeader.vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
export default {
    components : {
        DashBoardHeader,
        BaseLayout
    },
    setup () {
        const role = localStorage.getItem('role');
        return { role }
    }
}
</script>