<template>
  <div>
    <q-table grid bordered rounded-borders title="" :rows="campaigns" :columns="columns" row-key="id" hide-header
      :filter="filter" class="campaign-table-listing q-mt-sm q-ma-md" v-model="selected">
      <template v-slot:top-left>
        <div class="filters-templates-checkbox q-pr-sm">
          <q-checkbox dense v-model="signup" label="Sign up" class="q-mr-sm" />
          <q-checkbox dense v-model="reminders" label="Reminders" class="q-mr-sm" />
          <q-checkbox dense v-model="duesoon" label="Due Soon" />
        </div>
      </template>
      <template v-slot:top-right>
        <q-btn flat>
          <q-icon name="o_table_rows" size="24px" @click="openView()"></q-icon>
        </q-btn>

        <q-input outlined dense bg-color="white" debounce="300" v-model="filter" placeholder="Search"
          style="border-radius: 16px">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered class="campaign-card" :class="props.selected
              ? $q.dark.isActive
                ? 'bg-grey-9'
                : 'bg-grey-2'
              : ''
            ">
            <q-card-section>
              <div class="row full-width">
                <div class="col">
                  <div class="row items-center justify-between text-h3">
                    {{ props.row.title }}
                  </div>
                </div>
                <div class="col-auto">
                  <q-btn color="grey-7 q-pb-md" round flat icon="more_vert">
                    <q-menu anchor="top right" self="top right" cover auto-close>
                      <q-list style="width: 200px; border-radius: 16px">
                        <q-item clickable>
                          <q-item-section>
                            <div class="row">
                              <q-icon name="toggle_on" class="q-mr-md" size="24px"></q-icon>
                              Deactivate
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item clickable :to="{
                          name: 'agency.campaign.edit',
                        }">
                          <q-item-section>
                            <div class="row">
                              <q-icon name="edit" class="q-mr-md" size="24px"></q-icon>
                              Edit
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>
                            <div class="row">
                              <q-icon name="content_copy" class="q-mr-md" size="24px"></q-icon>
                              Duplicate
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                        <q-item clickable>
                          <q-item-section>
                            <div class="row">
                              <q-icon name="delete" class="q-mr-md" size="24px"></q-icon>
                              Remove
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <div class="row content-end q-pb-sm" style="min-height: 48px">
                <div class="q-mr-md text-subtitle1">
                  <q-icon name="calendar_today"></q-icon> {{ props.row.days }}
                </div>
                <div class="q-mr-md text-subtitle1">
                  <q-icon name="schedule"></q-icon> {{ props.row.time }}
                </div>
                <div class="text-subtitle1">
                  <div class="text-subtitle1">ID - {{ props.row.id }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["campaigns"],
  data() {
    return {
      columns: [
        {
          name: "status",
          required: true,
          lable: "title",
          align: "left",
          field: "status",
        },
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: (row) => row.title,
        },
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.id,
        },

        {
          name: "days",
          required: false,
          lable: "Days",
          field: "days",
        },
        {
          name: "time",
          required: false,
          lable: "Time",
          field: "time",
        },
        {
          name: "audiece_count",
          required: false,
          lable: "Audience Count",
          field: "audiece_count",
        },
        {
          name: "days_left",
          required: false,
          lable: "Days Left",
          field: "days_left",
        },
      ],
      filter: ref(""),
      signup: ref(false),
      reminders: ref(false),
      duesoon: ref(false),
      selected: [],
    };
  },
  methods: {
    openView() {
      this.$router.push({ path: this.$route.path, query: { tableView: 1 } });
    },
  },
};
</script>

<style></style>
