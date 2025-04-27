import { YoutubeTranscript } from "youtube-transcript";

const textCut = (transcript) => {
  const allText = transcript.map(({ text }) =>
    text.replaceAll("&amp;#39;", ""),
  );
  return allText.join(" ");
};

export const testTrans = async (url) => {
  return await YoutubeTranscript.fetchTranscript(url, { lang: "vi" }).then(
    textCut,
  );
};
