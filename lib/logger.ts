import fs from "node:fs/promises";
import path from "node:path";

const logPath = path.join(process.cwd(), "logs", "app.log");

export async function writeLog(error: any, context = "") {
  try {
    await fs.mkdir(path.dirname(logPath), { recursive: true });

    const text = `
=================================================
Time    : ${new Date().toISOString()}
Context : ${context}
Message : ${error.message}
Stack   :
${error.stack}

`;

    await fs.appendFile(logPath, text);
  } catch (e) {
    console.error("Gagal menulis log:", e);
  }
}
