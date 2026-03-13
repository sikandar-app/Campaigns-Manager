<template>
  <div>
    <div class="campaign-page-header row justify-between" style="padding-bottom: 24px">
      <div class="col-9">
        <div class="text-h6 text-subtitle2 text-grey">TEMPLATE ID - 972</div>
        <div class="title vertical-middle q-my-sm">Sign up Regular</div>
      </div>
      <div class="col-3 justify-center">
        <div class="justify-center row">
          <div class="col-auto q-mt-lg">
            <button class="campaign-button float-left q-mr-sm">Save</button>
            <button class="campaign-button float-left q-mr-sm">Publish</button>
            <q-btn-dropdown text-color="black" label="Actions" flat :outline="true"
              class="campaign-btn-transparent text-h6">
              <q-list>
                <q-item clickable v-close-popup>
                  <span class="material-icons-outlined q-pl-none q-mr-sm font-size-14" avatar>
                    edit
                  </span>
                  <q-item-section> Edit </q-item-section>
                </q-item>
              </q-list>
              <q-list>
                <q-item clickable v-close-popup>
                  <span class="material-icons-outlined q-pl-none q-mr-sm font-size-14" avatar>
                    copy
                  </span>
                  <q-item-section> Create a copy </q-item-section>
                </q-item>
              </q-list>
              <q-list>
                <q-item clickable v-close-popup>
                  <span class="material-icons-outlined q-pl-none q-mr-sm font-size-14" avatar>
                    delete
                  </span>
                  <q-item-section> Delete </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="campaign-pagy-body campaign-form-campaign full-width">
      <template-form></template-form>
    </div>
  </div>
</template>
<script>
import TemplateForm from "../Form/TemplateForm.vue";
export default {
  name: "Edit",
  components: {
    TemplateForm,
  },
  data() {
    return {};
  },
};
</script>
