import { MessageEmbed } from "discord.js";
export class CodeErrorEmbed extends MessageEmbed {
  constructor(err: string) {
    super();
    this.title = `Error!`;
    this.fields = [
      { name: "> TS", value: `\`\`\`ts\n${err}\n\`\`\``, inline: false },
      { name: "> JS", value: `\`\`\`js\n${err}\n\`\`\``, inline: false },
    ];
    this.color = 15158332;
  }
}
