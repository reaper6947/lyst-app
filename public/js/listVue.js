const { createApp } = Vue;



const app = createApp({
    data() {
        return {

            list: {}
        }
    },
    methods: {
        login(e) {
            e.preventDefault()
            window.location = window.location.origin + "/api/login"
        },
        isValidUrl(urlString) {
            try {
                return Boolean(new URL(urlString));
            }
            catch (e) {
                return false;
            }
        },
        goToLink(link) {
            window.location.href = link
        },
        getFavicon(link) {
            let tempUrl = new URL(link)
            return tempUrl.origin+"/favicon.ico"
            
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
            let response = await fetch(`${window.location.origin}/l/p/${urlListId[1]}`)
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