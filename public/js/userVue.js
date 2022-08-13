const { createApp } = Vue;

const temp = window.location.pathname.split("/");
const username = temp[temp.length - 1];

createApp({
  data() {
    return {
      newList: {
        author: username,
        ID: "",
        title: "",
        description: "",
        isPrivate: true,
        isMarked: false,
        collaborators: [],
        items: [],
      },
      currentList: [],
    };
  },
  computed: {
    submitCheck() {
      return this.titleCheck > 0 && this.newList.description.length > 0;
    },
    titleCheck() {
      return this.newList.title.length > 0;
    },
  },
  methods: {
    async newListSubmit() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(this.newList),
      };

      this.newList.title = "";
      this.newList.description = "";

      try {
        const response = await fetch(
          `http://localhost:3000/u/${username}/newList`,
          requestOptions
        );
        const data = await response.json();
        this.currentList.push(data);

      } catch (err) {
        console.log(err);
      }
    },
    async deleteList(item) {
      const requestOptions = {
        method: "DELETE"
      };
      try {
        const response = await fetch(
          `http://localhost:3000/u/${username}/delete/${item.ID}`,
          requestOptions
        );
        let data = await response.json()
        //console.log(data)
        const index = this.currentList.indexOf(item);
        if (index > -1) { // only splice array when item is found
          this.currentList.splice(index, 1); // 2nd parameter means remove one item only
        }

      } catch (err) {
        console.log(err);
      }
    },
    async updateList(list) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...list })
      };
      try {
        const response = await fetch(
          `http://localhost:3000/u/${username}/update/${list.ID}`,
          requestOptions
        );
        let data = await response.json()
      } catch (err) {
        console.log(err);
      }
    },
    sortList(e) {
      e.preventDefault();
      this.currentList.sort((a, b) => {
        if (a.isMarked && !b.isMarked) {
          return -1
        }
        if (!a.isMarked && b.isMarked) {
          return 1
        }
        return 0
      })
     
    },

    gotToList(item) {
      window.location.href = window.location.origin + "/l/" + item.ID
    },
    logout(e) {
      e.preventDefault()
      window.location = window.location.origin +"/api/logout"
    },
    formatDate(date) {
      let newData = new Date(date)
      return "Edited: " + newData.toLocaleString()
    }
  },
  async mounted() {
    try {
      let response = await fetch(`http://localhost:3000/u/${username}/newList`)
      if (response.status >= 200 && response.status <= 200) {
        const data = await response.json()
        // console.log(data)
        this.currentList = [...this.currentList, ...data]
        
      } else {
        throw Error(response.statusText)
      }
    } catch (err) { console.log(err) }
  },
}).mount("#app");
