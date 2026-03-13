<template>
  <q-item v-if="link" clickable tag="a" :href="link" class="campaign-sidebar-item q-py-md" :class="{
    active: $route.name === name,
    'campaign-sidebar-help': title == 'Help',
  }">
    <q-item-section v-if="icon" avatar class="q-line-height-none campaign-sidebar-item-section">
      <q-icon class="campaign-sidebar-icon q-pb-sm" :name="icon" />
      <label class="campaign-sidebar-menu-item">{{ title }}</label>
    </q-item-section>
  </q-item>
  <q-item v-else clickable tag="a" @click="logOut" class="campaign-sidebar-item q-py-md">
    <q-item-section v-if="icon" avatar class="q-line-height-none campaign-sidebar-item-section">
      <q-icon class="campaign-sidebar-icon q-pb-sm" :name="icon" />
      <label class="campaign-sidebar-menu-item">{{ title }}</label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },
    name: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
