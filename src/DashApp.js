const Application = require("./Application")
const FormData = require('form-data')

class DashApp extends Application {
    constructor(host, key) {
        super(host, key)
    }

    async getUserByDiscordId(discord_id) {
        const user = (await this.instance.get(`/api/users/${discord_id}`)).data
        return user
    }

    async getCredits(discord_id) {
        const credits = (await this.getUserByDiscordId(discord_id))['credits']
        return credits
    }

    async setCredits(discord_id, credits){
        const {name, email, server_limit, role} = await this.getUserByDiscordId(discord_id)

        let data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('credits', credits)
        data.append('server_limit', server_limit)
        data.append('role', role)

        await this.instance.patch(`/api/users/${discord_id}`, data, {
            headers: {
                ...data.getHeaders()
            }
        }).then(() => console.log(`[ > ] Set credits to ${deltaCredits} for user [discord_id = ${discord_id}]`))
            .catch((error) => console.log(`[ * ] Error while setting credits for user [discord_id = ${discord_id} \n Traceback: \n ${error}`))
    }

    async addCredits(discord_id, deltaCredits){
        const {name, email, credits, server_limit, role} = await this.getUserByDiscordId(discord_id)
        const newCredits = credits + deltaCredits

        let data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('credits', newCredits)
        data.append('server_limit', server_limit)
        data.append('role', role)

        await this.instance.patch(`/api/users/${discord_id}`, data, {
            headers: {
                ...data.getHeaders()
            }
        }).then(() => console.log(`[ > ] Added ${deltaCredits} to user [discord_id = ${discord_id}]`))
            .catch((error) => console.log(`[ * ] Error while adding credits to user [discord_id = ${discord_id} \n Traceback: \n ${error}`))
    }

    async subtractCredits(discord_id, deltaCredits){
        const {name, email, credits, server_limit, role} = await this.getUserByDiscordId(discord_id)
        const newCredits = credits - deltaCredits

        if(newCredits < 0)
            throw new Error(`User does not have enough credits!`)

        let data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('credits', newCredits)
        data.append('server_limit', server_limit)
        data.append('role', role)

        await this.instance.patch(`/api/users/${discord_id}`, data, {
            headers: {
                ...data.getHeaders()
            }
        }).then(() => console.log(`[ > ] Subtracted ${deltaCredits} from user [discord_id = ${discord_id}]`))
            .catch((error) => console.log(`[ * ] Error while subtracting credits from user [discord_id = ${discord_id} \n Traceback: \n ${error}`))
    }

}

module.exports = DashApp