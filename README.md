# bell-bot
flowdock bot bellbot

A little bot for interacting with flowdock

Usage
-----
- Clone
- Add a file called `config.json` to the root of the project. This file is gitignored.
- Your config should be of the form:

```json
{
	"flowdock": {
		"username": "",
		"password": "",
		"flowIds": ["", ""]
	},
	"redis": {
		"host": "",
		"password": ""
	}
}
```
- Run `node index.js`
