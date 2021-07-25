const Application = require("./Application")

class PanelApp extends Application {

    async get getAllServers() {
        const servers = (await instance.get(`/api/application/servers?page=0&per_page=10000`)).data['data'].map(x => x.attributes)
        return servers
    }

    async deleteServer(server) {
        await instance.delete(`/api/application/servers/${server.id}/force`)
    }

    async deleteServerById(id) {
        await instance.delete(`/api/application/servers/${id}/force`)
    }
}

module.exports = PanelApp