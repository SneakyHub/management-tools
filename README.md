# management-tools
SneakyHub pterodactyl &amp; dashboard management tools.

### `PanelApp`

* #### `async getAllServers()`
Returns: `Promise<Array<server-objects>>` <br>
Fetch all servers

* #### `async getServersByEgg(egg_id)`
Returns: `Promise<Array<server-objects>>` <br>
Fetch all servers with egg = `egg_id`

* #### `async getServersByNest(nest_id)`
Returns: `Promise<Array<server-objects>>` <br>
Fetch all servers with nest = `nest_id`

* #### `async deleteAllServers()`
Returns: `void` <br>
Delete all servers

* #### `async deleteServer(server)`
Returns: `void` <br>
Delete a server. Takes 'server-object' as parameter

* #### `async deleteServersByEgg(egg_id)`
Returns: `void` <br>
Delete all servers with egg = `egg_id`

* #### `async deleteServersByNest(nest_id)`
Returns: `void` <br>
Delete all servers with nest = `nest_id`
