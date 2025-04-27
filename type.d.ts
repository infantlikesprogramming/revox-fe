interface Speech {
  id: string;
  title: string;
  topicId: string[];
  peopleId: string[];
  sourceImage: string;
  sourceUrl: string;
  publishDate: string;
  sourceOwner: string;
  language: string;
  duration: string;
  audioLink: string;
  speechSummary: string;
  coverUrl: string;
  translationId: string[];
}

interface PersonInfo {
  id: string | null;
  org: string | null;
  personName: string | null;
}

interface Person {
  id: string;
  personName: string;
  org: string;
  personImage: string;
  shortSummary: string;
  longSummary: string;
  speechesId: string[];
}

interface Topic {
  id: string;
  topicName: string;
  topicImage: string;
}
