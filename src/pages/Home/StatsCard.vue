<template>
  <q-card flat bordered class="nv-card">
    <q-card-section class="q-pa-none">
      <div class="text-base">{{ label }}</div>
      <div class="text-h2 q-mt-md">{{ value }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["label", "value"],
};
</script>
