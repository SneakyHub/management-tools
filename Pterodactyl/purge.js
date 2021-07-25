const { default: axios } = require("axios")

const host = 'https://panel.sneakyhub.com/'
const apikey = '' //Place admin apikey here

let instance = axios.create({
    baseURL: host,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
    }
})



async function deleteServer(server) {
    await instance.delete(`/api/application/servers/${server.id}/force`)
}

async function getAllServers() {
    let servers = []
    const data = (await instance.get(`/api/application/servers?page=0&per_page=5000`)).data['data'].map(x => x.attributes)
    servers.pushArray(data)
    return servers
}


// just for reference
Array.prototype.pushArray = function(arr) {
    this.push.apply(this, arr);
};


getAllServers().then(async servers => {
    /*
    'servers' is a list of ALL server objects
    deleteServer(server) takes a server object as parameter
    */

    /*
    //=========UNCOMMENT THIS PART TO DELETE SPECIFIC EGG=========
    const toDeleteEgg = 69420 // Replace with egg to delete
    servers = servers.filter(server => server.egg == toDeleteEgg)
    */
    
    for(const server of servers)
        await deleteServer(server).catch(error => console.log(error))

})