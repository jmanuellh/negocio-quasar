<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-select
          :label="$t('language')"
          v-model="lang"
          :options="langOptions"
          style="min-width: 9rem"
          @input="changeSelectLanguage"
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-select>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { } from 'quasar'

const linksData = [
  {
    title: 'Inicio',
    caption: 'Pagina de bienvenida',
    icon: 'code',
    link: ''
  },
  {
    title: 'Clientes',
    caption: 'Registro de clientes',
    icon: 'record_voice_over',
    link: '/clientes'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'es', label: 'Español' }
      ],
      lang: { value: 'es', label: 'Español' },
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    async changeSelectLanguage () {
      this.$i18n.locale = this.lang.value
      await import(`quasar/lang/${this.$i18n.locale}`)
        .then(lang => {
          this.$q.lang.set(lang.default)
        })
    }
  }
}
</script>
