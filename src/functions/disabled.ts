import {
    ActionRowBuilder,
    AnyComponentBuilder,
    ButtonBuilder,
    ChannelSelectMenuBuilder,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    UserSelectMenuBuilder,
} from 'discord.js';
  
  /**
   * Disables all the buttons or select menus in the provided ActionRowBuilder.
   *
   * @template T
   * @param {ActionRowBuilder<T>} actionRowBuilder - The ActionRowBuilder containing components.
   * @returns {ActionRowBuilder<T>} - A new ActionRowBuilder with disabled components.
   */
  function disabledComponents<T extends AnyComponentBuilder>(
    actionRowBuilder: ActionRowBuilder<T>
  ): ActionRowBuilder<T> {
    const components = actionRowBuilder.components;
    return new ActionRowBuilder<T>().setComponents(
      // @ts-ignore
      components.map((component) => component.setDisabled(true))
    );
  }
  
  /**
   * Disables all the buttons in the provided ActionRowBuilder.
   *
   * @param {ActionRowBuilder<ButtonBuilder>} actionRowBuilder - The ActionRowBuilder containing buttons.
   * @returns {ActionRowBuilder<ButtonBuilder>} - A new ActionRowBuilder with disabled buttons.
   */
  export function disabledButtons(
    actionRowBuilder: ActionRowBuilder<ButtonBuilder>
  ): ActionRowBuilder<ButtonBuilder> {
    return disabledComponents(actionRowBuilder);
  }
  
  /**
   * Disables all the string select menus in the provided ActionRowBuilder.
   *
   * @param {ActionRowBuilder<StringSelectMenuBuilder>} actionRowBuilder - The ActionRowBuilder containing string select menus.
   * @returns {ActionRowBuilder<StringSelectMenuBuilder>} - A new ActionRowBuilder with disabled string select menus.
   */
  export function disabledStringSelectMenu(
    actionRowBuilder: ActionRowBuilder<StringSelectMenuBuilder>
  ): ActionRowBuilder<StringSelectMenuBuilder> {
    return disabledComponents(actionRowBuilder);
  }
  
  /**
   * Disables all the channel select menus in the provided ActionRowBuilder.
   *
   * @param {ActionRowBuilder<ChannelSelectMenuBuilder>} actionRowBuilder - The ActionRowBuilder containing channel select menus.
   * @returns {ActionRowBuilder<ChannelSelectMenuBuilder>} - A new ActionRowBuilder with disabled channel select menus.
   */
  export function disabledChannelSelectMenu(
    actionRowBuilder: ActionRowBuilder<ChannelSelectMenuBuilder>
  ): ActionRowBuilder<ChannelSelectMenuBuilder> {
    return disabledComponents(actionRowBuilder);
  }
  
  /**
   * Disables all the role select menus in the provided ActionRowBuilder.
   *
   * @param {ActionRowBuilder<RoleSelectMenuBuilder>} actionRowBuilder - The ActionRowBuilder containing role select menus.
   * @returns {ActionRowBuilder<RoleSelectMenuBuilder>} - A new ActionRowBuilder with disabled role select menus.
   */
  export function disabledRoleSelectMenu(
    actionRowBuilder: ActionRowBuilder<RoleSelectMenuBuilder>
  ): ActionRowBuilder<RoleSelectMenuBuilder> {
    return disabledComponents(actionRowBuilder);
  }
  
  /**
   * Disables all the user select menus in the provided ActionRowBuilder.
   *
   * @param {ActionRowBuilder<UserSelectMenuBuilder>} actionRowBuilder - The ActionRowBuilder containing user select menus.
   * @returns {ActionRowBuilder<UserSelectMenuBuilder>} - A new ActionRowBuilder with disabled user select menus.
   */
  export function disabledUserSelectMenu(
    actionRowBuilder: ActionRowBuilder<UserSelectMenuBuilder>
  ): ActionRowBuilder<UserSelectMenuBuilder> {
    return disabledComponents(actionRowBuilder);
  }