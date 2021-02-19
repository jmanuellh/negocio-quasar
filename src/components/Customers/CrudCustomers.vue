<template lang="pug">
  div
    // Btn Add
    div(class="flex justify-between items-center")
      h4(class="q-ma-md") Clientes
      q-btn(
        @click="showDialog = true"
        :label="$t('btnAdd')"
        color="primary"
        class="q-ma-md"
      )
    // Dialog of Btn Add
    q-dialog(v-model="showDialog" @hide="cleanForm")
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
          q-btn(
            @click="add"
            :label="$t('customers.labelAdd')"
            color="primary"
            v-close-popup
          )
    q-table(
      :data="items"
      :columns="columns"
      row-key="id"
    )
</template>

<script>
export default {
  data () {
    return {
      items: [],
      showDialog: false,
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
        }
      ]
    }
  },
  created () {
    // this.getCustomers()
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
