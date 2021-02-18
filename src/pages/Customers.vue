<template>
  <q-page padding>
    <h1 class="q-ma-sm">{{ $t('titleCustomers') }}</h1>
    <crud-customers />
  </q-page>
</template>

<script>
import CrudCustomers from 'components/customers/CrudCustomers.vue'

export default {
  name: 'PageCustomers',
  components: {
    CrudCustomers
  },
  data () {
    return {
      title: 'Usuarios'
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 1.5rem;
  line-height: 1.5rem;
}
</style>
