# Utilscord
🛠️ It was created to make writing Discord bots faster and more convenient.

## 🚀 Changes
- Errors have been made more visible for **Anti Crash**, however, how many errors you receive during the time your application is running will be displayed.
- We created a **Table** class prepared with Canvas that you can edit however you want.
- We changed the name **AdvancedEmbedType** to **EmbedType**.
- **OneHalfSecond (30 seconds)**, **OneQuarterSecond(15 seconds)** were added to the **Time** object.
- Added **findAndGetEmojis**, **getEmoji**.

## 🏅 A few usage examples
```js
const { trim, findAndGetEmojis, captalize } = require("utilscord");
/* import { trim, findAndGetEmojis, captalize } from "utilscord"; */

const message = "This module is very nice.";
const abbreviatedMessage = trim(message, 10);

console.log(abbreviatedMessage); // Output --> "This mo..."

const updateMsg = "Hello 👋, new update available today! <:update:986539100221874176>";
const emojis = findAndGetEmojis(updateMsg);

console.log(emojis) // Output --> ["👋", "<:update:986539100221874176>"]

const name = "rOmAn";
const editedName = captalize(name);

console.log(editedName) // Output --> "Roman"
```
More? Take a look at its [documentation](https://github.com/romanbaba/utilscord/tree/master/docs)!

## 🐞 I found a bug!
📱 If you want to reach me, you can reach me via [Discord](https://discord.gg/altyapilar)!