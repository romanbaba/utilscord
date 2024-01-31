# A more beautiful embed view
Get a better and more beautiful look aside from regular embeds!

## Example
```js
const { AdvancedEmbed, EmbedStyle } = require("utilscord");
const { Client } = require("discord.js");

const client = new Client({ intents: [] });

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand() && interaction.commandName = "embed") {
    const embed = new AdvancedEmbed()
      .setInteraction(interaction)
      .setStyle(EmbedStyle.Success)
      .setDescription("Successful, the message was displayed successfully.");
    
    interaction.reply({ embeds: [embed] });
  }
});

client.once("ready", () => console.info("The bot logged in successfully."));

client.login("...");
```

## .setInteraction
This is the method required for the user to access general information (username, avatar, etc.).
### Example
```js
embed<AdvancedEmbed>.setInteraction(interaction)
// interaction --> Parameter from "interactionCreate" event
```

## .setStyle
Determines what style this embed will appear in.
### Example
```js
const { EmbedStyle } = require("utilscord");
embed<AdvancedEmbed>.setStyle(EmbedStyle.Error)
```

### Styles
- Success
  - Sets the view to **Success**.
- Error
  - Sets the view to **Error**.
- Loading
  - Sets the view to **Loading**.
- Warn
  - Sets the view to **Warn**.
- Default
  - Sets the view to **Default**.
  - It is the natural and normal state of appearance.
