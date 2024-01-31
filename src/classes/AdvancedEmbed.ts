import { ColorResolvable, EmbedBuilder, Interaction } from 'discord.js';
import type { EmbedStyle } from '../types';

const successColor = '#4ecf41';
const errorColor = '#fb3030';
const warnColor = '#e59c27';

const loading = "https://cdn.discordapp.com/emojis/899716841910440048.gif";
const success = 'https://cdn.discordapp.com/emojis/1183410715000832052.png';
const error = 'https://cdn.discordapp.com/emojis/1183410798484271224.png';
const warn = 'https://cdn.discordapp.com/emojis/1173913045127409724.png';

/**
 * A class representing an advanced embed with predefined styles.
 * Extends Discord.js EmbedBuilder.
 */
export class AdvancedEmbed extends EmbedBuilder {
    private interaction: Interaction | undefined;
    private defaultColor: ColorResolvable = '#6ea8cd';

    /**
     * Set the default color for the embed.
     * @param {ColorResolvable} color - The default color to set.
     * @returns {this} - The instance of AdvancedEmbed.
     */
    setDefaultColor(color: ColorResolvable): this {
        this.defaultColor = color;
        return this;
    }

    /**
     * Set the interaction for the embed.
     * @param {Interaction} interaction - The Discord interaction.
     * @returns {this} - The instance of AdvancedEmbed.
     */
    setInteraction(interaction: Interaction): this {
        this.interaction = interaction;
        return this;
    }

    /**
     * Set the style of the embed with optional title.
     * @param {EmbedStyle} style - The style of the embed.
     * @param {string} [title] - Optional title for the embed.
     * @returns {this} - The instance of AdvancedEmbed.
     */
    setStyle(style: EmbedStyle, title?: string): this {
        this.setAuthor({
            name: `${
                style === 'success'
                    ? 'Başarılı — '
                    : style === "loading" ? "Yükleniyor — " : style === 'error'
                    ? 'Hata — '
                    : style === 'warn'
                    ? 'Uyarı — '
                    : `${title ? `${title} — ` : ''}`
            }${this.interaction?.user.username}`,
            iconURL: this.interaction?.user.displayAvatarURL() ?? '',
        });

        this.setColor(
            style === 'success'
                ? successColor 
                : style === "loading" ? this.defaultColor : style === 'error'
                ? errorColor
                : style === 'warn'
                ? warnColor
                : this.defaultColor,
        );

        this.setFooter({
            text: `${
                style === 'success'
                    ? 'İşlem başarıyla tamamlandı.'
                    : style === "loading" ? "Bu işlem biraz zaman alabilir." : style === 'error'
                    ? 'Bir hata oluştu, tekrar deneyin.'
                    : style === 'warn'
                    ? 'Bir uyarı bulunuyor.'
                    : `${this.interaction?.client.user.username} © Tüm hakları saklıdır.`
            }`,
            iconURL: `${
                style === 'success'
                    ? success
                    : style === "loading" ? loading : style === 'error'
                    ? error
                    : style === 'warn'
                    ? warn
                    : `${this.interaction?.client.user.displayAvatarURL()}`
            }`,
        });

        this.setTimestamp();

        return this;
    }
}
