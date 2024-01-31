import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Collector,
  InteractionCollector,
} from 'discord.js';
import { error } from '../helpers/logger';

  /**
   * A class representing a page builder for creating paginated messages with buttons.
   */
  export class PageBuilder {
    /**
     * ActionRowBuilder for components (buttons).
     * @type {ActionRowBuilder<ButtonBuilder>}
     * @private
     */
    private components: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>();
  
    /**
     * Array of pages for the paginated message.
     * @type {Array<any>}
     * @private
     */
    private pages: any[] = [];
  
    /**
     * InteractionCollector for handling button interactions.
     * @type {InteractionCollector<ButtonInteraction>}
     * @private
     */
    private collector: InteractionCollector<ButtonInteraction> | undefined;
  
    /**
     * Current page number.
     * @type {number}
     * @private
     */
    private currentPage: number = 0;

    /**
     * Creates an instance of PageBuilder.
     */
    constructor() {}
  
    /**
     * Sets the pages for the paginated message.
     *
     * @param {Array} pages - The array of pages.
     * @returns {PageBuilder} The current PageBuilder instance.
     * @throws Will throw an error if pages are missing or not an object.
     */
    public setPages(pages: any[]): this {
      if (!pages || typeof pages !== 'object') {
        error('"pages" parameter is missing or not an object!');
      }
      this.pages = pages;
      return this;
    }

    /**
     * Get current page.
     *
     * @returns {any} A page
     */
    public getPage(): any {
        return this.pages[this.currentPage];
    }
  
    /**
     * Sets the components (buttons) for the paginated message.
     *
     * @returns {PageBuilder} The current PageBuilder instance.
     */
    public setComponents(): this {
      const isOnePage = this.pages.length === 1;

      this.components.addComponents(
        new ButtonBuilder()
          .setCustomId('fastLeft')
          .setDisabled(true)
          .setEmoji({ name: '⏪' })
          .setStyle(ButtonStyle.Primary),
  
        new ButtonBuilder()
          .setCustomId('left')
          .setDisabled(true)
          .setEmoji({ name: '⬅' })
          .setStyle(ButtonStyle.Primary),
  
        new ButtonBuilder()
          .setCustomId('text')
          .setDisabled(true)
          .setLabel(`[1/${this.pages.length}]`)
          .setStyle(ButtonStyle.Secondary),
  
        new ButtonBuilder()
          .setCustomId('right')
          .setDisabled(isOnePage ? true : false)
          .setEmoji({ name: '➡' })
          .setStyle(ButtonStyle.Primary),
  
        new ButtonBuilder()
          .setCustomId('fastRight')
          .setDisabled(isOnePage ? true : false)
          .setEmoji({ name: '⏩' })
          .setStyle(ButtonStyle.Primary)
      );
  
      return this;
    }
  
    /**
     * Sets the collector for handling button interactions.
     *
     * @param {InteractionCollector<ButtonInteraction>} collector - The collector object.
     * @returns {PageBuilder} The current PageBuilder instance.
     * @throws Will throw an error if the collector is missing or not an object.
     */
    public setCollector(collector: InteractionCollector<ButtonInteraction>): this {
      if (!collector || !(collector instanceof Collector)) {
        error('"collector" parameter is missing or not an instance of Collector!');
      }
  
      this.collector = collector;
      return this;
    }
  
    /**
     * Get index
     * @returns {number}
     */
    public getIndex(): number {
      return this.currentPage;
    }

    /**
     * Disables all components (buttons).
     *
     * @returns {ActionRowBuilder<ButtonBuilder>} A new ActionRowBuilder with disabled components.
     */
    public disabledComponents(): ActionRowBuilder<ButtonBuilder> {
      const disabledComponents = new ActionRowBuilder<ButtonBuilder>().addComponents(
        ...this.components.components.map((button) => button.setDisabled(true))
      );
  
      return disabledComponents;
    }

    /**
     * Get all components (buttons).
     *
     * @returns {ActionRowBuilder<ButtonBuilder>} A new ActionRowBuilder
     */
    public getComponents(): ActionRowBuilder<ButtonBuilder> {
        return this.components;
    }
  
    /**
     * Returns the button actions for different button interactions.
     *
     * @returns {Record<string, () => void>} An object containing functions for button actions.
     */
    private get buttonActions(): Record<string, () => void> {
      return {
        fastLeft: () => (this.currentPage -= 5),
        left: () => (this.currentPage -= 1),
        fastRight: () => (this.currentPage += 5),
        right: () => (this.currentPage += 1),
      };
    }
  
    /**
     * Starts the collector to handle button interactions.
     *
     * @returns {Promise<PageBuilder>} The current PageBuilder instance.
     * @throws Will throw an error if pages, components, or collector are missing.
     */
    public async init(): Promise<this> {
      if (!this.components || typeof this.components !== 'object') {
        error('"components" is missing or not an object, please use the "setComponents()" function!');
      }
  
      if (!this.pages || typeof this.pages !== 'object') {
        error('"pages" is missing or not an object, please use the "setPages()" function!');
      }
  
      if (!this.collector || typeof this.collector !== 'object') {
        error('"collector" is missing, please use the "useCollector()" function!');
      }

      this.collector.on('collect', async (i) => {
        const customId = i.customId as 'fastLeft' | 'left' | 'fastRight' | 'right';
        this.buttonActions[customId]?.();
  
        const buttonData = this.components.components;
        let currentPage = this.currentPage + 1;
  
        const leftButtons = [buttonData[0], buttonData[1]];
        const rightButtons = [buttonData[3], buttonData[4]];
        const bottomText = buttonData[2];
  
        if (customId === 'fastRight' || customId === 'right') leftButtons.forEach((button) => button?.setDisabled(false));
        if (customId === 'fastLeft' || customId === 'left') rightButtons.forEach((button) => button?.setDisabled(false));
  
        if (currentPage <= 1) {
          leftButtons.forEach((button) => button?.setDisabled(true));
          this.currentPage = 0;
          currentPage = 1;
        }
  
        if (currentPage >= this.pages.length) {
          rightButtons.forEach((button) => button?.setDisabled(true));
          this.currentPage = this.pages.length - 1;
          currentPage = this.pages.length;
        }
        
        bottomText?.setLabel(`[${currentPage}/${this.pages.length}]`);
      });
  
      return this;
    }
}