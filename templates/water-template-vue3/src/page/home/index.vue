<template>
  <div>Home</div>
  <div>{{ cpdCount }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useHomeStore } from './store';

const homeStore = useHomeStore();
const cpdCount = computed(() => homeStore.count);
</script>
<script lang="ts">
export default {
  name: 'HomePage',
};
</script>

<style lang="scss" scoped>

</style>
