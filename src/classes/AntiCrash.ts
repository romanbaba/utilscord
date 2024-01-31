import { Client, WebhookClient, WebhookClientData } from "discord.js";
import { console } from "sneaks";
import { logInfo } from "../helpers/logger";

/**
 * Represents an AntiCrash instance to handle uncaught exceptions and unhandled rejections.
 */
export class AntiCrash {
  /**
   * All error count
   */
  private error: number = 0;

  /**
   * Whether to hide error messages from the console.
   */
  private hidden: boolean = false;

  /**
   * WebhookClient instance for sending error messages.
   */
  private webhook: WebhookClient | undefined = undefined;

  /**
   * Discord.js Client instance to handle Discord-specific errors.
   */
  private client: Client | undefined = undefined;

  /**
   * Creates an instance of AntiCrash.
   *
   * @param {Object} [AntiCrashOptions=undefined] - Options for configuring AntiCrash instance.
   * @param {boolean} [AntiCrashOptions.hidden=false] - Whether to hide error messages from the console.
   */
  constructor(AntiCrashOptions?: { hidden?: boolean; }) {
    this.hidden = AntiCrashOptions?.hidden ?? false;
  }

  /**
   * Sets the WebhookClient for sending error messages.
   *
   * @param {WebhookClientData} WebhookOptions - Options for configuring WebhookClient.
   * @returns {this} - The current AntiCrash instance for method chaining.
   */
  setWebhook(WebhookOptions: WebhookClientData): this {
    this.webhook = new WebhookClient(WebhookOptions);
    return this;
  }

  /**
   * Sets the Discord.js Client instance for handling Discord-specific errors.
   *
   * @param {Client} client - The Discord.js Client instance.
   * @returns {this} - The current AntiCrash instance for method chaining.
   */
  setClient(client: Client): this {
    this.client = client;
    return this;
  }

  /**
   * Initializes the AntiCrash instance by setting up event listeners for uncaught exceptions,
   * unhandled rejections, and Discord-specific errors.
   */
  init() {
    process.on('uncaughtException', (error) => {
      this.handleProcessError('Uncaught Exception', error);
      this.error += 1;
    });

    process.on('unhandledRejection', (error) => {
      this.handleProcessError('Unhandled Rejection', error)
      this.error += 1;
    });

    if (this.client) {
      this.client.on('error', (error) => {
        this.handleDiscordError(error);
        this.error += 1;
      });
    }

    if (!this.hidden) {
      logInfo('The "Anti Crash" class started scanning for errors.');
    }
  }

  /**
   * Handles process-related errors and sends notifications via webhook if configured.
   *
   * @param {string} type - Type of error (e.g., "Uncaught Exception", "Unhandled Rejection").
   * @param {Error | unknown} error - The error object.
   */
  private handleProcessError(type: string, error: Error | unknown) {
    if (!this.hidden) {
      console.error(error);
    }

    if (this.webhook) {
      this.webhook.send({ content: `@everyone **|** ${type}: ${error}` });
    }
  }

  /**
   * Handles Discord-specific errors and sends notifications via webhook if configured.
   *
   * @param {Error} error - The Discord-specific error.
   */
  private handleDiscordError(error: Error) {
    if (!this.hidden) {
      console.error(error);
    }

    if (this.webhook) {
      this.webhook.send({ content: `@everyone **|** Discord Error: ${error}` });
    }
  }

  /**
   * Get error count
   * @returns {number}
   */
  public getCount(): number {
    return this.error;
  }
}