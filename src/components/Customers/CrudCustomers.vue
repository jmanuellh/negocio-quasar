<template lang="pug">
  div
    // Btn Add
    div(class="flex justify-between items-center")
      h4(class="q-ma-md") Clientes
      q-btn(
        @click="showDialogAdd = true"
        :label="$t('btnAdd')"
        color="primary"
        class="q-ma-md"
      )

    q-table(
      :data="items"
      :columns="columns"
      row-key="id"
    )
      //- template(slot="col-image_url" scope="cell")
      //-   tooltip-button(:url="cell.row.image_url")
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="actions" :props="props")
            q-btn(color='primary', label='Editar' @click="editing(props.row.id)")
            q-btn(color='primary', label='Eliminar' @click="showDialogDelete = true")
    // Dialog of Btn Add
    q-dialog(v-model="showDialogAdd" @hide="cleanForm")
      q-card(style="min-width: 350px")
        q-card-section(class="row")
          div(class="text-h6") {{$t('customers.titleForm')}}
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          q-input(
            filled
            v-model="customer.name"
            :label="$t('customers.labelName')"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          )

        q-card-section(class="q-pt-none")
          q-input(
            filled
            type="tel"
            v-model.number="customer.number"
            :label="$t('customers.labelPhoneNumber')"
            lazy-rules
            :rules=`[
              val => val !== null && val !== '' || 'Please type you number',
              val => val > 0 && val < 100 || 'Please type a real number'
            ]`
          )
        q-card-actions(align="right" class="text-primary")
          q-btn(
            :label="$t('customers.labelClose')"
            flat
            class="q-ml-sm"
            v-close-popup
          )
          span(v-if="customer.id != undefined")
            q-btn(
              @click="update"
              label="Actualizar"
              color="primary"
              v-close-popup
            )
          span(v-else)
            q-btn(
              @click="add"
              :label="$t('customers.labelAdd')"
              color="primary"
              v-close-popup
            )
    // Dialog of Btn Delete
    //- q-dialog(v-model="showDialog" @hide="cleanForm")
    //-   q-card(style="min-width: 350px")
    //-     q-card-section(class="row")
    q-dialog(v-model="showDialogDelete")
      q-card
        q-card-section(class="row items-center")
          q-avatar(:icon="mdiDelete" color="primary" text-color="white")
          span(class="q-ml-sm") Eliminar elemento
        q-card-actions(align="right")
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" color="primary" v-close-popup />
</template>

<script>
import { mdiDelete } from '@quasar/extras/mdi-v5'

export default {
  data () {
    return {
      items: [],
      showDialogAdd: false,
      customer: {
        name: '',
        number: 0
      }
    }
  },
  computed: {
    columns () {
      return [
        {
          name: 'name',
          label: this.$t('customers.name'),
          field: 'name'
        },
        {
          name: 'number',
          label: this.$t('customers.number'),
          field: 'number'
        },
        {
          name: 'actions',
          label: this.$t('customers.actions'),
          field: 'actions'
        }
      ]
    }
  },
  created () {
    // this.getCustomers()
    this.mdiDelete = mdiDelete
  },
  methods: {
    cleanForm () {
      this.customer = {
        name: '',
        number: 0
      }
    },
    getCustomers () {
      this.$axios.get('/customers').then(r => {
        this.items = r.data
      })
    },
    add () {
      this.$axios.post('/customers', this.customer).then(() => {
        this.getCustomers()
      })
    },
    delete (id) {
      this.$axios.delete('/customers/', +id).then(() => {
        this.getCustomers()
      })
    },
    editing (item) {
      this.customer = item
      this.showDialogAdd = true
    },
    update () {
      this.$axios.put('/customers/' + this.customer, this.customer.id).then(() => {
        this.getCustomers()
        this.cleanForm()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 2rem;
  line-height: .9rem;
}
</style>
