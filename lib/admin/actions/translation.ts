"use server";
import { db } from "@/database/drizzle";
import { topics, people as peopleSchema } from "@/database/schema";
import newSpeakers from "@/components/forms/NewSpeakers";
import config from "@/lib/config";

const revoxApiUrl = config.env.revoxApiUrl;

interface speakerSummariesRequest {
  name: string;
  organization: string;
  extra_information?: string;
}

interface SpeechTranslation {
  speakers: Speaker[];
  url: string;
  context?: string;
  topicName: string;
  topicId: string[];
}

interface Topic {
  id?: string;
  topicName: string;
  topicImage: string;
}

interface ResponseMessage {
  message: string;
  error?: string;
  audioName: string;
}
interface Props {
  url: string;
  peopleIndexes: string;
  newPeople: string;
  topicIndex: string;
  newTopic: string;
  context: string;
  secretCode: string;
}

interface Speaker {
  fullname: string;
  org: string;
  context?: string;
  longSummary: string;
  shortSummary: string;
  speakerImage: string;
}

interface ExistingOptions {
  choice: string;
}

interface ParamProps {
  url: string;
  transcript: string;
  existingSpeakers: ExistingOptions[];
  newSpeakers: Speaker[];
  existingTopics: ExistingOptions[];
  newTopics: Topic[];
  context?: string | undefined;
  code: string;
  speechImage: string;
}
interface NewSpeechSpeaker {
  id?: string;
  name: string;
  org: string;
  info: string;
  person_image?: string;
  create: boolean;
  long_summary?: string;
  short_summary?: string;
}
interface NewSpeechTopic {
  id?: string;
  name: string;
  create: boolean;
  topic_image?: string;
}
interface NewSpeechRequest {
  speech_id?: string;
  speakers: NewSpeechSpeaker[];
  url: string;
  context: string;
  topics: NewSpeechTopic[];
  createSpeech: boolean;
  cover_url: string;
}

interface SpeechTranslationProps {}
export const createNewSpeech = async (params: ParamProps) => {
  console.log(params);

  const url = params.url;
  const transcript = params.transcript;
  const existingSpeakers: Person[] = params.existingSpeakers.map(({ choice }) =>
    JSON.parse(choice),
  );
  const newSpeakerList = params.newSpeakers;
  const existingTopics: Topic[] = params.existingTopics.map(({ choice }) =>
    JSON.parse(choice),
  );
  const newTopicList = params.newTopics;
  let context: string = params.context!;
  const secretCode = params.code;
  const speechImage = params.speechImage;
  if (secretCode !== "S3CR3T CODE") {
    return { success: false, message: `You failed the test \u{1F620}` };
  }

  if (transcript.length < 200) {
    return { success: false, message: "Bản chép lời quá ngắn" };
  }

  const newSpeechSpeakers: NewSpeechSpeaker[] = [];
  for (const speaker of newSpeakerList) {
    newSpeechSpeakers.push({
      name: speaker.fullname,
      org: speaker.org,
      info: speaker.longSummary,
      person_image: speaker.speakerImage,
      create: true,
      long_summary: speaker.longSummary,
      short_summary: speaker.shortSummary,
    });
  }
  for (const existSpeaker of existingSpeakers) {
    newSpeechSpeakers.push({
      id: existSpeaker.id,
      name: existSpeaker.personName,
      info: existSpeaker.longSummary,
      create: false,
      org: existSpeaker.org,
    });
  }

  if (newSpeechSpeakers.length < 1) {
    return { success: false, message: "Xin hãy thêm diễn giả." };
  }

  const newSpeechTopics: NewSpeechTopic[] = [];
  for (const topic of newTopicList) {
    newSpeechTopics.push({
      name: topic.topicName,
      create: true,
      topic_image: topic.topicImage,
    });
  }
  for (const topic of existingTopics) {
    newSpeechTopics.push({
      id: topic.id,
      name: topic.topicName,
      create: false,
      topic_image: topic.topicImage,
    });
  }

  if (newSpeechTopics.length < 1) {
    return { success: false, message: "Xin hãy thêm chủ đề." };
  }

  if (context.length < 5) {
    context = " ";
  }
  const requestJSON = {
    speakers: newSpeechSpeakers,
    url: url,
    context: context,
    topics: newSpeechTopics,
    createSpeech: true,
    cover_url: speechImage,
    transcript: transcript,
  };
  console.log(requestJSON);
  try {
    const response = await fetch(`${revoxApiUrl}/translations`, {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestJSON),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      message: "Xin lỗi, yêu cầu của bạn đã không được thực hiện.",
    };
  }
  return {
    success: true,
    message: "Chúng tôi đã nhận được yêu cầu của bạn. Xin cảm ơn.",
  };
};

export const createYoutubeInfo = async ({ url }: { url: string }) => {
  const response = await fetch(`${revoxApiUrl}/urlinfo`, {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const result = await response.json();
  return result;
};

export const createSpeakerInfo = async ({
  name,
  organization,
  extra_information,
}: speakerSummariesRequest) => {
  const response = await fetch(`${revoxApiUrl}/ai`, {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      speakers: [
        {
          name,
          organization,
          extra_information,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
};

export const createSpeakersInfo = async (
  speakerList: speakerSummariesRequest[],
) => {
  const response = await fetch(`${revoxApiUrl}/ai`, {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      speakers: speakerList,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
};
