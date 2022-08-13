const { createApp } = Vue;



const app = createApp({
    data() {
        return {
           
            list: {}
        }
    },
    methods: {
        logout(e) {
            e.preventDefault()
            window.location = window.location.origin + "/api/logout"
        },

        sortItems(e) {
            e.preventDefault()

            this.list.items.sort((a, b) => {
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
            let urlListId = window.location.pathname.split("/l/")

            let response = await fetch(`http://localhost:3000/l/p/${urlListId[1]}`)
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