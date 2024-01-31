import { Colors, EmbedBuilder, Interaction } from "discord.js";

export const createEmbed = (interaction: Interaction, title: string = 'Bot') => new EmbedBuilder()
  .setColor(Colors.Blue)
  .setAuthor({
    name: `${title} — ${interaction.user.globalName} (@${interaction.user.username})`,
    iconURL: interaction.user.displayAvatarURL(),
  })
  .setTimestamp()
  .setFooter({
    text: `${interaction.client.user.username} ©️ ${new Date().getFullYear()}`,
    iconURL: interaction.client.user.displayAvatarURL(),
  });