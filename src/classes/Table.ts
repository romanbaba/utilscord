import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import type { SaveOptions, TableOptions } from "..";
import { error } from "../helpers/logger";

export class Table {
  private headers: string[] | undefined;
  private rows: string[][] | undefined;
  private canvas = createCanvas(750, 650);
  private context = this.canvas.getContext("2d");

  constructor(options?: TableOptions | undefined) {
    if (typeof options?.headers !== "undefined") {
      this.headers = options.headers;
    }

    if (typeof options?.rows !== "undefined") {
      this.rows = options.rows;
    }
  }

	/**
   * @param {number} x
   * @param {number} y
   * @param {string} text
   * @param {number} width
   */
  private drawCell(x: number, y: number, text: string, width: number) {
    this.context.beginPath();
		this.context.rect(x, y, width, 50);
		this.context.fillText(text, x + 10, y + 30, width - 20);
  }

  public setHeaders(headers?: string[] | undefined) {
    if (typeof headers === "undefined") {
      error('The "headers" value must not be undefined.');
    }
    this.headers = headers;
  }

  public setRows(rows?: string[][] | undefined) {
    if (typeof rows === "undefined") {
      error('The "rows" value must not be undefined.');
    }
    this.rows = rows;
  }

  public addRow(row?: string[] | undefined) {
    if (typeof row === "undefined") {
      error('The "row" value must not be undefined.');
    }
    this.rows?.push(row);
  }

  private writeTable() {
    if (typeof this.rows === "undefined") {
      error('The "rows" value must not be undefined.');
    }

    if (typeof this.headers === "undefined") {
      error('The "rows" value must not be undefined.');
    }

    this.context.beginPath();
    this.context.rect(0, 50, this.canvas.width, 100);
  
    this.context.font = "bold 25px 'Montserrat', sans-serif";
    this.context.fillStyle = "#48494d";
    const columnWidths = this.canvas.width / this.headers.length;
  
    this.headers.forEach((header, index) => {
      this.drawCell(index * columnWidths, 0, header, columnWidths);
    });

    this.context.beginPath();
    this.context.moveTo(0, 50);
    this.context.lineTo(this.canvas.width, 50);
    this.context.strokeStyle = "#48494d";
    this.context.stroke();
  
    this.context.fillStyle = "#fff";
    let padding = 0;

    this.rows.forEach((colums) => {
      colums.forEach((col, index) => {
        if (index === 0) {
          this.drawCell(0, padding += 50, col, columnWidths);
          return;
        }
  
        this.drawCell(index * columnWidths, padding, col, columnWidths);
      });
    });
  }

  public toBuffer(mimeType: SaveOptions["mimeType"] = "image/png") {
    this.writeTable();
    // @ts-ignore
    return this.canvas.toBuffer(mimeType);
  }

  public toDataURL() {
    this.writeTable();
    return this.canvas.toDataURL();
  }

  public save(options: SaveOptions) {
    this.writeTable();
    const buffer = this.toBuffer(options?.mimeType ?? "image/png");
    writeFileSync(options.name, buffer);
    return true;
  }

  static get EmptyRow() {
    return "\u200B";
  }
}