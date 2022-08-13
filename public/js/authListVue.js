const { createApp } = Vue;

const currentUserId = document.querySelector("#nav-username").innerText.trim()

const app = createApp({
    data() {
        return {
            currentUserId,
            list :{}
        }
    },
    methods: {
        logout(e) {
            e.preventDefault()
            window.location = window.location.origin + "/api/logout"
        },
    },
    async mounted() {
        try {
            let urlListId = window.location.pathname.split("/l/")

          let response = await fetch(`http://localhost:3000/l/${currentUserId}/${urlListId[1]}`)
          if (response.status >= 200 && response.status <= 200) {
            const data = await response.json()
              this.list = data
          } else {
            throw Error(response.statusText)
          }
        } catch (err) { console.log(err) }
      },
})

app.mount('#app')