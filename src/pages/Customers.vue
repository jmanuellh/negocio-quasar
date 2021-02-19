<template>
  <q-page padding>
    <crud-customers />
  </q-page>
</template>

<script>
import CrudCustomers from 'components/customers/CrudCustomers'

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
  font-size: 2rem;
  line-height: .9rem;
}
</style>
