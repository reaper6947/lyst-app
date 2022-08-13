const { createApp } = Vue;

const currentUserId = document.querySelector("#nav-username").innerText.trim()

const app = createApp({
    data() {
        return {
            currentUserId,
            inputText: "",
            inputEditor: "",
            list: {}
        }
    },
    methods: {
        logout(e) {
            e.preventDefault()
            window.location = window.location.origin + "/api/logout"
        },
        switchPrivacy(e) {
            e.preventDefault()

        },
        addItem() {
            this.list.items.push({ text: this.inputText, isMarked: false, isEditable: false })
            //this.list.items.append(this.inputText)
            this.inputText = ""
            this.updateList()
        },
        deleteItem(item) {
            const index = this.list.items.indexOf(item);
            if (index > -1) { // only splice array when item is found
                this.list.items.splice(index, 1); // 2nd parameter means remove one item only
                this.updateList()
            }
        },
        addEditor() {
            this.list.collaborators.push(this.inputEditor)
            this.inputEditor = ""
            this.updateList()
        },
        deleteEditor(editor) {
            const index = this.list.collaborators.indexOf(editor);
            if (index > -1) { // only splice array when item is found
                this.list.collaborators.splice(index, 1); // 2nd parameter means remove one item only
                this.updateList()
            }
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

        async updateList() {

            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...this.list })
            };
            try {
                const response = await fetch(
                    `http://localhost:3000/u/${currentUserId}/update/${this.list.ID}`,
                    requestOptions
                );
                let data = await response.json()
            } catch (err) {
                console.log(err);
            }
        }
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