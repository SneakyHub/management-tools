const Application = require("./Application")

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

        const data = {
            'name' : name,
            'email': email,
            'credits': credits,
            'server_limit' : server_limit,
            'role': role
        }

        await this.instance.patch(`/api/users/${discord_id}`, data)
            .then(() => console.log(`[ > ] Set credits to ${credits} for user [discord_id = ${discord_id}]`))
            .catch((error) => console.log(`[ * ] Error while setting credits for user [discord_id = ${discord_id}] \n Traceback: \n ${error}`))
    }

    async addCredits(discord_id, deltaCredits){
        const {name, email, credits, server_limit, role} = await this.getUserByDiscordId(discord_id)
        const newCredits = credits + deltaCredits

        const data = {
            'name' : name,
            'email': email,
            'credits': newCredits,
            'server_limit' : server_limit,
            'role': role
        }

        await this.instance.patch(`/api/users/${discord_id}`, data).then(() => console.log(`[ > ] Added ${deltaCredits} credits to user [discord_id = ${discord_id}]`))
            .catch((error) => console.log(`[ * ] Error while adding credits to user [discord_id = ${discord_id}] \n Traceback: \n`, error))
    }

    async subtractCredits(discord_id, deltaCredits){
        const {name, email, credits, server_limit, role} = await this.getUserByDiscordId(discord_id)
        const newCredits = credits - deltaCredits

        if(newCredits < 0)
            throw new Error(`User does not have enough credits!`)

        const data = {
            'name' : name,
            'email': email,
            'credits': newCredits,
            'server_limit' : server_limit,
            'role': role
        }

        await this.instance.patch(`/api/users/${discord_id}`, data).then(() => console.log(`[ > ] Subtracted ${deltaCredits} credits from user [discord_id = ${discord_id}]`))
            .catch((error) => console.log(`[ * ] Error while subtracting credits from user [discord_id = ${discord_id}] \n Traceback: \n`, error))
    }

}

module.exports = DashApp