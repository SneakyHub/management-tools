const Application = require("./Application")

class PanelApp extends Application {
    constructor(host, key) {
        super(host, key)
    }

    async getAllServers() {
        const servers = (await this.instance.get(`/api/application/servers?page=0&per_page=10000`)).data['data'].map(x => x.attributes)
        return servers
    }

    async getServerById(server_id) {
        const server = (await this.instance.get(`/api/application/servers/${server_id}`))['attributes']
        return server
    }

    async getServersByEgg(egg_id) {
        const servers = (await this.getAllServers()).filter( server => server.egg == egg_id )
        return servers
    }

    async getServersByNest(nest_id) {
        const servers = (await this.getAllServers()).filter( server => server.nest == nest_id )
        return servers
    }

    async getServersByUser(user_id) {
        const servers = (await this.instance.get(`/api/application/users/${user_id}?include=servers`)).data['attributes']['relationships']['servers']['data'].map(x => x.attributes)
        return servers
    }

    async deleteAllServers() {
        const servers = await this.getAllServers()
        for(const server of servers)
            await this.deleteServer(server)
    }

    async deleteServer(server) {
        await this.instance.delete(`/api/application/servers/${server.id}/force`)
        .then(() => console.log(`[ > ] Successfully deleted server [ID = ${server.id}]`))
        .catch(error => console.log(`[ * ] Error in deleting server [ID = ${server.id}] \n Traceback: \n ${error}`))
    }

    async deleteServerById(server_id) {
        await this.instance.delete(`/api/application/servers/${server_id}/force`)
        .then(() => console.log(`[ > ] Successfully deleted server [ID = ${server_id}]`))
        .catch(error => console.log(`[ * ] Error in deleting server [ID = ${server_id}] \n Traceback: \n ${error}`))
    }

    async deleteServersByEgg(egg_id){
        const servers = await this.getServersByEgg(egg_id)
        console.log(`[ > ] Deleting servers with [EGG = ${egg_id}]`)
        for(const server of servers)
            await this.deleteServer(server)
    }

    async deleteServersByNest(nest_id){
        const servers = await this.getServersByNest(nest_id)
        console.log(`[ > ] Deleting servers with [NEST = ${nest_id}]`)
        for(const server of servers)
            await this.deleteServer(server)
    }
}

module.exports = PanelApp