<template lang="pug">
  div
    // Btn Add
    div(class="text-right")
      q-btn(:label="$t('btnAdd')" color="primary" @click="prompt = true")
    // Dialog of Btn Add
    q-dialog(v-model="prompt" persistent)
      //- q-card(style="min-width: 350px")
      //-   q-card-section
      //-     div(class="text-h6") Your address

      //-   q-card-section(class="q-pt-none")
      //-     q-input(dense v-model="address" autofocus @keyup.enter="prompt = false")

      //-   q-card-actions(align="right" class="text-primary")
      //-     q-btn(flat label="Cancel" v-close-popup)
      //-     q-btn(flat label="Add address" v-close-popup)
      q-form(
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      )
        q-input(
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        )

        q-input(
          filled
          type="number"
          v-model="age"
          label="Your age *"
          lazy-rules
          :rules=`[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]`
        )

        q-toggle(v-model="accept" label="I accept the license and terms")

        div
          q-btn(label="Submit" type="submit" color="primary")
          q-btn(label="Reset" type="reset" color="primary" flat class="q-ml-sm")
</template>
