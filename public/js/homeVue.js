const { createApp } = Vue;


const app = createApp({
    data() {
        return {
           
            lists: {}
        }
    },
    methods: {
        login(e) {
            e.preventDefault()
            window.location = window.location.origin + "/api/login"
        },
        formatDate(date) {
            let newData = new Date(date)
            return "Edited: " + newData.toLocaleString()
        },
        gotToList(item) {
            window.location.href = window.location.origin + "/l/" + item.ID
          },

        sortItems(e) {
            e.preventDefault()

            this.list.sort((a, b) => {
                if (a.isMarked && !b.isMarked) {
                    return -1
                }
                if (!a.isMarked && b.isMarked) {
                    return 1
                }
                return 0
            })
        },

    },
    async mounted() {
        try {
      
            let response = await fetch(`${window.location.origin}/u/p/lists`)
            if (response.status >= 200 && response.status <= 200) {
              const data = await response.json()
              // console.log(data)
              this.lists = [...data]
              
            } else {
              throw Error(response.statusText)
            }
          } catch (err) { console.log(err) }
    },
})

app.mount('#app')